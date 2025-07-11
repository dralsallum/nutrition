import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMagento } from "react-icons/fa";

export const NavLogo = styled.div`
  color: #000000;
  justify-content: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  padding-top: 0.6rem;
`;

export const NavbarContainerImg = styled.img`
  object-fit: cover;
  width: 10rem;

  @media screen and (max-width: 960px) {
    width: 8rem;
  }
`;

export const FooterContainer = styled.div`
  background-color: #101522;
  padding: 3rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  direction: rtl;
`;

export const FooterSubscription = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  padding: 24px;
  color: #f7f8fa;
  background-color: #101522;
`;

export const FooterSubHeading = styled.p`
  margin-bottom: 24px;
  font-size: 24px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida sans", Arial, sans-serif;
  background-color: #101522;
`;

export const FooterSubText = styled.p`
  margin-bottom: 24px;
  font-size: 20px;
  background-color: #101522;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #101522;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    width: 80%;
  }
`;

export const FormInput = styled.input`
  padding: 10px 20px;
  border-radius: 2px;
  margin-right: 10px;
  outline: none;
  border: none;
  font-size: 16px;
  border: 1px solid #fff;
  background-color: #fff;

  &::placeholder {
    color: #242424;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const FooterLinksContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  background-color: #101522;

  @media screen and (max-width: 820px) {
    padding-top: 12px;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;
  background-color: #101522;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterLinksItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  text-align: left;
  width: 160px;
  box-sizing: border-box;
  color: #fff;
  background-color: #101522;

  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;

export const FooterLinkTitle = styled.h2`
  margin-bottom: 16px;
  background-color: #101522;
`;

export const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  background-color: #101522;

  &:hover {
    color: #0467fb;
    transition: 0.3s ease-out;
  }
`;

export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
  background-color: #101522;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  margin: 40px auto 0 auto;
  background-color: #101522;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled(Link)`
  color: #fff;
  justify-content: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background-color: #101522;
`;

export const SocialIcon = styled(FaMagento)`
  margin-right: 10px;
  background-color: #101522;
`;

export const WebsiteRights = styled.small`
  color: #fff;
  margin-bottom: 16px;
  background-color: #101522;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  background-color: #101522;
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 24px;
  background-color: #101522;
`;
