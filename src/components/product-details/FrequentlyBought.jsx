import { Box, Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../../utilities/theme/theme";
import { CiBoxes } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { BsStar } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { LuChartSpline } from "react-icons/lu";

const useStyles = makeStyles({
  root: {
    // borderTop: "1px solid #CBCBCB",
    width: "100%",
    fontFamily: "ProductSans",
    display: "flex",
    gap: "4rem",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  plus: {
    marginLeft: "0px !important",
    fontSize: "26px",
  },
  price: {
    fontSize: "14px",
  },
  span: {
    fontWeight: 800,
    fontSize: "16px",
  },
  del: {
    fontWeight: 500,
  },
});
const items = [
  {
    name: "facebook",
    icon: <FaFacebook style={{ fontSize: "1.3125rem", marginTop: "0.2rem" }} />,
  },
  {
    name: "instagram",
    icon: (
      <FaInstagram style={{ fontSize: "1.3125rem", marginTop: "0.2rem" }} />
    ),
  },
  {
    name: "linkedin",
    icon: <FaLinkedin style={{ fontSize: "1.3125rem" }} />,
  },
  {
    name: "whatsapp",
    icon: <FaWhatsapp style={{ fontSize: "1.3125rem" }} />,
  },
  // {
  //   name: "twitter",
  //   icon: <FaXTwitter style={{ fontSize: "1.3125rem", marginTop: "0.2rem" }} />,
  // },
  {
    name: "messenger",
    icon: <FaFacebookMessenger style={{ fontSize: "1.3125rem" }} />,
  },
];

const IconContainer = styled.div`
  cursor: pointer;
  svg {
    font-size: 1.1456rem;
    color: #dead51;
  }
  transition: all 0.5s;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledButton = styled.button`
  border: 1px solid ${theme.palette.colors.light};
  color: ${theme.palette.colors.secondary}80;
  background: transparent;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  svg {
    font-size: 18px;
  }
`;

const InfoBlock = styled(Box)`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 1.5rem 0;
  @media (max-width: 600px) {
    justify-content: center;
    padding: 1rem 0;
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  font-size: 24px;
`;

const TextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PrimaryText = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  line-height: 1;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const SecondaryText = styled(Typography)`
  font-size: 13px;
  font-weight: 300;
  color: #e22416;
  line-height: 1.2;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Container = styled(Box)`
  width: 100%;
  background: transparent;
  padding: 1rem 2rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const infoItems = [
  // {
  //   icon: <BsBoxSeam />,
  //   primaryText: "Free Next Day Delivery",
  //   secondaryText: "On Orders Over $200",
  // },
  {
    icon: <FiPhoneCall />,
    primaryText: "Questions?",
    secondaryText: "Contact Support",
  },
  // {
  //   icon: <LuChartSpline />,
  //   primaryText: "Earn 5% Cash Back",
  //   secondaryText: "Join Our Rewards Club",
  // },
];

export default function FrequentlyBought({ product }) {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.auth.userDetails);

  return (
    <Container>
      <Grid container spacing={3} sx={{ justifyContent: "start" }}>
        {infoItems.map((item, index) => (
          <Grid item lg={4} md={4} sm={4} xs={6} key={index}>
            <InfoBlock>
              <IconWrapper>{item.icon}</IconWrapper>
              <TextContainer>
                <PrimaryText>{item.primaryText}</PrimaryText>
                <SecondaryText>{item.secondaryText}</SecondaryText>
              </TextContainer>
            </InfoBlock>
          </Grid>
        ))}

        <Grid lg={12} width={"100%"}>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              padding: "11px 17px",
              width: "100%",
            }}
          >
            <div
              style={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0%",
              }}
            >
              Guarantee Safe Checkout
            </div>
            <div className="">
              {" "}
              <img
                src="/images/footer/payment.png"
                alt="payment logo"
                style={{
                  maxWidth: "150px",
                  maxHeight: "25px",
                  width: "100%",
                  height: "100%",
                  marginTop: "7px",
                }}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
