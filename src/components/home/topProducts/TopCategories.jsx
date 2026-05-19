import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation, Pagination]);
/////////
import { Grid, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { FiInstagram } from "react-icons/fi";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { Container, ImageCard, SwiperContainer } from "./categories.styles";
import theme from "../../../utilities/theme/theme";

const TopCategories = ({ businessId }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:640px)");

  const { data: products } = useDatafetcher(
    `/home/sliderImages?sliderType=trending-categories&businessTypeId=${
      businessId || 1
    }`,
    true
  );
  if (products?.sliderImageList?.length <= 0) return <></>;
  return (
    <div style={{}}>
      <div
        style={{
          maxWidth: "1575px",
          margin: "1rem auto",
          paddingBottom: "2rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            padding={"1rem"}
            textAlign={"center"}
          >
            <div
              style={{ fontSize: "39px", fontWeight: 700, color: "#000000" }}
            >
              Trending categories
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {products?.sliderImageList?.length > 0 ? (
              <Container
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={`homeCarousel`}
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: "100%",
                    padding: "0 0",
                  }}
                >
                  <SwiperContainer
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={0}
                    breakpoints={{
                      1: {
                        slidesPerView: 1,
                      },
                      380: {
                        slidesPerView: 2,
                      },
                      754: {
                        slidesPerView: 4,
                      },
                      1080: {
                        slidesPerView: 5,
                      },
                      1280: {
                        slidesPerView: 6,
                      },
                      1480: {
                        slidesPerView: 6,
                      },
                    }}
                    loop={true}
                    navigation={false}
                    style={{ maxWidth: "100%" }}
                  >
                    {products?.sliderImageList?.map((product, i) => (
                      <SwiperSlide
                        key={i}
                        style={{ display: "grid", placeItems: "center" }}
                      >
                        <Link href={product?.redirectPath || ""}>
                          <ImageCard index={i}>
                            <img
                              src={
                                product?.imageUrl ||
                                "/images/products/noImageAvailable.png"
                              }
                              alt="img"
                            />
                          </ImageCard>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </SwiperContainer>
                </Stack>
              </Container>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TopCategories;
