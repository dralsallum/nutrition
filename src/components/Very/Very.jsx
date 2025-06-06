import styled from "styled-components";
import Header from "../../assets/make.png";
import ArrowCurve from "../../assets/arrowCurve.png";

const MaFirst = styled.div`
  background: #fff;
  padding: 5rem 4rem 5rem 4rem;
  direction: rtl;
  font-family: "Tajawal", "Arial", sans-serif;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const MaSec = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 83rem;
`;

const MaAll = styled.div`
  background-color: #ffeeb3;
  border-radius: 1rem;
  padding: 4rem 3.5rem;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const ContentSection = styled.div`
  z-index: 1;
  display: flex;
  position: relative;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainHeading = styled.h1`
  letter-spacing: -0.75px;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 3.2rem;
  line-height: 1.07143;
  color: #000;
  text-align: right;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const SubText = styled.p`
  text-wrap: balance;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.4;
  color: #000;
  text-align: right;

  @media screen and (max-width: 768px) {
    text-align: center;
    padding-left: 0;
    font-size: 1.25rem;
  }
`;

const ButtonContainer = styled.div`
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  position: relative;
  color: #000;
  text-weight: 800;

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const ButtonSubContainer = styled.div`
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  flex-flow: wrap;
  align-items: center;
  display: flex;
  text-weight: 800;
`;

const ButtonAt = styled.button`
  font-size: 1.125rem;
  line-height: 1.55556;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #fe6a36;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: "Tajawal", "Arial", sans-serif;
  text-decoration: none;
  transition: background-color 0.2s;
  box-shadow: 0 4px 4px -4px #1a1a1929;
  border: none;
  cursor: pointer;
  text-weight: 800;

  &:hover {
    background-color: #e55a2b;
  }
  &:focus {
    outline: none;
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

const ImgContainer = styled.div`
  z-index: 0;
  align-self: center;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0% 0% 0% 4rem;

  @media screen and (max-width: 768px) {
    position: relative;
    inset: auto;
    margin-top: 0.2rem;
  }
`;

const ArrowImg = styled.img`
  width: 25px;
  position: absolute;
  top: -2.4rem;
  right: -1.9rem;
  transform: scaleX(-1);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ArrowPara = styled.p`
  text-align: right;
  height: auto;
  font-family: "Tajawal", "Arial", sans-serif;
  font-size: 1.15rem;

  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: 1rem;
  }
`;

const StatText = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  position: relative;
  color: #000;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const LeftDiv = styled.div`
  flex-direction: column;
  width: 50%;
  max-width: 450px;
  display: flex;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const ImageSection = styled.img`
  width: 44%;
  box-shadow: 0 24px 56px #1919180a, 0 12px 28px #19191808, 0 8px 14px #19191808;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
  min-width: 380px;
  height: 638px;
  inset: 0% auto 0% 4rem;
  max-width: 576px;
  margin-top: auto;
  margin-bottom: auto;
  position: absolute;
  vertical-align: middle;
  border: 0;
  object-position: center top;
  object-position: 50% 20%;

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    min-width: auto;
    height: 300px;
    inset: auto;
    margin: 1rem 0 0 0;
    object-position: center top;
    object-position: 50% 20%;
  }
`;

const Very = () => {
  return (
    <MaFirst>
      <MaSec>
        <MaAll>
          <ContentSection>
            <LeftDiv>
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
                <ButtonSubContainer>
                  <ButtonAt>هل أنا مشمول؟</ButtonAt>
                  <ArrowContainer></ArrowContainer>
                </ButtonSubContainer>
              </ButtonContainer>

              <StatText>
                <ArrowImg src={ArrowCurve} alt="" />
                <ArrowPara>94% من مرضى نوريش يدفعون 0 ريال من جيبهم!</ArrowPara>
              </StatText>
            </LeftDiv>
          </ContentSection>
          <ImgContainer>
            <ImageSection src={Header} alt="أخصائية تغذية" />
          </ImgContainer>
        </MaAll>
      </MaSec>
    </MaFirst>
  );
};

export default Very;
