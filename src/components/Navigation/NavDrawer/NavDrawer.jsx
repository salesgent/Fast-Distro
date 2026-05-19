import { Box, Tab, Tabs } from "@mui/material";
import cx from "classnames";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

////////////////////////////////////////////////////////////////
import Link from "next/link";
import styled from "styled-components";
import { setOpenDrawer } from "../../../store/home";
import { useDatafetcher } from "../../../utilities/hooks/useDatafetcher";
import { ErrorMessage } from "../../../utilities/theme/components";
import {
  unAuthorizedItems,
  userAccountItems,
} from "../../Header/DropDown/AccountDropDown";
import Level1 from "./Level1";
import styles from "./mobile.module.scss";
import theme from "../../../utilities/theme/theme";

const NavDrawer = ({ onListPage, businessId }) => {
  console.log("onListPage: ", onListPage);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const { data: navData, error } = useDatafetcher(
    `/menu?businessTypeId=${businessId}`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
    { stateId: true }
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [dropId, setDropId] = useState([-1]);
  const [value, setValue] = useState(0);

  const handleClick = (product) => {
    Router.push({
      pathname: `/products/${product.alias}/${product.id}`,
      query: "sort=date&order=ASC",
    });
    if (setOpenDrawer) dispatch(setOpenDrawer(false));
  };

  const OpenNav = (link) => {
    if (dropId.includes(link)) {
      let newList = dropId.filter((nav) => nav !== link);
      setDropId(newList);
    } else {
      setDropId([...dropId, link]);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box
            style={{
              padding: "10px 0",
              backgroundColor: "transparent",
            }}
          >
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

  const DrawerNav = ({ onListPage }) => {
    console.log("onListPage: ", onListPage);
    return (
      <div
        style={
          onListPage
            ? { backgroundColor: "transparent" }
            : {
                overflow: "auto",
                maxHeight: "500px",
                height: "500px",
                backgroundColor: "transparent",
              }
        }
      >
        {navData?.map((nav, i) => (
          <div
            key={i}
            // style={{ borderBottom: " 1px solid #CECECE" }}
          >
            <div
              className={cx(styles.mainLink, styles.navMenu)}
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClick(nav);
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "18px",
                  color: router?.query?.id == nav?.id ? "#000000" : "#7C7C7C",
                  fontWeight: router?.query?.id == nav?.id ? 400 : 300,
                }}
              >
                {/* {categoryIcons[i]?.src && <img src={categoryIcons[i]?.src} alt="" style={{ marginRight: "0.8rem" }} />} */}
                {nav.name}
                {/* {onListPage && nav?.subCategories?.length > 0 && (
                  <span>&nbsp;({nav?.subCategories?.length || 0})</span>
                )} */}
              </p>
              {nav?.subCategories?.length > 0 && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (nav?.subCategories?.length > 0) {
                      OpenNav(nav.id);
                    } else {
                      handleClick(nav);
                    }
                  }}
                >
                  {dropId.includes(nav.id) ? (
                    <IoIosArrowForward
                      className={styles.icondown}
                      color={theme.palette.colors.primary}
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  ) : (
                    <IoIosArrowForward
                      className={styles.icondown}
                      color={theme.palette.colors.primary}
                    />
                  )}
                </div>
              )}
            </div>
            {dropId?.includes(nav.id) && (
              <Level1
                data={nav.subCategories}
                h2={true}
                onListPage={onListPage}
                dropId={dropId}
                setDropId={setDropId}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const AccountNav = () => {
    const items = userDetails ? userAccountItems : unAuthorizedItems;
    return (
      <AccountContainer>
        {userDetails && (
          <p className="userName">
            Hi&nbsp;{userDetails.customerDto.firstName}{" "}
          </p>
        )}
        {items?.map((item, i) => {
          return (
            <AccountItem key={i} last={items?.length - 1 === i}>
              <Link href={item?.link}>
                <a onClick={item?.onClick}>
                  {item?.icon}
                  {item?.name}
                </a>
              </Link>
            </AccountItem>
          );
        })}
      </AccountContainer>
    );
  };

  return (
    <div style={{ backgroundColor: "transparent" }}>
      {error && <ErrorMessage>something went wrong</ErrorMessage>}
      {!onListPage && (
        <div className={styles.closeBar}>
          <p
            onClick={() => {
              dispatch(setOpenDrawer(false));
            }}
          >
            close <AiOutlineClose className={styles.icon} />
          </p>
        </div>
      )}
      {!onListPage ? (
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "transparent",
          }}
        >
          <Tabs
            value={value}
            indicatorColor="#000000"
            style={{ backgroundColor: "transparent" }}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              color: "#000000",
              style: {
                backgroundColor: "#000000",
              },
            }}
          >
            <Tab
              label="Menu"
              style={{
                color: "#000000",
                fontSize: "1.2rem",
              }}
            />
            <Tab
              label="Account"
              style={{
                color: "#000000",
                fontSize: "1.2rem",
              }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <h3
              style={{
                margin: "1rem 0.5rem",
                color: "#000000",
                fontSize: "16px",
              }}
            >
              Categories
            </h3>
            <DrawerNav onListPage={onListPage} />
            <h3
              style={{
                margin: "1rem 0.5rem",
                color: "#000000",
                fontSize: "16px",
              }}
            >
              Brands
            </h3>
            <BrandNav businessId={businessId} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AccountNav />
          </CustomTabPanel>
        </Box>
      ) : (
        <>
          <DrawerNav onListPage={onListPage} />
        </>
      )}
    </div>
  );
};

export default NavDrawer;

const AccountContainer = styled.div`
  background-color: transparent;
  height: 100%;
  .userName {
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${(props) => props.theme.palette.colors.black};
  }
`;

const AccountItem = styled.div`
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.colors.primary};
  border-bottom: ${(props) =>
    !props.last && `1px solid ${props.theme.palette.bg.secondary}`};
  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

export const BrandNav = ({ businessId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: brandData } = useDatafetcher(
    `/ecommerce/brand/list?businessTypeId=${businessId}&size=999`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  return (
    <div
      style={{
        overflow: "auto",
        maxHeight: "500px",
        height: "500px",
      }}
    >
      {brandData?.content?.length <= 0 && (
        <div>
          <p>No brands found</p>
        </div>
      )}
      {brandData?.content?.map((nav, i) => (
        <div
          key={i}
          // style={{ borderBottom: " 1px solid #CECECE" }}
        >
          <div
            className={cx(styles.mainLink, styles.navMenu)}
            key={i}
            onClick={() => {
              Router.push({
                pathname: `/brand/${nav.urlAlias}/${nav.id}`,
              });
              if (setOpenDrawer) dispatch(setOpenDrawer(false));
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                color: router?.query?.id == nav?.id ? "#000000" : "#7C7C7C",
                fontWeight: router?.query?.id == nav?.id ? 400 : 300,
              }}
            >
              {nav?.brandAttachmentMap?.["Brand Logo"]?.[0]?.url && (
                <img
                  src={nav?.brandAttachmentMap?.["Brand Logo"]?.[0]?.url}
                  alt=""
                  style={{ marginRight: "0.8rem", maxWidth: 20, maxHeight: 20 }}
                />
              )}
              {nav.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
