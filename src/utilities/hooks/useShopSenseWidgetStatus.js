/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { SHOPSENSE_WIDGET_SCRIPT_ID } from "../constants";

const SHOPSENSE_EVENT = "shopsense:status-change";

function installAccessorOnce() {
  if (window.__shopsenseStatusAccessorInstalled) return;

  let backingObject = window.ShopSenseWidgetStatus || {};

  const notify = () => {
    if (backingObject && typeof backingObject.state === "string") {
      window.dispatchEvent(
        new CustomEvent(SHOPSENSE_EVENT, { detail: backingObject.state }),
      );
    }
  };

  Object.defineProperty(window, "ShopSenseWidgetStatus", {
    configurable: true,
    get() {
      return backingObject;
    },
    set(next) {
      backingObject = next || {};
      notify();
    },
  });

  backingObject = new Proxy(backingObject, {
    set(target, prop, value) {
      // eslint-disable-next-line no-param-reassign
      target[prop] = value;
      notify();
      return true;
    },
  });

  notify(); // seed if already populated before hook ran
  window.__shopsenseStatusAccessorInstalled = true;
}

export function useShopSenseWidgetStatus() {
  const retryIntervalMs = 30 * 1000;
  // retryIntervalMs = 1 * 60 * 100,
  const scriptId = SHOPSENSE_WIDGET_SCRIPT_ID;
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    // Install the accessor once globally — safe to call on every mount
    installAccessorOnce();

    // Always sync on mount in case the accessor was already installed
    // and the status changed before this component rendered
    const current = window.ShopSenseWidgetStatus;
    if (current && typeof current.state === "string") {
      setStatus(current.state);
    }

    // Subscribe to future changes via window event — survives remounts
    const handler = (e) => {
      setStatus(e.detail);
    };
    window.addEventListener(SHOPSENSE_EVENT, handler);

    const ensureScriptLoaded = () => {
      if (typeof document === "undefined") return;

      const original = document.getElementById(scriptId);
      if (!original) return;

      const src = original.src;
      if (!src) return;

      let zoneId = 0;
      try {
        const url = new URL(src);
        const zoneParam = url.searchParams.get("zone");
        zoneId = zoneParam ? Number(zoneParam) : 0;
      } catch (e) {}

      const existingRetry = document.querySelector(
        `script[data-shopsense-retry="true"]`,
      );
      if (existingRetry?.parentNode) {
        existingRetry.parentNode.removeChild(existingRetry);
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.shopsenseRetry = "true";
      script.onerror = (err) => {
        if (
          typeof window !== "undefined" &&
          window.ShopSenseWidgetStatus?.state !== "failed"
        ) {
          window.ShopSenseWidgetStatus = {
            state: "loadingFailed",
            zoneId,
            updatedAt: Date.now(),
            error: { message: "Script failed to load" },
          };
        }
      };
      document.head.appendChild(script);
    };

    const retryId = window.setInterval(() => {
      const currentStatus = window.ShopSenseWidgetStatus;
      if (currentStatus?.state === "loadingFailed") {
        ensureScriptLoaded();
      }
    }, retryIntervalMs);

    return () => {
      window.removeEventListener(SHOPSENSE_EVENT, handler);
      window.clearInterval(retryId);
    };
  }, [retryIntervalMs, scriptId]);

  return status;
}
