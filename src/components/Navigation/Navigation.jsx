import { Divider } from "@mui/material";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Popper } from "@mui/material";
import Link from "next/link";
import { setAlert } from "../../AsyncFunctions/alert";
import { toggleOpenDrawer } from "../../store/cart";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import useWindowScroll from "../../utilities/hooks/useWindowScroll";
import { ErrorMessage } from "../../utilities/theme/components";
import NavBody from "./NavBody";
import styles from "./style.module.scss";
import { BsTelephone } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import { grey } from "@mui/material/colors";
import { RiShoppingBag4Line } from "react-icons/ri";
import { CartIcon } from "../Header/Header";

export const categoryIcons = [
  { src: "/images/navigation/categoryIcons/Frame1.png" },
  { src: "/images/navigation/categoryIcons/Frame2.png" },
  { src: "/images/navigation/categoryIcons/Frame3.png" },
  { src: "/images/navigation/categoryIcons/Frame4.png" },
  { src: "/images/navigation/categoryIcons/Frame5.png" },
  { src: "/images/navigation/categoryIcons/Frame6.png" },
  { src: "/images/navigation/categoryIcons/Frame7.png" },
  { src: "/images/navigation/categoryIcons/Frame8.png" },
  { src: "/images/navigation/categoryIcons/Frame1.png" },
  { src: "/images/navigation/categoryIcons/Frame2.png" },
  { src: "/images/navigation/categoryIcons/Frame3.png" },
  { src: "/images/navigation/categoryIcons/Frame4.png" },
  { src: "/images/navigation/categoryIcons/Frame5.png" },
  { src: "/images/navigation/categoryIcons/Frame6.png" },
  { src: "/images/navigation/categoryIcons/Frame7.png" },
  { src: "/images/navigation/categoryIcons/Frame8.png" },
];
const Navigation = ({ businessId = 10 }) => {
  const anchorRef = React.useRef(null);
  const [showNavData, setShowNavData] = useState(-1);
  const { scrollY } = useWindowScroll();
  const dispatch = useDispatch();
  const { data: navData, error } = useDatafetcher(
    `/menu?businessTypeId=1`,
    true
  );
  const localCart = useSelector((state) => state.cart.localCartData);
  const cartData = useSelector((state) => state.cart.cartData);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (prop) => (event) => {
    setShowNavData(prop);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper " + Math.random() : undefined;

  const extraData = [
    {
      id: "What's New",
      name: "What's New",
      link: "/",
      subCategories: [],
    },
    {
      id: "Deals",
      name: "Deals",
      link: "/",
      subCategories: [],
    },
    {
      id: "Brands",
      name: "Brands",
      link: "/",
      subCategories: [],
    },
    {
      id: "Contact",
      name: "Contact",
      link: "/contact-us",
      subCategories: [],
    },
  ];
  const modifyNavData = [
    ...(navData || []),
    // ...extraData,
  ];

  return (
    <div
      className={scrollY > 250 ? styles.scrolledContainer : styles.container}
    >
      <>
        {error && <ErrorMessage>unable to fetch navigation data!</ErrorMessage>}
        <div className={styles.mainContainer}>
          {modifyNavData?.map((nav, i) => (
            <>
              <div
                className={styles.navLink}
                key={i}
                onMouseEnter={handleClick(nav.id)}
                aria-describedby={id}
                onMouseLeave={() => {
                  setAnchorEl(null);
                  setShowNavData(-1);
                }}
                id={`overlay-${nav.id}`}
                style={
                  nav?.subCategories &&
                  nav.subCategories?.length > 0 &&
                  nav?.subCategories?.[0]?.subCategories?.length > 0
                    ? {}
                    : { position: "relative" }
                }
              >
                {nav?.subCategories && nav.subCategories.length < 1 ? (
                  <Link
                    href={{
                      pathname: nav.link || `/products/${nav.alias}/${nav.id}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <a className={styles.hover}>
                        {categoryIcons[i % categoryIcons.length]?.src && (
                          <img
                            src={categoryIcons[i % categoryIcons.length]?.src}
                            alt=""
                            style={{
                              marginRight: "0.8rem",
                              maxWidth: "22px",
                              maxHeight: "22px",
                            }}
                          />
                        )}
                        <span>{nav.name?.toLowerCase()}</span>
                      </a>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={{
                      pathname: nav.link || `/products/${nav.alias}/${nav.id}`,
                    }}
                  >
                    <a>
                      {categoryIcons[i % categoryIcons.length]?.src && (
                        <img
                          src={categoryIcons[i % categoryIcons.length]?.src}
                          alt=""
                          style={{
                            marginRight: "0.8rem",
                            maxWidth: "22px",
                            maxHeight: "22px",
                          }}
                        />
                      )}
                      <span>{nav.name?.toLocaleLowerCase()}</span>
                      <FaChevronDown
                        style={
                          showNavData === nav.id
                            ? {
                                transition: ".5s",
                                margin: "0 0 0 .4rem",
                                transform: "rotate(180deg)",
                              }
                            : {
                                transition: ".5s",
                                margin: "0 0 0 .4rem",
                                transform: "rotate(0deg)",
                              }
                        }
                      />
                    </a>
                  </Link>
                )}
                {nav?.subCategories && nav.subCategories.length > 0 && (
                  <div style={{ position: "relative" }}>
                    <Popper
                      id={id}
                      open={anchorEl && showNavData === nav.id}
                      anchorEl={anchorEl}
                      placement="bottom"
                      popperOptions="bottom"
                      style={{ zIndex: 99999 }}
                    >
                      <Box
                        sx={{
                          // p: 1,
                          bgcolor: "background.paper",
                          overflow: "auto",
                        }}
                        className={styles.navBoxContainer}
                      >
                        {showNavData === nav.id && (
                          <NavBody
                            data={nav}
                            id={nav.id}
                            length={navData.length}
                            setshow={setShowNavData}
                          />
                        )}
                      </Box>
                    </Popper>
                  </div>
                )}
              </div>
            </>
          ))}
          {scrollY < 250 && (
            <>
              {/* <Box sx={{ display: "flex", color: "#fff", padding: "0.8rem 0" }}>
              <Link href="tel:+10000000000" passHref>
                <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <BsTelephone style={{ fontSize: 32, marginRight: "8px" }} />
                  <div style={{ width: "max-content" }}>
                    <span>Call Anytime</span>
                    <h2 style={{ fontWeight: 500 }}>
                      <>000-000-0000</>
                    </h2>
                  </div>
                </Box>
              </Link>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "#fff", margin: "0.6rem 1rem" }} />
              <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <h2 style={{ fontWeight: 500, width: "max-content" }}>Today&apos;s Deal</h2>
              </Box>
            </Box> */}
            </>
          )}
        </div>
        {scrollY > 250 && (
          <div style={{ marginLeft: "20px", marginRight: "30px" }}>
            <Badge
              badgeContent={
                userDetails
                  ? cartData?.totalCartQuantity || 0
                  : localCart?.totalCartQuantity || 0
              }
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontSize: "1rem",
                  top: 15,
                  right: -2,
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                if (userDetails) {
                  dispatch(toggleOpenDrawer(true));
                } else {
                  setAlert("warn", "login to view cart");
                }
              }}
              showZero={true}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <div
                style={{
                  cursor: "pointer",
                  color: "white",
                  paddingTop: "1rem",
                }}
              >
                <CartIcon color="white" />
              </div>
            </Badge>
          </div>
        )}
      </>
    </div>
  );
};

export default Navigation;
