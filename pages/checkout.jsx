import { CheckoutPageComponent } from "@salesgenterp/ui-components";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React from "react";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginFunction } from "../src/AsyncFunctions/Auth";
import { setAlert } from "../src/AsyncFunctions/alert";
import { fetchCartData } from "../src/AsyncFunctions/cart";

const CheckoutPage = () => {
  const { publicRuntimeConfig } = getConfig();
  const { API_BASE_URL } = publicRuntimeConfig;
  const dispatch = useDispatch();
  const router = useRouter();
  const cartData = useSelector((state) => state.cart.cartData);
  const tokens = useSelector((state) => state.auth.tokens);
  const discountCoupons = useSelector(
    (state) => state.checkout?.discountCoupons
  );
  const userDetails = useSelector((state) => state.auth.userDetails);

  const handleLogin = async (data) => {
    await LoginFunction({
      username: data?.email,
      type: "customer",
      password: data?.password,
    })(dispatch);
  };

  const refetchCartData = async () => {
    await fetchCartData(tokens?.token)(dispatch);
  };

  let styles = {
    bg: "#00000010",
    primaryColor: "#000000",
    stepperIcon: { bg: "#000000", opened: "#00000040" },
    h1Color: "#000000",
    checkoutSummary: { bg: "#00000020" },
    input: { bg: "#00000020", border: "#000000" },
    button: {
      bg: "#000000",
    },
  };

  if (!userDetails) return <></>;

  return (
    <>
      <CheckoutPageComponent
        apiEndPoint={API_BASE_URL}
        token={tokens?.token}
        authoriseDotNet={false}
        cartData={cartData}
        discountCoupons={discountCoupons}
        styles={styles}
        handleLogin={handleLogin}
        clickRedirect={(link) => router.push(`/${link}`)}
        showShippingPriceRangeLimit={false}
        taxExempt={true}
        fetchCartData={refetchCartData}
      />
    </>
  );
};

export default CheckoutPage;
