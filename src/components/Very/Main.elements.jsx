import styled from "styled-components";

/* --- page-level wrapper --- */
export const Page = styled.section`
  width: 100%;
  min-height: 100vh;
  background: #264f3d; /* page background behind the cards */
  display: flex;
  justify-content: center;
  padding: 120px 24px 60px;
  box-sizing: border-box;
`;

/* --- central column --- */
export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

/* --- headings --- */
export const Heading = styled.h1`
  margin: 0;
  text-align: center;
  color: #ffffff;
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 600;
`;

export const SubHeading = styled.h2`
  margin: 0;
  text-align: center;
  color: #ffffff;
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 400;
`;

/* --- grid of cards --- */
export const CardGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

/* --- individual card --- */
export const Card = styled.div`
  position: relative;
  background: ${(p) => p.$bg};
  border-radius: 12px;
  padding: 32px;
  color: #ffffff;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

/* --- text group inside card --- */
export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* --- card title & description --- */
export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.9rem;
  font-weight: 600;
`;

export const CardDesc = styled.span`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* --- arrow --- */
export const CardArrow = styled.span`
  display: inline-block;
  font-size: 1.15rem;
  line-height: 1;
`;

/* --- illustration image --- */
export const CardImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 47%;
  height: auto;
  object-fit: contain;

  @media (max-width: 480px) {
    width: 60%;
  }
`;
