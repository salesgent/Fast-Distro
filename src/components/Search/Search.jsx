import React, { useState } from "react";

////////////////////////////////////////////////////////////////
import { Button, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "../../utilities/hooks/useDebounce";
import { useShopSenseWidgetStatus } from "../../utilities/hooks/useShopSenseWidgetStatus";
import { SearchBox, SearchContainer } from "./SearchBox.style";
import SearchDropDown from "./SearchDropDown/SearchDropDown";
import { BiSearchAlt } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { CiMenuFries } from "react-icons/ci";
import NavDrawer from "../Navigation/NavDrawer/NavDrawer";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../../store/home";

const SearchHeader = ({ businessId }) => {
  const [inputData, setInputData] = useState("");
  const [focus, setFocus] = useState(false);
  const Debounce = useDebounce(inputData, 500);
  const router = useRouter();
  const dispatch = useDispatch();
  const widgetState = useShopSenseWidgetStatus();
  const useShopSenseSearch = Boolean(widgetState === "succeeded");

  return (
    <SearchContainer tabIndex="2">
      <SearchBox
        style={{
          // border: focus && `1px solid #1269C2`,
          paddingLeft: "0",
        }}
      >
        <input
          style={
            {
              // borderRight: `1px solid #D9D9D9`,
            }
          }
          type="search"
          placeholder={
            useShopSenseSearch
              ? "Find your desired product effortlessly..."
              : "Search product or category..."
          }
          id={useShopSenseSearch ? "searchInput" : "search-input"}
          onChange={
            !useShopSenseSearch
              ? (e) => {
                  setFocus(true);
                  setInputData(e.target.value);
                }
              : undefined
          }
          onKeyDown={
            !useShopSenseSearch
              ? (e) => {
                  if (e?.keyCode === 13) {
                    router.push(`/all/search/${e.target.value}`);
                    setFocus(false);
                    setInputData("");
                  }
                }
              : undefined
          }
          value={!useShopSenseSearch ? inputData : undefined}
          onFocus={!useShopSenseSearch ? () => setFocus(true) : undefined}
          onBlur={
            !useShopSenseSearch
              ? () => {
                  setTimeout(() => {
                    setFocus(false);
                    setInputData("");
                  }, 600);
                }
              : undefined
          }
        />

        <Button
          sx={{
            backgroundColor: "transparent",
            padding: "2px",
            minWidth: 50,
            borderRadius: "0",
            borderLeft: "1px solid #5D5D5D",
          }}
          onClick={() => dispatch(setOpenDrawer(true))}
          variant="text"
        >
          <RiSearch2Line size={21} style={{ color: "#000000" }} />
        </Button>
      </SearchBox>
      {!useShopSenseSearch && focus && inputData.length > 2 ? (
        <SearchDropDown searchData={Debounce} />
      ) : null}
    </SearchContainer>
  );
};

export default SearchHeader;
