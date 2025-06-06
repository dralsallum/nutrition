import styled from "styled-components";

export const ArWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 8%;
  direction: rtl;
  padding: 1.5rem 3.4rem;
  background-color: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 1.2rem 2rem;
    gap: 8px;
  }
`;

export const ArContainerF = styled.div`
  order: 2;
  flex: 1;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    order: 1;
  }
`;

export const ArSubContainerF = styled.div`
  color: #252b2f;
`;

export const ArContainerFCon = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  line-height: 1.2;
  color: #666e7e;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

export const ArContainerFHe = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1.25rem;
  color: #ff7143;

  @media screen and (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const ArContainerFPara = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 0;
  color: #252b2f;

  @media screen and (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const ArContainerS = styled.div`
  order: 1;
  flex: 1;

  @media screen and (max-width: 768px) {
    max-width: 350px;
    margin-bottom: 1.5rem;
    order: 2;
  }
`;

export const ArContainerSImg = styled.img`
  max-width: 100%;
  height: auto;
  border-style: none;
  display: block;
`;
