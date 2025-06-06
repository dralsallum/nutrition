import styled from "styled-components";
import Header from "../../assets/header.webp";
import ArrowCurve from "../../assets/arrowCurve.png";
import { Link } from "react-router-dom";

export const MaFirst = styled.div`
  background: #fff;
  padding: 20px;
  direction: rtl;
  @media screen and (max-width: 768px) {
  }
`;

export const MaAll = styled.div`
  display: flex;
  background: linear-gradient(135deg, #f4e4a6 0%, #f0d987 100%);
  border-radius: 12px;
  direction: rtl;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  text-align: right;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 40px 30px;
    text-align: center;
  }
`;

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #2c2c2c;
  margin-bottom: 30px;
  font-family: "Tajawal", "Arial", sans-serif;
  direction: rtl;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a4a4a;
  margin-bottom: 40px;
  font-family: "Tajawal", "Arial", sans-serif;
  direction: rtl;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    gap: 15px;
  }
`;

const CoverageButton = styled(Link)`
  background-color: #e07a5f;
  color: white;
  text-decoration: none;
  border: none;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Tajawal", "Arial", sans-serif;

  &:hover {
    background-color: #d16850;
    color: white;
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

const Arrow = styled.div`
  width: 40px;
  height: 2px;
  background-color: #666;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: -5px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-top: 2px solid #666;
    border-left: 2px solid #666;
    transform: rotate(-45deg);
  }
`;

const StatText = styled.p`
  font-size: 0.95rem;
  color: #555;
  font-weight: 500;
  font-family: "Tajawal", "Arial", sans-serif;
  direction: rtl;

  span {
    font-weight: 700;
    color: #2c2c2c;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background-image: url(${Header});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media screen and (max-width: 768px) {
    min-height: 350px;
    order: -1;
  }
`;

const Main = () => {
  return (
    <MaFirst>
      <MaAll>
        <ContentSection>
          <MainHeading>
            تحدث مع أخصائي تغذية
            <br />
            مشمول بتأمينك
            <br />
            الصحي
          </MainHeading>

          <SubText>
            نوريش يجعل من السهل وبأسعار معقولة
            <br />
            تحقيق أهدافك الصحية مع أخصائي تغذية شخصي
            <br />
            عبر الإنترنت وتطبيقنا المحمول.
          </SubText>

          <ButtonContainer>
            <CoverageButton to={"/recommendation"}>
              هل أنا مشمول؟
            </CoverageButton>
            <ArrowContainer></ArrowContainer>
          </ButtonContainer>

          <StatText>
            <span></span>
            <span>94%</span> من مرضى نوريش يدفعون <span>0 ريال</span> من جيبهم
            الخاص!
            <img src={ArrowCurve} alt="" />
          </StatText>
        </ContentSection>

        <ImageSection />
      </MaAll>
    </MaFirst>
  );
};

export default Main;
