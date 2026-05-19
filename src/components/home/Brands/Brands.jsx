import { Grid, Box, CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { useRouter } from "next/router";

SwiperCore.use([Autoplay, Navigation]);

// const Container = styled(Stack)`
//   width: 100%;
//   margin-bottom: 5em;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   @media only screen and (max-width: 768px) {
//     height: 10.8rem;
//   }
// `;
const BrandGridContainer = styled(Box)`
  max-width: 1475px;
  margin: auto;
  padding: 20px;
`;

const BrandSwiperContainer = styled(Swiper)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;

  @media only screen and (max-width: 1498px) {
    min-width: 90%;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 10px;
  }
`;

const BrandSlideGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
  width: 100%;
  user-select: none;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 899px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 599px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BrandItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100%;
  min-height: 120px;
  border: 1px solid #b3b3b310;
  border-radius: 0;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 10px;
  &:hover {
    scale: 1.05;
  }
  @media only screen and (max-width: 768px) {
    min-height: 100px;
    padding: 15px;
    gap: 8px;
  }

  @media only screen and (max-width: 450px) {
    min-height: 80px;
    padding: 10px;
    gap: 5px;
  }
`;

const BrandImg = styled.img`
  width: 100%;
  max-width: 200px;
  max-height: 100px;
  height: 100px;
  object-fit: contain;
  display: block;

  @media only screen and (max-width: 768px) {
    max-width: 150px;
  }

  @media only screen and (max-width: 450px) {
    max-width: 120px;
  }
`;

const BrandName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  margin-top: 5px;
  word-break: break-word;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 450px) {
    font-size: 11px;
  }
`;
const BrandCarousel = () => {
  const { data: brands, loading } = useDatafetcher(
    `ecommerce/brand/list?size=20`,
    true
  );

  // Handle different possible data structures
  const brandsArray = React.useMemo(() => {
    if (!brands) return [];
    // Check if brands is an array directly
    if (Array.isArray(brands)) return brands;
    // Check if brands.content exists (pagination structure)
    if (brands.content && Array.isArray(brands.content)) return brands.content;
    // Check if brands.result exists
    if (brands.result) {
      if (Array.isArray(brands.result)) return brands.result;
      if (brands.result.content && Array.isArray(brands.result.content))
        return brands.result.content;
    }
    return [];
  }, [brands]);

  // Extract all brands (with or without logos - will use fallback image)
  const brandsWithLogos = React.useMemo(() => {
    if (brandsArray.length === 0) {
      return [];
    }

    const allBrands = brandsArray.map((brand) => {
      const brandLogos = brand?.brandAttachmentMap?.["Brand Logo"];
      return {
        id: brand.id,
        name: brand.name,
        logoUrl: brandLogos?.[0]?.url || null,
        urlAlias: brand.urlAlias,
      };
    });
    return allBrands;
  }, [brandsArray]);

  // Group brands into chunks of 10 (5 columns × 2 rows)
  const brandGroups = React.useMemo(() => {
    const groups = [];
    const itemsPerGroup = 10; // 5 columns × 2 rows

    for (let i = 0; i < brandsWithLogos.length; i += itemsPerGroup) {
      groups.push(brandsWithLogos.slice(i, i + itemsPerGroup));
    }

    return groups;
  }, [brandsWithLogos]);

  let delay = 4000;
  const router = useRouter();
  return (
    <RootContainer className="homeCarousel">
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} textAlign={"center"}>
          <div
            style={{
              fontFamily: "ProductSans",
              fontWeight: 700,
              fontStyle: "Bold",
              fontSize: "39px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            Explore Our Trusted Brands
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#000000",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              verticalAlign: "middle",
              marginTop: "15px",
              marginBottom: "2px",
            }}
          >
            Dive into a diverse selection of top-tier brands in the vaping
            industry.
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#8E8E8E",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              verticalAlign: "middle",
              marginBottom: "25px",
            }}
          >
            Each brand is chosen to provide you with a variety of high-quality
            products.
          </div>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <BrandGridContainer>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
              >
                <CircularProgress />
              </Box>
            ) : brandsWithLogos.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
              >
                <div>No brands found</div>
              </Box>
            ) : brandGroups.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
              >
                <div>No brand groups to display</div>
              </Box>
            ) : (
              <BrandSwiperContainer
                autoplay={{
                  delay,
                  disableOnInteraction: true,
                }}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  1: {
                    slidesPerView: 1,
                  },
                }}
                loop={brandGroups.length > 1}
                navigation={true}
                allowTouchMove={true}
              >
                {brandGroups.map((group, groupIndex) => (
                  <SwiperSlide key={`group-${groupIndex}`}>
                    <BrandSlideGrid>
                      {group.map((brand) => (
                        <BrandItem
                          key={brand.id}
                          onClick={() => {
                            console.log("brand", brand);
                            router?.push(
                              `/brand/${brand?.urlAlias}/${brand?.id}`
                            );
                          }}
                        >
                          <BrandImg
                            src={
                              brand.logoUrl && brand.logoUrl !== "null"
                                ? brand.logoUrl
                                : "/images/products/imgnotfound.png"
                            }
                            alt={brand.name}
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "/images/products/imgnotfound.png";
                            }}
                          />
                          <BrandName>{brand.name}</BrandName>
                        </BrandItem>
                      ))}
                    </BrandSlideGrid>
                  </SwiperSlide>
                ))}
              </BrandSwiperContainer>
            )}
          </BrandGridContainer>
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default BrandCarousel;

const RootContainer = styled.div`
  // padding: 40px 20px;
  border-radius: 0;
  position: relative;
  width: 100%;
  max-width: 1420px;
  margin: auto;
  padding-top: 2.5rem;
  @media only screen and (max-width: 768px) {
    // padding: 30px 15px;
  }
`;
