import { Box, CircularProgress, Drawer, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../AsyncFunctions/Auth";
import { fetchCartData } from "../../AsyncFunctions/cart";
import { toggleOpenDrawer } from "../../store/cart";
//////////
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setStores, setToken, setUserDetails } from "../../store/Auth";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import useWindowSize from "../../utilities/hooks/useWindowSize";
import Navigation from "../Navigation/Navigation";
import TopHeader from "../TopHeader/TopHeader";
import CartDrawerStack from "../cartDrawer/CartDrawer";
import Footer from "../footer/footer";
import { setAlert } from "../../AsyncFunctions/alert";

const Header = dynamic(() => import("../Header/Header"), { ssr: false });

const Layout = ({ children, businessId }) => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const router = useRouter();
  const query = router?.query;
  const userDetails = useSelector((state) => state.auth.userDetails);
  const tokens = useSelector((state) => state.auth.tokens);
  const openDrawer = useSelector((state) => state.cart.openDrawer);
  const [loading, setLoading] = useState(true);

  /** ERP impersonation: read accessToken from router query once ready, or from window (fallback before query hydrates). */
  const urlAccessToken = useMemo(() => {
    if (!router?.isReady) return null;
    const raw = query?.accessToken;
    const fromQuery =
      typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;
    if (fromQuery) return fromQuery;
    if (typeof window !== "undefined") {
      const fromSearch = new URLSearchParams(window.location.search).get(
        "accessToken",
      );
      if (fromSearch) return fromSearch;
    }
    return null;
  }, [router?.isReady, query?.accessToken]);

  useEffect(() => {
    if (!router?.isReady || !urlAccessToken) return;
    if (urlAccessToken === tokens?.token) return;
    dispatch(setUserDetails(null));
    dispatch(
      setToken({
        token: urlAccessToken,
        retoken: "",
      }),
    );
  }, [router.isReady, urlAccessToken, tokens?.token, dispatch]);

  useEffect(() => {
    const unprotectedRoutes = [
      "/account/login",
      "/account/forgotPassword",
      "/account/register",
      "/[staticPage]",
      "/reset-password",
    ];

    // 1️⃣ Wait until initial token check is done
    if (!router?.isReady) return;
    if (loading) return;

    // ERP link: URL carries accessToken but Redux has not caught up yet — do not send user to login (avoids dropping ?accessToken).
    if (urlAccessToken && urlAccessToken !== tokens?.token) {
      return;
    }

    // 2️⃣ If there is NO token (user not logged in)
    // and page is not in allowed list, redirect to login
    if (!tokens?.token && !unprotectedRoutes?.includes(router?.pathname)) {
      setAlert("warn", "Please login to access this page")(dispatch);
      router?.replace("/account/login");
    }
  }, [
    router?.isReady,
    loading,
    tokens?.token,
    router?.pathname,
    urlAccessToken,
    dispatch,
    router,
  ]);

  // useEffect(() => {
  //   dispatch(setStores(stores));
  // }, [stores]);

  useEffect(() => {
    const fetchData = async () => {
      if (tokens?.token) {
        setLoading(true);
        try {
          await getUserDetails(tokens?.token)(dispatch);
        } catch (e) {}
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [tokens]);

  useEffect(() => {
    if (userDetails) {
      const customer = userDetails?.customerDto;

      const activeAddress =
        userDetails?.customerDto?.customerStoreAddressList?.find(
          (address, index) => address.active === true || index === 0,
        );
      const stateId = activeAddress?.stateId ? activeAddress?.stateId : null;
      const customerGroupId = customer?.customerGroupId ?? null;
      const viewSpecificCategory = customer?.viewSpecificCategory ?? null;
      const viewSpecificProduct = customer?.viewSpecificProduct ?? null;
      const tier = customer?.tier ?? null;
      Cookies.set("token", tokens?.token, {
        path: "/",
      });
      Cookies.set("stateId", stateId, {
        path: "/",
      });
      if (typeof window !== "undefined") {
        window.customerData = {
          stateId,
          customerGroupId,
          viewSpecificCategory,
          viewSpecificProduct,
          tier,
        };
      }
      fetchCartData(tokens?.token)(dispatch);
    } else {
      Cookies.remove("token", { path: "/" });
      Cookies.remove("stateId", { path: "/" });
    }
  }, [userDetails]);
  return (
    <Stack
      sx={{ width: "100%", overflow: "hidden", background: "#F9FAFA" }}
      flexDirection="column"
    >
      {<TopHeader businessId={businessId} />}
      <Header businessId={businessId} />
      {width > 1200 && userDetails && <Navigation businessId={businessId} />}
      <Box sx={{ width: "100%" }}>
        <Drawer
          open={openDrawer}
          onClose={() => dispatch(toggleOpenDrawer(false))}
          anchor="right"
        >
          <CartDrawerStack />
        </Drawer>
        {loading ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "60vh" }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <main>{children}</main>
        )}
        {/* <Features /> */}
        {/* <hr
          style={{
            maxWidth: "1475px",
            margin: "auto",
            marginBottom: "2rem",
            background: "#000000",
            height: "2px", // Adjust thickness as needed
            border: "none", // Ensure no border is applied
          }}
        /> */}
      </Box>
      {/* <Newsteller /> */}
      {/* <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderColor: "#231F20", margin: "auto auto 2px auto", width: "100%", maxWidth: "1475px" }}
      /> */}
      <Footer businessId={businessId} width={width} />
    </Stack>
  );
};

export default Layout;
