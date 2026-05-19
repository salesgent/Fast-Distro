import Router, { useRouter } from "next/router";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";

////////////////////////////////////////////////////////////////
import { setOpenDrawer } from "../../../store/home";
import styles from "./mobile.module.scss";
import theme from "../../../utilities/theme/theme";
const Level1 = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, h2, onListPage, dropId, setDropId } = props;
  const OpenNav = (link) => {
    if (dropId?.includes(link)) {
      let newList = dropId?.filter((nav) => nav !== link);
      setDropId(newList);
    } else {
      setDropId([...dropId, link]);
    }
  };

  const handleClick = (nav) => {
    // dispatch(setActiveProductId(parseInt(nav.id)));
    Router.push({
      pathname: `/products/${nav.alias}/${nav.id}`,
      query: "sort=date&order=ASC",
    });
    dispatch(setOpenDrawer(false));
  };
  return (
    <div className={styles.levelContainer}>
      {data?.map((nav, i) => (
        <div key={i}>
          <div
            className={styles.secLink}
            key={i}
            tabIndex={0}
            onClick={() => {
              handleClick(nav);
            }}
            // style={h2 ? { fontWeight: "bold" } : { fontWeight: "normal" }}
          >
            <p
              style={{
                fontSize: props?.isSecondLevel ? "15px" : "16px",
                // color: dropId[dropId?.length - 1] === nav?.id ? "#5AA72690" : "#00000050",
                padding: props?.isSecondLevel ? "0 1rem" : "0 0.5rem",
                color: router?.query?.id == nav?.id ? "#000000" : "#7C7C7C",
                fontWeight: router?.query?.id == nav?.id ? 400 : 300,
              }}
              className="small"
            >
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
                {dropId?.includes(nav.id) ? (
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
              setOpenDrawer={setOpenDrawer}
              isSecondLevel={true}
              dropId={dropId}
              setDropId={setDropId}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Level1;
