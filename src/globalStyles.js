import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --primary: #1f3e72;
  --secondary: rgba(255, 255, 255, 0.78);
  --black: #131110;
  --blue-gradient: linear-gradient(97.05deg, #4066ff 3.76%, #2949c6 100%);
  --orange-gradient: linear-gradient(270deg, #ffb978 0%, #ff922d 100%);
  --blue: #4066ff;
  --lightBlue: #eeeeff;
  --shadow: 0px 23px 21px -8px rgba(136, 160, 255, 0.25);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Cairo", "Noto Sans Arabic", "Amiri", "Tajawal", "IBM Plex Sans Arabic", "Almarai", "Arial", sans-serif;
  scroll-behavior: smooth;

}`;

export const ALink = styled.a`
  color: inherit;
  text-decoration: none;
`;
export const Paddings = styled.div`
  padding: 1.5rem;
`;

export const InnerWidth = styled.div`
  width: 100%;
  @media (min-width: 1536px) {
    max-width: 1280px;
    margin: auto;
  },

`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  row-gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
export const FlexStart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const FlexColCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const FlexColStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
export const FlexColEnd = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const PrimaryText = styled.div`
  color: #1f3e72;
  font-weight: bold;
  font-size: 2rem;
`;

export const SecondaryText = styled.div`
  color: rgb(140 139 139);
  font-size: 0.9rem;
`;
export const OrangeText = styled.div`
  color: orange;
  font-size: 1.5rem;
  font-weight: 600;
`;

/* media queries */

export const MobilePadding = styled.div`
  @media (min-width: 640px) {
    padding: 4rem;
  }
`;

export const MainButton = styled.button`
  font-weight: 500;
  padding: 0.6rem 1.4rem;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 4px;
  transition: all 0.3 ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const TabletPadding = styled.div`
  @media (min-width: 1280px), (min-width: 768px) {
    padding: 2rem;
  }
`;
export const MobileText = styled.div`
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

export const Button = styled.button`
  border-radius: 4px;
  background: #ff7143;
  white-space: nowrap;
  padding: 10px 15px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background: #ff7143;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export default GlobalStyle;
