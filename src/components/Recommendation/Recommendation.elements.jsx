import { Link } from "react-router-dom";
import styled from "styled-components";

const ACCENT = "#B05A36";
const ACCENT_HOVER = "#8F4729";
const ACCENT_LIGHT = "#F5EDE8";
const ACCENT_BORDER = "#D4886A";

// ─── Layout Wrappers ──────────────────────────────────────────────────────────

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
  }
`;

// ─── Progress Header ──────────────────────────────────────────────────────────

export const ProgressHeader = styled.div`
  align-self: stretch;
  margin: 1rem 0 2rem 0;
  z-index: 10;

  @media screen and (max-width: 768px) {
  }
`;

export const LogoCon = styled(Link)`
  width: 35px;
  height: 35px;
  display: block;
  vertical-align: middle;
  object-fit: contain;
  cursor: pointer;

  @media screen and (max-width: 768px) {
  }
`;

export const Logoimg = styled.img`
  width: 35px;
  height: 35px;
  display: block;
  vertical-align: middle;
  object-fit: contain;
  cursor: pointer;

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
  color: ${(props) => (props.disabled ? "#ccc" : ACCENT)};
  text-align: right;
  width: 60px;
  font-size: 14px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    color: ${(props) => (props.disabled ? "#ccc" : ACCENT_HOVER)};
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
  background: ${ACCENT_LIGHT};
  color: ${ACCENT};
  border: 1px solid ${ACCENT_BORDER};
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(176, 90, 54, 0.2);
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
  background-color: ${ACCENT};
  width: ${(props) => props.progress}%;
  height: 100%;
  transition: width 0.3s ease;
  transform-origin: right center;

  @media screen and (max-width: 768px) {
  }
`;

// ─── Question & Answer ────────────────────────────────────────────────────────

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
  padding: 0.75rem 1rem;
  background-color: ${(props) =>
    props.selected ? ACCENT : "rgb(255 255 255)"};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  opacity: 1;
  border: 1px solid ${(props) => (props.selected ? ACCENT : "rgb(229 223 217)")};
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  text-align: right;
  direction: rtl;
  transition:
    border-color 0.15s,
    background-color 0.15s,
    color 0.15s;

  &:hover {
    border-color: ${(props) => (props.selected ? ACCENT : "#7c7c7c")};
    background-color: ${(props) =>
      props.selected ? ACCENT_HOVER : ACCENT_LIGHT};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(176, 90, 54, 0.3);
    border: 1px solid ${ACCENT};
  }

  @media screen and (max-width: 768px) {
  }
`;

// ─── Info Headers & Inputs ────────────────────────────────────────────────────

export const InfoHeader = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 24px;
  color: ${ACCENT};
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
    border-color: ${ACCENT};
  }

  &::placeholder {
    color: #999;
    text-align: right;
  }

  @media screen and (max-width: 768px) {
  }
`;

// ─── Footer ───────────────────────────────────────────────────────────────────

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
  }
`;

export const FooterBtn = styled.button`
  display: flex;
  min-width: 190px;
  width: fit-content;
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding-left: 3rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding-right: 3rem;
  background-color: ${ACCENT};
  border: none;
  color: white;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  height: 3rem;

  &:hover {
    background-color: ${(props) => (props.disabled ? ACCENT : ACCENT_HOVER)};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
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

// ─── Content Containers & Info Cards ─────────────────────────────────────────

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
  width: 680px;
  max-width: 100%;
  justify-content: ${(props) => (props.centered ? "center" : "flex-start")};
  align-items: ${(props) => (props.centered ? "center" : "stretch")};
  text-align: ${(props) => (props.centered ? "center" : "right")};
`;

export const InfoSubheader = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 24px;
  color: #555;
  line-height: 1.5;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const InfoImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  border-radius: 8px;
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
  color: ${ACCENT};
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
  background-color: ${ACCENT_LIGHT};
  border: 1px solid #f5e6d3;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-right: 4px solid ${ACCENT};

  p {
    margin-bottom: 0;
    font-style: italic;
    color: #5a3020;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin-top: 1rem;
  }
`;

export const FactTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${ACCENT};
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

// ─── Result / Checkout ────────────────────────────────────────────────────────

export const ResultHeader = styled.h1`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 8px;
  text-align: center;
  color: #1a1a1a;
  font-family: Georgia, "Times New Roman", serif;
`;

export const OrderSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 560px;
  margin-top: 8px;
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
  background: #ede8e2;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderItemName = styled.span`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 400;
`;

export const OrderItemDetails = styled.span`
  font-size: 16px;
  color: #1a1a1a;
  white-space: nowrap;
  margin-right: 16px;
`;

export const OrderTotalContainer = styled.div`
  background: #ede8e2;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrderTotalText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;

  &:last-child {
    white-space: nowrap;
    margin-right: 16px;
  }
`;

export const SubmitOrderButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${(props) => (props.disabled ? "#c4956e" : ACCENT)};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  direction: rtl;

  &:hover:not(:disabled) {
    background-color: ${ACCENT_HOVER};
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  &:focus {
    outline: none;
  }
`;

// ─── Legacy product card exports (kept for import compatibility) ───────────────

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
  background-color: ${ACCENT};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: auto;

  &:hover {
    background-color: ${ACCENT_HOVER};
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
