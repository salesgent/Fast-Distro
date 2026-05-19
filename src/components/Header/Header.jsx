import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown, BsShop } from "react-icons/bs";
import Image from "next/image";
import { BiHeart } from "react-icons/bi";
import { Icon, IconWrapper } from "./header.style";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
////////////////////////////////////////////////////////////////////////////
import { BsTelephoneForward } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

import {
  HeaderContainer,
  HeaderNav,
  HeaderMobNav,
  HeaderSection,
  IconBox,
  IconBoxes,
  LogoContainer,
  IconsContainer,
  SmIcons,
} from "./header.style";
import SearchHeader from "../Search/Search";
import useWindowScroll from "../../utilities/hooks/useWindowScroll";
import { Badge, Drawer, Stack, Typography, Divider, Box } from "@mui/material";
import NavDrawer from "../Navigation/NavDrawer/NavDrawer";
import useWindowSize from "../../utilities/hooks/useWindowSize";
import styles from "../Navigation/NavDrawer/mobile.module.scss";
import { setOpenDrawer } from "../../store/home";
import { toggleOpenDrawer } from "../../store/cart";
import AccountDropDown from "./DropDown/AccountDropDown";
import { setAlert } from "../../AsyncFunctions/alert";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import { useRouter } from "next/router";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import theme from "../../utilities/theme/theme";
import { RiShoppingBag4Line } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";

const Header = ({ businessId }) => {
  const router = useRouter();
  const { data, error } = useDatafetcher("/store/businessType", true);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const localCart = useSelector((state) => state.cart.localCartData);
  const cartData = useSelector((state) => state.cart.cartData);
  const openDrawer = useSelector((state) => state.Home.openDrawer);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const selectedBusiness = data?.find((v) => v.id !== Number(businessId));
  const notSelectedBusiness = data?.find((v) => v.id !== Number(businessId));
  return (
    <HeaderSection className="header">
      <HeaderContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            "@media (max-width:1200px)": {
              width: "100%",
            },
          }}
        >
          <SmIcons>
            <FiMenu
              onClick={() => dispatch(setOpenDrawer(true))}
              color={theme.palette.colors.primary}
            />
            {/* ///////////mobile drawer//// */}
            <Drawer
              className="header"
              open={openDrawer}
              onClose={() => dispatch(setOpenDrawer(false))}
            >
              <div className={styles.drawerContainer}>
                <NavDrawer businessId={businessId} />
              </div>
            </Drawer>
          </SmIcons>
          <LogoContainer>
            <Link href="/">
              <Image
                layout="fill"
                src="/images/header/logo.png"
                alt="logo"
                objectFit="contain"
              />
            </Link>
          </LogoContainer>
        </Box>

        {width > 1400 && (
          <HeaderNav className="noBelowLg">
            <SearchHeader businessId={businessId} />
            {/* <div
              style={{
                backgroundColor: "#000000",
                borderRadius: "10px",
                maxHeight: "49px",
                height: "49px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                padding: "0 19px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Get 15% Off Now
            </div> */}
          </HeaderNav>
        )}
        <IconsContainer>
          {userDetails ? (
            <IconWrapper
              capitalize
              // className="noBelowMd"
              noHover
              onMouseEnter={() => setShowDropDown(true)}
              onMouseLeave={() => setShowDropDown(false)}
            >
              <IconBox bg="true" onClick={() => console.log("hello")}>
                <UserIcon />
              </IconBox>
              <div className="rightSection noBelowMd">
                <p
                  style={{
                    color: "#000000",
                    fontWeight: "400",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userDetails?.customerDto?.firstName}
                </p>
              </div>
              {showDropDown && <AccountDropDown />}
            </IconWrapper>
          ) : (
            <Link href="/account/login">
              <IconWrapper>
                <IconBox bg="true" onClick={() => console.log("hello")}>
                  <UserIcon />
                </IconBox>
                <div className="rightSection noBelowMd">
                  <p
                    style={{
                      color: "#000000",
                      fontWeight: "400",
                      fontSize: "18px",
                      width: "max-content",
                    }}
                  >
                    My Account
                  </p>
                </div>
              </IconWrapper>
            </Link>
          )}
          {/* <Divider
            className="noBelowMd"
            style={{
              color: "#65B9F6",
              borderColor: "#65B9F6",
              maxHeight: "23px",
              margin: "0 1rem",
            }}
            orientation="vertical"
          /> */}
          <IconWrapper
            onClick={() => {
              if (userDetails) {
                dispatch(toggleOpenDrawer(true));
              } else {
                setAlert("warn", "login to view cart");
              }
            }}
          >
            <IconBox bg="true">
              {/* <Badge
                badgeContent={
                  userDetails
                    ? cartData?.totalCartQuantity || 0
                    : localCart?.totalCartQuantity || 0
                }
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: theme.palette.colors.primary,
                    color: theme.palette.colors.white,
                    marginTop: "5px",
                  },
                }}
                showZero={true}
                color="error"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <CartIcon />
              </Badge> */}

              <CartIcon />
            </IconBox>

            <div className="rightSection noBelowMd">
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "#000000",
                }}
              >
                $
                {cartData?.totalCartPrice?.toFixed(2) ||
                  localCart?.totalCartPrice?.toFixed(2) ||
                  "0.00"}
              </p>
            </div>
          </IconWrapper>
        </IconsContainer>
      </HeaderContainer>
      {width < 1400 && (
        <HeaderMobNav>
          <SearchHeader />
        </HeaderMobNav>
      )}
    </HeaderSection>
  );
};

export default Header;

const UserIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_23_15)">
        <path
          d="M20.9999 24V21.555C21.0024 21.138 20.9223 20.7246 20.7643 20.3386C20.6063 19.9527 20.3735 19.6018 20.0793 19.3062C19.7851 19.0106 19.4354 18.7762 19.0502 18.6163C18.665 18.4565 18.2519 18.3745 17.8349 18.375H6.1649C5.74787 18.3745 5.33485 18.4565 4.94965 18.6163C4.56445 18.7762 4.21467 19.0106 3.92048 19.3062C3.62629 19.6018 3.39349 19.9527 3.23549 20.3386C3.0775 20.7246 2.99743 21.138 2.9999 21.555V24H0.337404V21.555C0.336911 20.7896 0.487307 20.0316 0.779991 19.3243C1.07268 18.6171 1.50191 17.9745 2.04314 17.4332C2.58437 16.892 3.22699 16.4628 3.93423 16.1701C4.64148 15.8774 5.39949 15.727 6.1649 15.7275H17.8349C18.6003 15.727 19.3583 15.8774 20.0656 16.1701C20.7728 16.4628 21.4154 16.892 21.9567 17.4332C22.4979 17.9745 22.9271 18.6171 23.2198 19.3243C23.5125 20.0316 23.6629 20.7896 23.6624 21.555V24H20.9999ZM12.1987 13.875C10.3557 13.8701 8.58906 13.1384 7.2824 11.8387C6.63678 11.1931 6.12464 10.4267 5.77523 9.58316C5.42581 8.73963 5.24597 7.83554 5.24597 6.9225C5.24597 6.00946 5.42581 5.10537 5.77523 4.26183C6.12464 3.4183 6.63678 2.65185 7.2824 2.00625C8.25515 1.0309 9.49584 0.366683 10.8469 0.0979564C12.1979 -0.170771 13.5984 -0.0318782 14.8703 0.496992C16.1422 1.02586 17.2283 1.92084 17.9905 3.06826C18.7527 4.21568 19.1567 5.56375 19.1512 6.94125C19.1521 7.85423 18.9731 8.75844 18.6243 9.60216C18.2755 10.4459 17.7637 11.2125 17.1183 11.8583C16.4729 12.504 15.7066 13.0162 14.863 13.3655C14.0195 13.7147 13.1154 13.8942 12.2024 13.8937L12.1987 13.875ZM12.1987 2.625C11.2061 2.62512 10.2444 2.96937 9.47724 3.5991C8.7101 4.22884 8.18503 5.10508 7.99151 6.07854C7.798 7.052 7.948 8.06244 8.41596 8.9377C8.88392 9.81296 9.64088 10.4989 10.5579 10.8786C11.4749 11.2583 12.4952 11.3084 13.4449 11.0201C14.3947 10.7319 15.2151 10.1233 15.7664 9.29806C16.3177 8.47276 16.5659 7.48184 16.4685 6.49412C16.3711 5.5064 15.9343 4.583 15.2324 3.88125C14.8333 3.48675 14.3601 3.17501 13.8401 2.96393C13.3201 2.75285 12.7636 2.64658 12.2024 2.65125L12.1987 2.625Z"
          fill="#0A0A0A"
        />
      </g>
      <defs>
        <clipPath id="clip0_23_15">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CartIcon = ({ color = "#0A0A0A" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 3H16.6C15.8 1.2 14 0 12 0C10 0 8.2 1.2 7.4 3H3C2.4 3 2 3.4 2 4V23C2 23.6 2.4 24 3 24H21C21.6 24 22 23.6 22 23V4C22 3.4 21.6 3 21 3ZM12 1C13.5 1 14.8 1.8 15.4 3H8.6C9.2 1.8 10.5 1 12 1ZM20 22H4V18H20V22ZM20 17H4V5H7V9H8V5H16V9H17V5H20V17Z"
        fill={color}
      />
    </svg>
  );
};
