import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavHeader = styled.header`
  direction: rtl;
  z-index: 998;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0.4375rem 0.5625rem -0.4375rem #d6dee6;
  display: block;
`;
export const NavHeaderSub = styled.div`
  position: relative;
  z-index: 998;
`;
export const NavWrapper = styled.nav`
  border-bottom: 1px solid rgb(218, 225, 234);
  border-top-color: rgb(218, 225, 234);
  border-right-color: rgb(218, 225, 234);
  border-left-color: rgb(218, 225, 234);
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
  padding: 1rem 1rem;

  @media screen and (max-width: 50em) {
    height: 4rem;
    padding: 0.5rem;
  }
`;

export const NavContanier = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.25rem;
  flex: 0 0 auto;
  margin-left: 0;
  cursor: pointer;

  @media screen and (max-width: 50em) {
    max-width: 5rem;
    margin-right: 0.5rem;
  }
`;
export const NavContanierLogoMain = styled.div`
  width: 1.5rem;
  height: 1.8rem;

  @media screen and (max-width: 50em) {
  }
`;

export const NavContanierLogoMainImg = styled.img`
  width: 150px;
  height: 180%;
  padding-bottom: 0.6rem;
  z-index: 9999;
`;

export const NavContanierSec = styled.div`
  flex: 0 1 auto;
  min-width: 0;
  display: inline-flex;
  flex: 0 0 auto;

  @media screen and (max-width: 75em) {
    display: none;
  }
`;
export const NavContainerThi = styled.div`
  margin-right: auto;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
`;

export const NavrightFir = styled.div`
  overflow: hidden;
  height: 100%;
  margin: 0 0.5rem;

  @media screen and (max-width: 50rem) {
    display: none;
  }
`;
export const NavrightSec = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.25rem;
`;
export const NavrightSecSub = styled.div`
  font-size: 0.875rem;
  display: inline-flex;
  flex: 0 0 auto;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  color: rgb(75, 87, 102);
  transition: all 0.2s ease-in-out 0s;
  outline: none;
  border-radius: 0.5rem;
`;
export const NavrightSecsSpan = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  flex: 0 0 auto;

  @media screen and (max-width: 31.25rem) {
    margin-right: 0rem;
  }
`;
export const NavrightSecsSpanIcon = styled.span`
  display: inline-block;
`;
export const NavrightSecsSpanSvg = styled.svg`
  fill: currentcolor;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const NavrightSecsSpanText = styled.span`
  text-overflow: ellipsis;

  overflow: hidden;
  margin-left: 0.2rem;
  font-size: 14px;

  @media screen and (max-width: 31.25rem) {
  }
`;
export const NavrightThi = styled.div`
  position: relative;
  margin: 0 0.25rem;
  @media screen and (max-width: 31.25rem) {
    display: none;
  }
`;
export const NavrightFour = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.25rem;
  position: relative;
`;
export const NavrightFourContainer = styled.div`
  display: inline;
  cursor: pointer;
`;
export const NavrightFourSubContainer = styled.div``;
export const NavrightSubContainer = styled.div`
  font-size: 0.875rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0.625rem;
  background-color: transparent;
  color: rgb(75, 87, 102);
  transition: all 0.2s ease-in-out 0s;
  outline: none;
  border-radius: 0.5rem;
`;
export const NavrightSubSpan = styled.span`
  margin-right: 0px;
  width: 1.5rem;
  height: 1.5rem;
  flex: 0 0 auto;
`;
export const NavrightSubSpanDiv = styled.span`
  color: inherit;
  font-size: 0.875rem;
`;
export const NavrightFifth = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.25rem;
  position: relative;
`;
export const NavrightSixth = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.25rem;
`;
export const NavrightSeventh = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.25rem;
  margin-right: 0.75rem;
`;
export const NavrightEighth = styled.div`
  top: 3rem;
  bottom: 3rem;
  position: fixed;
  inset: 3.75rem 0px 0rem;
  transition: opacity 0.4s ease 0s;
  background-color: rgba(0, 0, 0, 0.4);
  width: 0px;
  opacity: 0;
`;
export const NavrightNinth = styled.div`
  position: fixed;
  right: 0px;
  top: 3rem;
  bottom: 3rem;
  width: 100%;
  max-width: 400px;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 4px 0px inset;
  transition: transform 0.2s ease 0s;
  cursor: auto;
  background-color: rgb(243, 248, 254);
  transform: translateX(120%);
`;
export const NavrightTenth = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.25rem;
`;

export const NotWrap = styled.div`
  position: fixed;
  direction: rtl;
  cursor: default;
  margin-top: 5rem;
  margin-left: 2rem;
  width: 31.25rem;
  padding: 0;
  color: #252b2f;
  background-color: #fff;
  border: 1px solid #d6dee6;
  border-radius: 0.75rem;
  text-align: right;
  z-index: 998;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.06);
  left: 0;
  pointer-events: auto;

  @media screen and (max-width: 50rem) {
    margin-top: 4.5rem;
    margin-left: 1rem;
    width: 21.25rem;
  }
`;
export const NotCon = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  @media screen and (max-width: 50rem) {
    max-height: 100%;
  }
`;
export const NotUl = styled.ul`
  padding: 0;
  list-style-type: none;
  margin: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
  padding-inline-start: 0px;
  display: block;
  color: #252b2f;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  @media screen and (max-width: 50rem) {
  }
`;

export const NotBot = styled.div`
  color: black;
  font-size: 24px;
  font-style: italic;

  @media screen and (max-width: 50rem) {
  }
`;
export const NotBotAt = styled(Link)`
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;
