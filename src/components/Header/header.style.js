import styled, { keyframes } from "styled-components";

const header = keyframes`
 0% {
    height: 0;
    opacity: 0;
  }
  50% {
    height: 60px;
    opacity: 0;
  }
  75% {
    height: 90px;
    opacity: 0.65;
  }
  95% {
    height: 112px;
    opacity: 0.95;
  }
  100% {
    heigh: 114px;
    opacity: 1;
  }
`;

export const HeaderSection = styled.div`
  width: 100%;
  padding: 0 1em;
  // min-height: 8.25rem;
  top: 0;
  z-index: 15;
  animation-name: ${(props) => (props.scroll ? header : "")};
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  // box-shadow: 0px 0px 2px 0px #d1d1d1;
  position: ${(props) => (props.scroll ? "fixed" : "static")};
  animation-fill-mode: forwards;
  background: #f9fafa;
  padding: 0 1em;
  @media screen and (max-width: 768px) {
    // height: 5.25rem;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  /* max-width: 1690px; */
  max-width: 1475px;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 1rem 0;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.palette.colors.secondary};
  @media only screen and (min-width: 2200px) {
    max-width: 1475px;
  }
  @media screen and (max-width: 768px) {
    .side-space {
      width: 0;
      display: none;
    }
  }
`;
export const LogoContainer = styled.div`
  width: 262px;
  height: 42px;
  cursor: pointer;
  position: relative;
  @media screen and (max-width: 1475px) {
    margin: 0 auto;
  }
  @media screen and (max-width: 640px) {
    margin: 0 auto;
    height: 60px;
    width: 150px;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-end;
  text-align: center;
  // height: 3.875rem;
  gap: 18px;
  .divider {
    background-color: #f5f5f580;
    width: 1px;
    min-height: 100%;
    margin: 0 1em;
  }
  span {
    cursor: pointer;
  }
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  p {
    color: #000000;
  }
  .rightSection {
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    color: ${(props) => props.theme.palette.colors.white};
    margin-left: 8px;
  }
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // background: #df0b06;
  width: ${(props) => (props.bg ? "max-content" : "max-content")};
  // height: 49px;
  // border-radius: 50%;
  transition: 0.4s;
  color: black;
  // padding: 0.5em;
  // margin: 0 0 0 1em;
  cursor: pointer;
  position: relative;
  color: ${(props) => props.theme.palette.colors.primary};
  &:hover {
    opacity: ${(props) => (props.bg || props.noHover ? "1" : ".7")};
  }
  .icon {
    font-size: 18px;
    color: ${(props) => props.theme.palette.colors.primary};
  }

  p {
    font-size: 1.19rem;
    color: #000000;
    margin-left: 0.3em;
    text-transform: ${(props) =>
      props.capitalize ? "capitalize" : "uppercase"};
  }
  .cart {
    p {
      color: #000000;
      font-size: 0.69rem;
    }
    b {
      font-size: 1.06rem;
      font-weight: 700;
    }
  }
  .cart-icon {
    // width: 20px;
    // height: 20px;
    position: relative;
    svg {
      font-size: 33px;
      color: #000000;
    }
  }
  .MuiBadge-badge {
    right: 0;
    top: -2px;
  }

  svg {
    // font-size: 1.5rem;
    color: #ffffff;
  }
  @media screen and (max-width: 768px) {
    // width: ${(props) => (props.bg ? "35px" : "max-content")};
    height: 35px;
    svg {
      font-size: 1rem;
      color: #ffffff;
    }
    // margin: 0 0 0 0.5em;
    .cart-icon {
      width: 12px;
      height: 12px;
    }
    .MuiBadge-badge {
      min-width: 15px;
      height: 15px;
    }
  }
`;
export const IconBoxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  // background: #df0b06;
  width: ${(props) => (props.bg ? "49px" : "max-content")};
  height: 49px;
  border-radius: 10px;
  transition: 0.4s;
  color: ${(props) => props.theme.palette.colors.primary};
  padding: 0.5em 1rem;
  margin: 0 0 0 1em;
  cursor: pointer;
  position: relative;
  &:hover {
    // color: ${(props) => (props.bg ? "white" : "#fff")};
    opacity: ${(props) => (props.bg || props.noHover ? "1" : ".7")};
  }
  .icon {
    font-size: 18px;
    color: ${(props) => props.theme.palette.colors.primary};
  }
  svg {
    font-size: 20px;
    margin-right: 10px;
    color: #ffffff;
  }

  p {
    font-size: 1.19rem;
    margin-left: 0.3em;
    text-transform: ${(props) =>
      props.capitalize ? "capitalize" : "uppercase"};
  }
  .cart {
    p {
      font-size: 0.69rem;
    }
    b {
      font-size: 1.06rem;
      font-weight: 700;
    }
  }
  @media screen and (max-width: 768px) {
    height: 29px;
  }
`;

export const Icon = styled.div`
  width: 2.31rem;
  height: 2.31rem;
  font-size: 1.2rem;
  position: relative;
  display: grid;
  place-items: center;
  /* background-color: ${(props) => props.theme.palette.bg.main}; */
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 768px) {
    /* background: transparent; */
    width: 2.1rem;
    height: 2.1rem;
  }
`;

export const HeaderNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  place-items: center;
  height: 100%;
  gap: 16px;
  // max-width: 654px;
  width: 100%;
`;

export const HeaderMobNav = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  padding-bottom: 1rem;
`;

export const HeaderLink = styled.a`
  font-weight: 800;
  font-family: "Qanelas";
  color: ${(props) => props.theme.palette.colors.main};
  font-size: 1.1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: max-content;
  .icon {
    margin-left: 0.5rem;
  }
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

export const SmIcons = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 3rem;
  color: #df0b06;
  // width: 6.9rem;
  user-select: none;

  @media screen and (min-width: 1475px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    font-size: 2.5rem;
    width: 3.9rem;
  }
`;

export const CartDrawerStyled = styled.div`
  width: 600px;
  background-color: white;
`;
