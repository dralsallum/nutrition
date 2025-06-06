import styled from "styled-components";

// Main container for entire quiz section
export const QuizMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 80px 50px;
  background-color: #fefcf7;
  min-height: 100vh;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    padding: 60px 20px;
  }
`;

// Wrapper for each half of the quiz layout
export const QuizWrapper = styled.div`
  flex: 1 1 45%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 50, 0.05);
  padding: 30px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 960px) {
    flex: 1 1 100%;
  }
`;

// Container for the quiz content
export const QuizContainer = styled.div`
  width: 100%;
  text-align: right;
  direction: rtl;

  @media screen and (max-width: 960px) {
    text-align: center;
    direction: rtl;
  }
`;

// Sub-container for spacing and organization
export const QuizSubContainer = styled.div`
  max-width: 520px;
  margin: 0 auto 40px;
`;

// Main quiz heading
export const QuizHeading = styled.h1`
  font-size: 44px;
  margin-bottom: 16px;
  line-height: 1.2;
  font-weight: 700;
  color: #2a2d46;

  @media screen and (max-width: 960px) {
    font-size: 36px;
  }
`;

// Decorative separator
export const QuizSeparator = styled.div`
  width: 80px;
  height: 4px;
  margin-bottom: 24px;
  background-color: #6c63ff;
  border-radius: 2px;
`;

// Standard paragraph text
export const QuizParagraph = styled.p`
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 1.6;
  color: #4a4e6a;
`;

// Quiz image styling
export const QuizImage = styled.img`
  width: 100%;
  max-width: 360px;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 50, 0.08);
  margin-bottom: 10px;
`;

// Quiz option button
export const QuizOption = styled.button`
  width: 100%;
  padding: 14px 18px;
  margin-bottom: 14px;
  text-align: right;
  background-color: #f7f8ff;
  border: 2px solid #e0e4ff;
  border-radius: 6px;
  font-size: 16px;
  color: #2a2d46;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #6c63ff;
    border-color: #6c63ff;
    color: #fff;
  }
`;

// Action button
export const QuizButton = styled.button`
  display: inline-block;
  padding: 14px 32px;
  background-color: #6c63ff;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #574bd6;
  }
`;

// Results display
export const QuizResult = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 30px 0;
  padding: 24px;
  background: #eef2ff;
  border-radius: 8px;
  text-align: center;
  color: #6c63ff;
`;
