import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation, Pagination]);
/////////
import { ProductsContainer, ProductSwiperContainer } from "./product.styles";

import { Stack } from "@mui/material";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import CommonProductCard from "../../productCard/productCard";
import theme from "../../../utilities/theme/theme";

const ProductSlider = ({ data, productId, businessId }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { data: products, error } = useDatafetcher(
    data
      ? `/home/product/tagId/${data?.id}?page=0&size=999&businessTypeId=${businessId}&storeId=2`
      : `/ecommerce/product/${productId}/relatedProduct?storeIds=1,2,46,47,48,49,50,51,52`,
    data?.id || productId,
    { stateId: true },
  );

  let delay = 4000 + (500 * data?.id || 1);
  const isNew = data?.name.toLowerCase().includes("new product");
  if (products && products.content.length > 0) {
    return (
      <ProductsContainer
        // alignItems="center"
        className={`homeCarousel ${isNew ? "bg-grey" : ""}`}
      >
        {data ? (
          <Stack
            // flexDirection="row"
            // alignItems="center"
            // alignSelf="center"
            // justifyContent="center"
            sx={{
              // width: "100%",
              // background: "#E4E4E4",
              // borderBottom: "1px solid #26262610",
              margin: "auto",
              m: "1rem 0 2rem 0",
              p: { xs: "0 1rem", sm: "0 1rem" },
              maxWidth: "1575px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.438rem",
                fontWeight: 700,
                textAlign: "center",
                color: "#000000",
                lineHeight: 1.2,
              }}
            >
              {data?.name}
            </div>
            {data?.description && (
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "#8E8E8E",
                  marginTop: "5px",
                }}
              >
                {data?.description}
              </div>
            )}
          </Stack>
        ) : (
          <span style={{ marginTop: "1em" }}></span>
        )}
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            maxWidth: "1575px",
            padding: { xs: "0 0", sm: "0 1rem" },
          }}
        >
          {/* {products && (
            <NavButton ref={navigationPrevRef}>
              <MdOutlineArrowBackIos />
            </NavButton>
          )} */}
          <ProductSwiperContainer
            autoplay={{
              delay,
              disableOnInteraction: true,
            }}
            spaceBetween={10}
            breakpoints={{
              1: {
                slidesPerView: 2,
              },
              754: {
                slidesPerView: 3,
              },
              1060: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
              1480: {
                slidesPerView: 5,
              },
              1920: {
                slidesPerView: 5,
              },
            }}
            loop={products?.content?.length >= 6}
            navigation={true}
          >
            {products?.content?.map((product, i) => (
              <SwiperSlide
                key={i}
                style={{
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  padding: "0rem",
                }}
              >
                <CommonProductCard
                  isNew={isNew}
                  product={product}
                  tag={data?.name}
                />
              </SwiperSlide>
            ))}
          </ProductSwiperContainer>
          {/* {products && (
            <NavButton ref={navigationNextRef} left>
              <MdOutlineArrowForwardIos />
            </NavButton>
          )} */}
        </Stack>
      </ProductsContainer>
    );
  } else <></>;
};

export default ProductSlider;
