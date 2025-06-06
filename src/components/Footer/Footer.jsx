import React from "react";
import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Button } from "../../globalStyles";
import {
  FooterContainer,
  FooterSubscription,
  FooterSubText,
  Form,
  FormInput,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinksItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialIcons,
  SocialIconLink,
  NavLogo,
  NavbarContainerImg,
} from "./Footer.elements";
import { FaTiktok } from "react-icons/fa";
import Logo from "../../assets/drslallum.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSubscription>
        <FooterSubText>
          انضم لايميلنا الخاص واحصل على افضل المنتجات
        </FooterSubText>
        <Form>
          <FormInput name="email" type="email" placeholder="اكتب ايميلك" />
          <Button>اشترك</Button>
        </Form>
      </FooterSubscription>
      <FooterLinksContainer>
        <FooterLinksWrapper>
          <FooterLinksItems>
            <FooterLinkTitle>من نحن</FooterLinkTitle>
            <FooterLink to="/sign-up">كيف يعمل</FooterLink>
            <FooterLink to="/">شهادة المستخدمين</FooterLink>
          </FooterLinksItems>
          <FooterLinksItems>
            <FooterLinkTitle>تواصل معنا</FooterLinkTitle>
            <FooterLink to="/sign-up">كيف يعمل</FooterLink>
            <FooterLink to="/">شهادة المستخدمين</FooterLink>
          </FooterLinksItems>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterLinksItems>
            <FooterLinkTitle>الشروط والاحكام</FooterLinkTitle>
            <FooterLink to="/policy">اطلع عليها</FooterLink>
            <FooterLink to="/policy">شهادة المستخدمين</FooterLink>
          </FooterLinksItems>
          <FooterLinksItems>
            <FooterLinkTitle>السوشل ميديا</FooterLinkTitle>
            <FooterLink to="/sign-up">كيف يعمل</FooterLink>
            <FooterLink to="/">شهادة المستخدمين</FooterLink>
          </FooterLinksItems>
        </FooterLinksWrapper>
      </FooterLinksContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <NavLogo>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <NavbarContainerImg src={Logo} />
            </Link>
          </NavLogo>
          <SocialIcons>
            <SocialIconLink href="/" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink
              href={"https://www.youtube.com/@dralsallum"}
              target="_blank"
              aria-label="Youtube"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="Tiktok">
              <FaTiktok />
            </SocialIconLink>
            <SocialIconLink
              href={"https://www.twitter.com/@dralsallum"}
              target="_blank"
              aria-label="Twitter"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
};

export default Footer;
