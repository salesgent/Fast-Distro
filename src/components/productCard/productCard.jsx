import { Box, Dialog, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////
import { paramCase } from "param-case";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { addTocart, localAddToCart } from "../../AsyncFunctions/cart";
import ProductViewContainer from "../product-details/ProductView";
import {
  ImageBox,
  LoginButton,
  LoginToAddButton,
  ProductAddButton,
  ProductButton,
  ProductCard,
  ProductContent,
  ProductName,
  ProductPrice,
  ProductPriceContainer,
  ProductQuickView,
  QuickView,
  QuickViewBtn,
} from "./productCard.style";
// import { QuantityComponent } from "../product-details/variantsTable/QuantityComponent";
import { PiHandbag } from "react-icons/pi";
import { getRandomColor } from "../../utilities/utils";
import { checkMainQtyMinMax } from "../product-details/variantsTable/VariatnRow";
import { setAlert } from "../../AsyncFunctions/alert";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { RiShoppingCart2Line } from "react-icons/ri";
import { CiShoppingBasket } from "react-icons/ci";

const CommonProductCard = ({
  product,
  onListPage,
  isNew,
  tag,
  handleProducts,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const imageRef = useRef(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [value, setValue] = useState(4);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const token = useSelector((state) => state.auth.tokens?.token);
  const allowLocalCartData = useSelector(
    (state) => state.cart.allowLocalCartData,
  );
  const allowLocalCart = !userDetails && allowLocalCartData;
  const cartData = useSelector((state) => state.cart.cartData);
  const cartItem = cartData?.cartLineItemDtoList?.find(
    (cartItem) => cartItem?.productId === product?.productId,
  );
  const cartQuantity = cartItem?.quantity || 0;
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = () => {
    const finalQuantity = parseInt(
      checkMainQtyMinMax({
        min: product?.minQuantityToSale,
        max: product?.maxQuantityToSale,
        availableQuantity: product?.availableQuantity,
        quantity: 1,
        cartQuantity: cartQuantity,
        dispatch,
      }),
    );
    let selectedProduct = [{ ...product, quantity: finalQuantity }];
    if (allowLocalCart) {
      localAddToCart(selectedProduct, localCartData)(dispatch);
    } else {
      const checkCartQuantity = selectedProduct?.some((item) => {
        const cartItem = cartData?.cartLineItemDtoList?.find(
          (cartItem) => cartItem?.productId === item?.productId,
        );
        if (item?.maxQuantityToSale)
          return cartItem?.quantity >= (item?.maxQuantityToSale || 0);
        return false;
      });
      if (checkCartQuantity) {
        return setAlert(
          "warn",
          "Product quantity cannot exceed the available stock or the maximum allowed quantity.",
        )(dispatch);
      }
      addTocart(selectedProduct, token)(dispatch);
    }
  };
  const ProductButtons = ({ isMobile }) => {
    return (
      <div
        className="cartButtons"
        style={
          isMobile
            ? {
                // position: "absolut e",
                bottom: 10,
                width: "100%",
              }
            : { width: "100%" }
        }
      >
        <div style={{ margin: "0 auto", maxWidth: isMobile ? "100%" : "100%" }}>
          {userDetails || false ? (
            <>
              <ProductPriceContainer className="cardButton">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    gap: "1rem",
                    margin: "0 auto",
                  }}
                  className="addToCartContainer"
                >
                  {product?.availableQuantity > 0 ||
                  product?.hasChildProduct ? (
                    <ProductButton
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      small={onListPage}
                      onClick={(e) => {
                        if (product?.hasChildProduct) return;
                        e.stopPropagation();
                        addToCart();
                      }}
                    >
                      <ProductAddButton>
                        {/* {(!(product?.standardPriceWithoutDiscount > product?.standardPrice) || isTablet) && ( */}
                        {/* <span className="icon">{<FaAnglesRight />}</span> */}
                        <span className="icon">
                          <CartIcon color="#000000" />
                        </span>
                        <div className="hideContent">
                          {product?.hasChildProduct
                            ? "Choose options"
                            : "Add To Cart"}
                        </div>
                        {/* )} */}
                      </ProductAddButton>
                    </ProductButton>
                  ) : (
                    <ProductButton
                      style={{ cursor: "default" }}
                      disabled
                      small={onListPage}
                    >
                      <ProductAddButton>
                        <span className="icon">
                          <CartIcon color="#01A68F" />
                        </span>
                        <div className="hideContent">{"Out of stock"}</div>
                      </ProductAddButton>
                    </ProductButton>
                  )}
                </div>
              </ProductPriceContainer>
            </>
          ) : (
            <>
              <LoginButton
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
                small={onListPage}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/account/login");
                }}
              >
                <LoginToAddButton>
                  <span className="icon">
                    <CartIcon color="#000000" />
                  </span>
                  <div className="hideContent">
                    {!isMobile ? "Login" : "Login for Price"}
                  </div>
                </LoginToAddButton>
              </LoginButton>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Dialog
        open={showQuickView}
        onClose={() => setShowQuickView(false)}
        maxWidth="lg"
        fullWidth={true}
      >
        <ProductQuickView>
          <AiOutlineClose
            className="closeIcon"
            onClick={() => setShowQuickView(false)}
          />
          {showQuickView && <ProductViewContainer id={product.productId} />}
        </ProductQuickView>
      </Dialog>
      <Link
        href={`/product-details/${paramCase(
          product.alias ?? product.productName,
        )}?id=${product.productId}`}
      >
        <ProductCard
          isWhiteBg={isNew}
          className="product-card"
          onListPage={onListPage}
          onClick={handleProducts}
          color={getRandomColor()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              zIndex: 20,
            }}
          >
            <QuickView className="quickView">
              {/* <QuickViewBtn onlyIcon>
                <FiHeart />
              </QuickViewBtn> */}
              {/* <QuickViewBtn
                onlyIcon
                onClick={(e) => {
                  if (product?.hasChildProduct) return;
                  e.stopPropagation();
                  addToCart();
                }}
              >
                <RiShoppingCart2Line />
              </QuickViewBtn> */}
              <QuickViewBtn
                onlyIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickView(true);
                }}
              >
                <AiOutlineEye />
              </QuickViewBtn>
            </QuickView>
          </div>
          <ImageBox className="imageContainer" small={onListPage}>
            <Box className="imageBox">
              <div>
                <Image
                  src={
                    product.imageUrl && product.imageUrl !== "null"
                      ? product.imageUrl
                      : "/images/products/imgnotfound.png"
                  }
                  alt={product.productName}
                  layout="intrinsic"
                  placeholder="blur"
                  blurDataURL={
                    product.imageUrl && product.imageUrl !== "null"
                      ? product.imageUrl
                      : "/images/products/imgnotfound.png"
                  }
                  width={250}
                  height={250}
                  objectFit="contain"
                />
              </div>
            </Box>

            {/* {!isMobile && isHovered &&} */}
          </ImageBox>
          <ProductContent small={onListPage}>
            <ProductName small={onListPage}>{product.productName}</ProductName>
            {userDetails || false ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { xs: "center" },
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", md: "column" },
                    // width: "85%",
                    // padding: "0 0.875rem",
                    gap: { xs: "0", md: "0.5rem" },
                    // gap: "1rem",
                  }}
                >
                  {product?.standardPriceWithoutDiscount >
                  product?.standardPrice ? (
                    <ProductPrice small={onListPage} className="price">
                      <p>${product.standardPrice?.toFixed(2)}</p>
                      <del>
                        ${product.standardPriceWithoutDiscount?.toFixed(2)}
                      </del>
                    </ProductPrice>
                  ) : (
                    <ProductPrice small={onListPage} className="price">
                      <p>${product.standardPrice?.toFixed(2)}</p>
                    </ProductPrice>
                  )}
                </Box>
              </>
            ) : (
              <></>
            )}
            <ProductButtons />
          </ProductContent>
        </ProductCard>
      </Link>
    </>
  );
};

export default CommonProductCard;

export const CartIcon = ({ color = "#000000" }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cart-icon"
    >
      <path
        d="M6.29639 10.5557C6.29639 11.9779 7.46676 13.1483 8.88898 13.1483C10.3112 13.1483 11.4816 11.9779 11.4816 10.5557"
        stroke={color}
        strokeWidth="1.11111"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.52596 1.48145L3.84448 4.17033"
        stroke={color}
        strokeWidth="1.11111"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.252 1.48145L13.9334 4.17033"
        stroke={color}
        strokeWidth="1.11111"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.48145 5.81473C1.48145 4.44436 2.21478 4.33325 3.12589 4.33325H14.6518C15.5629 4.33325 16.2963 4.44436 16.2963 5.81473C16.2963 7.40733 15.5629 7.29622 14.6518 7.29622H3.12589C2.21478 7.29622 1.48145 7.40733 1.48145 5.81473Z"
        stroke={color}
        strokeWidth="1.11111"
      />
      <path
        d="M2.59253 7.40747L3.63697 13.8075C3.87401 15.2445 4.44438 16.2964 6.5629 16.2964H11.0296C13.3333 16.2964 13.674 15.289 13.9407 13.8964L15.1851 7.40747"
        stroke={color}
        strokeWidth="1.11111"
        strokeLinecap="round"
      />
    </svg>
  );
};
