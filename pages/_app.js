import { StyledEngineProvider } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import "../styles/checkout.scss";
/////////////////////
import { GTagManager, RenderTawk } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Layout from "../src/components/layout/Layout";
import { fetcher } from "../src/service/fetcher";
import { store } from "../src/store/store";
import theme from "../src/utilities/theme/theme";
import NextNprogress from "nextjs-progressbar";
import "../styles/globals.scss";
import { Snowfall, MaintenancePage } from "@salesgenterp/ui-components";
import useScrollRestoration from "../src/utilities/hooks/useScrollRestoration";
import { useRouter } from "next/router";
import Script from "next/script";
import { SHOPSENSE_WIDGET_SCRIPT_ID } from "../src/utilities/constants";

const EXCLUDE_LAYOUT_PATHS = ["/vendor-portal"];

const Notify = dynamic(
  () => import("../src/utilities/Notification/Notification"),
);
const Fedex = dynamic(() => import("../src/components/FedEx/Fedex"));
const BusinessSelection = dynamic(
  () => import("../src/components/BusinessSelection"),
);

function MyApp({ Component, pageProps }) {
  const { publicRuntimeConfig } = getConfig();
  const {
    GOOGLE_TAG,
    TAWK_PROPERTY_ID,
    TAWK_ID,
    ENABLE_SNOWFALL,
    MAINTENANCE_MODE,
  } = publicRuntimeConfig;
  const [businessId, setBusinessId] = useState(null);
  const router = useRouter();
  const { pathname } = router;

  useScrollRestoration();

  useEffect(() => {
    const businessId = sessionStorage.getItem("businessId") || 1;
    if (businessId) {
      setBusinessId(businessId);
    } else {
      setBusinessId(false);
    }
  }, [businessId]);

  const [images, setImages] = useState();

  useEffect(() => {
    if (document) {
      const snowflake1 = document.createElement("img");
      snowflake1.src = "/images/leaf.png";
      const snowflake2 = document.createElement("img");
      snowflake2.src = "/images/snowflake.png";
      setImages([snowflake2]);
    }
  }, []);

  const shouldRenderLayout = !EXCLUDE_LAYOUT_PATHS.includes(pathname);

  return (
    <StyledThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persisror={persistor}> */}
        <SWRConfig value={{ fetcher: fetcher }}>
          <NextNprogress
            color="#000000"
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow={false}
            options={{ easing: "ease", speed: 500 }}
          />
          <Notify />
          {/* <Fedex /> */}
          {ENABLE_SNOWFALL && (
            <Snowfall radius={[10, 40]} images={images} timeOut={60000} />
          )}
          {/* <Script
            src="https://app.shopsense.pro/embed/widget.js?zone=31"
            id={SHOPSENSE_WIDGET_SCRIPT_ID}
            data-api-base={"https://app.shopsense.pro/api/api"}
            onError={(err) => {
              if (
                typeof window !== "undefined" &&
                window.ShopSenseWidgetStatus?.state !== "failed"
              ) {
                let zoneId = 0;
                try {
                  const src = err?.target?.src;
                  if (src) {
                    const url = new URL(src);
                    const zoneParam = url.searchParams.get("zone");
                    zoneId = zoneParam ? Number(zoneParam) : 0;
                  }
                } catch (e) {
                  console.warn(
                    "[ShopSense] Failed to parse script src for zone in onError",
                    e,
                  );
                }

                window.ShopSenseWidgetStatus = {
                  state: "loadingFailed",
                  zoneId,
                  updatedAt: Date.now(),
                  error: { message: "Script failed to load" },
                };
              }
            }}
          /> */}
          <GTagManager gTagId={GOOGLE_TAG || ""} />
          <RenderTawk propertyId={TAWK_PROPERTY_ID} tawkId={TAWK_ID} />
          <StyledEngineProvider injectFirst>
            {/* {businessId === null ? (
              <></>
            ) : !businessId ? (
              <>
                <BusinessSelection setBusinessId={setBusinessId} />
              </>
            ) : ( */}
            {MAINTENANCE_MODE ? (
              <MaintenancePage
                description={"Please call 972-243-8273 to place orders"}
              />
            ) : shouldRenderLayout ? (
              <Layout businessId={businessId}>
                <Component {...pageProps} businessId={businessId} />
              </Layout>
            ) : (
              <Component {...pageProps} businessId={businessId} />
            )}
            {/* )} */}
          </StyledEngineProvider>
        </SWRConfig>
        {/* </PersistGate> */}
      </Provider>
    </StyledThemeProvider>
  );
}

export default MyApp;
