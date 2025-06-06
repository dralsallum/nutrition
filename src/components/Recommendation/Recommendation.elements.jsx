import styled from "styled-components";

// Layout Wrappers
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fefcf7;
  color: #000;
  align-items: center;
  min-height: 100dvh;
  margin-left: auto;
  margin-right: auto;
  direction: rtl;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media screen and (max-width: 768px) {
    /* responsive tweaks here */
  }
`;

export const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fefcf7;
  color: #000;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  direction: rtl;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media screen and (max-width: 768px) {
    /* responsive tweaks here */
  }
`;

export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fefcf7;
  color: #000;
  align-items: center;
  min-height: 100dvh;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  direction: rtl;

  @media screen and (max-width: 768px) {
    /* responsive tweaks here */
  }
`;

// Progress Components
export const ProgressHeader = styled.div`
  align-self: stretch;
  margin: 1rem 0 2rem 0;
  z-index: 10;

  @media screen and (max-width: 768px) {
  }
`;

export const LogoCon = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  display: block;
  vertical-align: middle;
  object-fit: contain;
  @media screen and (max-width: 768px) {
  }
`;

export const BasketImg = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  display: block;
  vertical-align: middle;
  object-fit: contain;
  @media screen and (max-width: 768px) {
  }
`;

export const BackCon = styled.div`
  cursor: pointer;
  color: ${(props) => (props.disabled ? "#ccc" : "rgb(242 101 51)")};
  text-align: right;

  &:hover {
    color: ${(props) => (props.disabled ? "#ccc" : "rgb(200 80 40)")};
  }

  @media screen and (max-width: 768px) {
  }
`;

export const ProgressTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  width: 100%;
  height: 2.25rem;

  @media screen and (max-width: 768px) {
    height: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const BasketContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 4px;

  &.shake {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const BasketIconWrapper = styled.div`
  position: relative;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const BasketCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0 4px;

  @media screen and (max-width: 768px) {
    top: -6px;
    right: -6px;
    min-width: 16px;
    height: 16px;
    font-size: 0.65rem;
  }
`;

export const BasketTotal = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  margin-top: 2px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

export const AddedMessageNotification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  z-index: 1000;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;

export const ProgressCon = styled.div`
  width: 680px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 768px) {
  }
`;

export const ProgressSub = styled.div`
  background-color: rgb(229 223 217);
  border-radius: 9999px;
  overflow: hidden;
  width: 100%;
  position: relative;
  height: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const ProgressMeter = styled.div`
  background-color: rgb(242 101 51);
  width: ${(props) => props.progress}%;
  height: 100%;
  transition: width 0.3s ease;
  transform-origin: right center;
  @media screen and (max-width: 768px) {
  }
`;

// Question & Answer Containers
export const QueCon = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  transition-duration: 0.5s;
  width: 680px;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  align-items: flex-end;
  text-align: right;
  @media screen and (max-width: 768px) {
  }
`;

export const QueTitCon = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  @media screen and (max-width: 768px) {
  }
`;

export const QueTit = styled.div`
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: right;
  width: 100%;
  @media screen and (max-width: 768px) {
  }
`;

export const AnsCon = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  @media screen and (max-width: 768px) {
  }
`;

export const AnsSub = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const AnsBtnCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const AnsBtn = styled.button`
  display: flex;
  box-shadow: 0px 4px 4px -4px rgba(25, 25, 24, 0.08);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: ${(props) =>
    props.selected ? "rgb(242 101 51)" : "rgb(255 255 255)"};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  opacity: 1;
  border: 1px solid
    ${(props) => (props.selected ? "rgb(242 101 51)" : "rgb(229 223 217)")};
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  text-align: right;
  direction: rtl;

  &:hover {
    border-color: ${(props) =>
      props.selected ? "rgb(242 101 51)" : "#7c7c7c"};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(242, 101, 51, 0.3);
    border: 1px solid rgb(242 101 51);
  }

  @media screen and (max-width: 768px) {
  }
`;

// Info Headers & Inputs
export const InfoHeader = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 24px;
  color: rgb(242 101 51);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const TextInput = styled.input`
  display: flex;
  box-shadow: 0px 4px 4px -4px rgba(25, 25, 24, 0.08);
  padding: 0.75rem 1rem;
  background-color: rgb(255 255 255);
  border: 1px solid rgb(229 223 217);
  border-radius: 0.5rem;
  width: 100%;
  color: #000;
  font-size: 1rem;
  text-align: right;
  direction: rtl;

  &:focus {
    outline: none;
    border-color: rgb(242 101 51);
  }

  &::placeholder {
    color: #999;
    text-align: right;
  }

  @media screen and (max-width: 768px) {
  }
`;

// Footer Components
export const Footer = styled.footer`
  display: flex;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 1rem;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
  @media screen and (max-width: 768px) {
    /* responsive tweaks here */
  }
`;

export const FooterBtn = styled.button`
  display: flex;
  min-width: 190px;
  width: fit-content;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding-left: 3rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding-right: 3rem;
  background-color: rgb(242 101 51);
  border: none;
  color: white;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  height: 3rem;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgb(242 101 51)" : "rgb(220 90 45)"};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
    /* responsive tweaks here */
  }
`;

export const FooterSub = styled.div`
  display: flex;
  align-items: center;
  color: rgb(127 124 121);
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
  @media screen and (max-width: 768px) {
  }
`;

// Content Containers & Cards
export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
  justify-content: ${(props) => (props.centered ? "center" : "flex-start")};
  text-align: ${(props) => (props.centered ? "center" : "left")};
`;

export const InfoSubheader = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 24px;
  color: #333;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
export const InfoImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  border=radius: 8px;
  margin-top: 16px;

  @media (max-width: 768px) {
  }
`;

export const InfoCard = styled.div`
  background-color: rgb(255 255 255);
  border: 1px solid rgb(229 223 217);
  border-radius: 1rem;
  padding: 2rem;

  box-shadow: 0px 4px 4px -4px rgba(25, 25, 24, 0.08);
  text-align: right;
  direction: rtl;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
`;

export const InfoCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(242 101 51);
  margin-bottom: 1.5rem;
  text-align: right;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

export const InfoCardContent = styled.div`
  color: #333;
  line-height: 1.6;

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    text-align: right;

    @media screen and (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
  }
`;

export const FactBox = styled.div`
  background-color: #fef9f5;
  border: 1px solid #f5e6d3;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-right: 4px solid rgb(242 101 51);

  p {
    margin-bottom: 0;
    font-style: italic;
    color: #5a4a3a;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin-top: 1rem;
  }
`;

export const FactTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: rgb(242 101 51);
  margin-bottom: 0.75rem;
  text-align: right;

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

export const ChartImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #fef9f5 0%, #f9f1e8 100%);
  border: 2px dashed rgb(229 223 217);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  color: #999;
  font-size: 0.9rem;
  position: relative;

  &::before {
    content: "📊 مخطط بياني توضيحي";
    font-size: 1rem;
    color: #888;
  }

  @media screen and (max-width: 768px) {
    height: 150px;
    margin: 1.5rem 0;

    &::before {
      font-size: 0.9rem;
    }
  }
`;

export const ResultHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 24px;
  text-align: center;
  color: #333;
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

export const ProductCard = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 500;
  flex-grow: 1;
`;

export const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

export const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #777;
  font-size: 14px;
`;

export const DiscountTag = styled.span`
  background-color: #e53e3e;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: rgb(242 101 51);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: auto;

  &:hover {
    background-color: #a26a4a;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Order Summary Components
export const OrderSummaryContainer = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  border: 1px solid #e9ecef;
`;

export const OrderSummaryTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`;

export const OrderSummaryItems = styled.div`
  margin-bottom: 15px;
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }
`;

export const OrderItemName = styled.span`
  font-weight: 500;
  color: #495057;
`;

export const OrderItemDetails = styled.span`
  color: #6c757d;
  font-size: 14px;
`;

export const OrderTotalContainer = styled.div`
  padding-top: 15px;
  border-top: 2px solid #dee2e6;
  margin-top: 15px;
`;

export const OrderTotalText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
`;

export const SubmitOrderButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
