import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

import { FaX, FaXTwitter } from "react-icons/fa6";
import { ImFacebook } from "react-icons/im";
import { IoLogoPinterest } from "react-icons/io";
import { LuInstagram } from "react-icons/lu";
import styled from "styled-components";
import theme from "../../utilities/theme/theme";
import {
  FooterCol,
  FooterLink,
  FooterLinksBox,
  FooterLinksCol,
} from "./footer.styles";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { links1, links2, links3, links4, links6 } from "./footerData";
import Newsteller from "../home/Newsteller/Newsteller";
const InputBox = styled.form`
  width: 100%;
  height: 53px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  border-radius: 11px;
  input {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    padding: 0.2em 1em;
    font-size: 15px;
    color: black;
    font-weight: 300;
    border: none;
    outline: none;
    &:hover,
    &:focus {
      outline: none;
      border: none;
    }

    &::placeholder {
      font-size: 15px;
      color: #000;
    }
  }
  @media only screen and (max-width: 640px) {
    max-width: 90%;
  }
`;
const socialIcons = [
  { icon: <FaFacebook size={21} color="#000000" />, name: "Facebook" },
  { icon: <FaTwitter size={21} color="#000000" />, name: "Twitter" },
  { icon: <FaPinterest size={21} color="#000000" />, name: "Pinterest" },
  { icon: <FaLinkedin size={21} color="#000000" />, name: "LinkedIn" },
  { icon: <FaWhatsapp size={21} color="#000000" />, name: "WhatsApp" },
];
const ImgBox = styled(Box)({
  position: "relative",
});

const footer = ({ width }) => {
  return (
    <div style={{ backgroundColor: theme.palette.bg.footer }}>
      <Box
        sx={{
          ".MuiGrid-item": {
            pt: { lg: "1rem", md: "1rem", sm: "1rem", xs: "1rem" },
          },
        }}
        maxWidth={"1420px"}
        margin={"0 auto"}
        py={7}
      >
        <div>
          <FooterLinksBox
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
          >
            <Grid container spacing={2} px={"0.5rem"}>
              <Grid
                item
                lg={3}
                md={3}
                sm={12}
                xs={12}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"start"}
              >
                <ImgBox>
                  <img
                    src="/images/footer/logo.png"
                    alt="logo"
                    style={{
                      maxWidth: "259px",
                      width: "100%",
                      maxHeight: "42px",
                      height: "100%",
                      marginBottom: "1rem",
                    }}
                  />
                  <FooterLinksCol align={width > 786 ? "start" : "start"}>
                    <FooterCol>
                      {links4.map((link, i) => (
                        <FooterLink
                          margin="0"
                          key={i}
                          url={link.url}
                          icon={link?.icon}
                          fontWeight={400}
                          color="#000000"
                        >
                          {link.alias}
                        </FooterLink>
                      ))}
                    </FooterCol>
                  </FooterLinksCol>
                </ImgBox>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <FooterLinksCol align={width > 786 ? "start" : "start"}>
                  <FooterCol>
                    <h6>Support Links</h6>
                    {links1.map((link, i) => (
                      <FooterLink margin="0" key={i} url={link.url}>
                        {link.alias}
                      </FooterLink>
                    ))}
                  </FooterCol>
                </FooterLinksCol>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <FooterLinksCol align={width > 786 ? "start" : "start"}>
                  <FooterCol>
                    <h6>Quick Links</h6>
                    {links3.map((link, i) => (
                      <FooterLink margin="0" key={i} url={link.url}>
                        {link.alias}
                      </FooterLink>
                    ))}
                  </FooterCol>
                </FooterLinksCol>
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <FooterLinksCol align={width > 786 ? "start" : "start"}>
                  <FooterCol>
                    <h6>Account</h6>
                    {links2.map((link, i) => (
                      <FooterLink margin="0" key={i} url={link.url}>
                        {link.alias}
                      </FooterLink>
                    ))}
                  </FooterCol>
                </FooterLinksCol>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <FooterLinksCol align={width > 786 ? "start" : "start"}>
                  <FooterCol>
                    <h6 style={{ fontSize: "24px", fontWeight: "900" }}>
                      <span style={{ color: "#E22416" }}>MAKE</span>
                      <br />
                      YOUR FIRST PURCHASE
                    </h6>
                    <div
                      style={{
                        fontFamily: "ProductSans",
                        fontWeight: 300,
                        fontSize: "12px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        marginBottom: "0.5rem",
                      }}
                    >
                      & be the first to know about new arrivals, special offers,
                      in-store events and news.
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Newsteller />
                      {/* <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "23px",
                        }}
                      >
                        {socialIcons.map((item, index) => (
                          <Link href="/#" key={index}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0.3rem",
                                cursor: "pointer",
                              }}
                              title={item.name}
                            >
                              {item.icon}
                            </div>
                          </Link>
                        ))}
                      </div> */}
                    </div>
                  </FooterCol>
                </FooterLinksCol>
              </Grid>
              {/* <Grid item lg={3} md={6} sm={12} xs={12}>
                    <FooterLinksCol align={width > 786 ? "start" : "start"}>
                      <FooterCol>
                        <h6>Let&apos;s Talk</h6>
                        {links4.map((link, i) => (
                          <FooterLink
                            margin="0"
                            key={i}
                            url={link.url}
                            icon={link?.icon}
                          >
                            {link.alias}
                          </FooterLink>
                        ))}
                        <h6 style={{ marginTop: "25px" }}>Find Us</h6>
                        {links6.map((link, i) => (
                          <FooterLink
                            margin="0"
                            key={i}
                            url={link.url}
                            icon={link?.icon}
                          >
                            {link.alias}
                          </FooterLink>
                        ))}
                      </FooterCol>
                    </FooterLinksCol>
                  </Grid> */}
            </Grid>
          </FooterLinksBox>
        </div>
      </Box>
      <div
        style={{
          backgroundColor: theme.palette.bg.footer,
        }}
      >
        <Box
          sx={{
            minHeight: "81px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "10px",
            maxWidth: "1420px",
            width: "100%",
            margin: "0 auto",
            borderTop: "9px solid #ffffff",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography
                variant="body1"
                fontSize="14px"
                fontFamily={"ProductSans"}
                fontWeight={300}
                color="#000000"
                textAlign={"start"}
              >
                © {new Date().getFullYear()} , Fast Distro Distribution. All
                rights reserved.
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              justifyContent={width > 786 ? "end" : "flex-start"}
              alignItems={width > 786 ? "end" : "flex-start"}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: width > 786 ? "flex-end" : "flex-start",
                  alignItems: width > 786 ? "flex-end" : "flex-start",
                  gap: 5,
                }}
              >
                <img
                  src="/images/footer/payment.png"
                  alt="payment logo"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "36px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default footer;
