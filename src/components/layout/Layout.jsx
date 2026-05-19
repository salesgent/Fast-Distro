import { Box, Stack } from "@mui/material";
import { BrandStock } from "@salesgenterp/ui-components";
import Cookies from "js-cookie";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../AsyncFunctions/Auth";
import { fetchCartData } from "../../AsyncFunctions/cart";
import { setToken } from "../../store/Auth";

const Layout = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const tokens = useSelector((state) => state.auth.tokens);
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;

  useEffect(() => {
    if (query?.accessToken) {
      dispatch(
        setToken({
          token: query?.accessToken,
          retoken: "",
        }),
      );
    }
  }, [query, dispatch]);

  useEffect(() => {
    if (tokens?.token) {
      getUserDetails(tokens?.token)(dispatch);
    }
  }, [tokens, dispatch]);

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
  }, [userDetails, tokens?.token, dispatch]);

  return (
    <Stack
      sx={{ width: "100%", overflow: "hidden", background: "#F9FAFA" }}
      flexDirection="column"
    >
      <Box sx={{ width: "100%" }}>
        <BrandStock
          colors={{ primaryColor: "#000000" }}
          apiEndPoint={API_BASE_URL}
          storeData={{
            text1: "",
            bankInfo: {},
            text2: "",
            contactPerson: {},
            returnPolicy: (
              <div>
                <p>
                  You may ONLY return new, sealed, unopened items within 30 days
                  of delivery for a full account credit. No return will be
                  accepted without prior authorization.
                </p>
                <p>
                  WE DO NOT ACCEPT RETURNS FOR THE FOLLOWING ITEMS:
                  e-liquids/e-juice, disposables, consumable items and clearance
                  items, no exceptions. Damaged/missing item exchanges must be
                  reported within 48 hours of delivery to qualify for the return
                  authorization process.
                </p>
                <p>
                  We&apos;ll also pay the return shipping costs if the return is
                  a result of our error (you received an incorrect or defective
                  item, etc). You should expect to receive your refund within
                  two weeks of giving your package to the return shipper,
                  however, in many cases you will receive a refund more quickly.
                  This time period includes the transit time for us to receive
                  your return from the shipper (5 to 10 business days), and the
                  time it takes us to process your return once we receive it (3
                  to 5 business days). If you need to return an item, please
                  contact us with your order number and details about the
                  product you would like to return. We will respond quickly with
                  instructions for how to return items from your order.
                </p>
              </div>
            ),
          }}
        />
      </Box>
    </Stack>
  );
};

export default Layout;
