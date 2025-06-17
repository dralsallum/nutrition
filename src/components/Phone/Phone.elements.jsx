import styled from "styled-components";

export const ArWra = styled.section`
  display: flex;
  background: #fff;
  background-repeat: no-repeat;
  background-position: inherit;
  background-size: contain;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  z-index: 4;
  font-size: 8px;
  direction: rtl;

  @media screen and (max-width: 759px) {
    background: #fff;
    background-size: 100%;
    background-repeat: no-repeat;
    height: auto;
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    z-index: 4;
    font-size: 8px;
  }
`;
export const ArCon = styled.div`
  position: relative;
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  text-align: right;
  padding: 5rem;
  margin-bottom: 8.9em;
  @media screen and (max-width: 759px) {
    padding: 0rem;
  }
`;
export const ArSub = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 759px) {
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;
export const ArCont = styled.div`
  display: flex;
  margin-top: 9em;

  @media screen and (max-width: 759px) {
    flex-direction: column-reverse;
    gap: 1.5em;
    width: 100%;
  }
`;
export const ArPa = styled.p`
  font-size: 4.5em;
  font-weight: 600;
  margin: 0;
  line-height: 1;
  width: 23.1em;
  @media screen and (max-width: 759px) {
    text-align: center;
    font-size: 2.5em;
    width: auto;
  }
`;
export const ArImg = styled.img`
  width: 43.1em;
  height: 86em;
  max-width: 100%;
  backface-visibility: hidden;
  transition: transform 0s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    -webkit-transform 0s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  @media screen and (max-width: 759px) {
    width: 28.1em;
    height: 56em;
    align-self: center;
  }
`;
export const ArSp = styled.span`
  font-size: 0.82em;
  font-weight: 400;
  margin: 0;
  color: #121131;
  padding-right: 1rem;
  @media screen and (max-width: 759px) {
    padding: 0rem;
  }
`;
export const AtWr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute !important;
  top: 60em;
  left: 105em;
  z-index: 15;

  @media screen and (max-width: 759px) {
    display: none;
  }
`;

export const AtAA = styled.a`
  color: #fff;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;

  @media screen and (max-width: 759px) {
  }
`;
export const AtImg = styled.img`
  width: 17.4em;
  overflow-clip-margin: content-box;
  overflow: clip;

  @media screen and (max-width: 759px) {
  }
`;

export const ButWr = styled.div`
  position: absolute !important;
  top: 50em;
  left: 135em;
  z-index: 15;
  display: block;

  @media screen and (max-width: 759px) {
    display: none;
  }
`;
export const ButRi = styled.button`
  z-index: 15;
  position: absolute;
  font-size: 4.2em;
  line-height: 0;
  width: 1.63em;
  height: 1.63em;
  padding: 0;
  background: #fff;
  border: none;
  border-radius: 5.4em;
  box-shadow: 0px 1px 17px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  left: -3.7em;

  @media screen and (max-width: 759px) {
  }
`;
export const ButLe = styled.button`
  z-index: 15;
  position: absolute;
  font-size: 4.2em;
  line-height: 0;
  width: 1.63em;
  height: 1.63em;
  padding: 0;
  background: #fff;
  border: none;
  border-radius: 5.4em;
  box-shadow: 0px 1px 17px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 759px) {
  }
`;
export const ButSp = styled.span`
  margin-top: -6px;
  font-size: 2em;
  line-height: 0;
  cursor: pointer;
  color: #000;

  @media screen and (max-width: 759px) {
  }
`;

export const DotWr = styled.ol`
  display: none;
  @media screen and (max-width: 759px) {
    top: -5em;
    position: relative;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 672;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    padding-left: 0;
    list-style: none;
  }
`;
export const DotLi = styled.li`
  @media screen and (max-width: 759px) {
    width: 0.8em;
    height: 0.8em;
    background: #d6d6ea;
    border-radius: 10em;
    box-sizing: content-box;
    flex: 0 1 auto;
    margin-right: 0.3em;
    margin-left: 0.3em;
    text-indent: -999px;
    cursor: pointer;
    background-clip: padding-box;
    transition: opacity 0.6s ease;
    opacity: 1;
    border: none;
    background: #478dff;
  }
`;
