// Recommendation.jsx
import React, { useState, useEffect, useRef } from "react";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearCart } from "../../redux/cartRedux";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import Logo from "../../assets/no-logo.png";
import Woman2 from "../../assets/woman2.webp";
import PhoneImg from "../../assets/phone.png";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary: "#B05A36",
  primaryDk: "#8a4228",
  primaryLt: "#d4845f",
  bg: "#faf7f4",
  bgCard: "#ffffff",
  bgMuted: "#f2ede7",
  bgAccent: "#fdf0e9",
  border: "#e8ddd4",
  text: "#1e1209",
  textMid: "#5c4033",
  textMute: "#9a7d6e",
  white: "#ffffff",
};

// ─── Animations ────────────────────────────────────────────────────────────────
const spin = keyframes`to { transform: rotate(360deg); }`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${C.bg};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  direction: rtl;
`;

export const WrapperForm = styled.form`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LoadingWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${C.bg};
  gap: 16px;
  direction: rtl;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${C.border};
  border-top-color: ${C.primary};
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;

export const LoadingText = styled.p`
  font-size: 15px;
  color: ${C.textMid};
  font-family: "Georgia", serif;
  letter-spacing: 0.3px;
`;

export const ProgressHeader = styled.div`
  position: sticky;
  top: 0;
  background: ${C.bg};
  z-index: 100;
  padding: 0 1rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
`;

export const ProgressCon = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProgressTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 0.6rem;
  direction: rtl;
`;

export const LogoCon = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const Logoimg = styled.img`
  height: 32px;
  object-fit: contain;
`;

export const BackCon = styled.button`
  background: none;
  border: 1.5px solid ${({ disabled }) => (disabled ? "transparent" : C.border)};
  font-size: 13px;
  color: ${({ disabled }) => (disabled ? "transparent" : C.primary)};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  padding: 5px 12px;
  border-radius: 20px;
  transition: all 0.15s;
  font-family: inherit;
  width: 64px;
  text-align: center;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${({ disabled }) => (disabled ? "transparent" : C.bgAccent)};
    border-color: ${({ disabled }) => (disabled ? "transparent" : C.primary)};
  }
`;

export const ProgressSub = styled.div`
  height: 3px;
  background: ${C.border};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
  direction: rtl; /* RTL: fills from right */
`;

export const ProgressMeter = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: linear-gradient(90deg, ${C.primary}, ${C.primaryLt});
  border-radius: 2px;
  transition: width 0.4s ease;
  /* For RTL, anchor to the right by using margin-left: auto inside a flex rtl container */
  /* Actually, we flip with transform so it visually grows from right */
  transform-origin: right center;
`;

// Fix: wrap meter in a rtl flex so it grows from right
export const ProgressTrack = styled.div`
  height: 3px;
  background: ${C.border};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 6px;
  display: flex;
  justify-content: flex-end; /* RTL: progress fills from the right side */
  direction: rtl;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${({ centered }) => (centered ? "center" : "flex-start")};
  justify-content: ${({ centered }) => (centered ? "center" : "flex-start")};
  padding: 2rem 1.5rem;
  text-align: ${({ centered }) => (centered ? "center" : "right")};
  animation: ${fadeUp} 0.35s ease both;
`;

export const InfoHeader = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: ${C.text};
  margin-bottom: 0.75rem;
  font-family: "Georgia", serif;
  line-height: 1.3;
`;

export const InfoSubheader = styled.p`
  font-size: 15px;
  color: ${C.textMid};
  line-height: 1.7;
  max-width: 420px;
`;

// ─── InfoBreak Card ───────────────────────────────────────────────────────────

export const InfoCard = styled.div`
  background: ${C.bgCard};
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  box-shadow:
    0 4px 24px rgba(176, 90, 54, 0.1),
    0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid ${C.border};
  animation: ${fadeUp} 0.4s ease both;
`;

export const InfoCardImageWrap = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
`;

export const InfoCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
`;

export const InfoCardBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  background: ${C.primary};
  color: ${C.white};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
`;

export const InfoCardBody = styled.div`
  padding: 1.5rem;
`;

export const InfoCardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${C.text};
  margin-bottom: 0.6rem;
  font-family: "Georgia", serif;
  line-height: 1.3;
`;

export const InfoCardContent = styled.div`
  font-size: 14px;
  color: ${C.textMid};
  line-height: 1.75;
`;

export const FactBox = styled.div`
  background: ${C.bgAccent};
  border-right: 3px solid ${C.primary};
  padding: 0.85rem 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-size: 13px;
  color: ${C.textMid};
`;

export const FactTitle = styled.p`
  font-weight: 700;
  color: ${C.primary};
  margin-bottom: 5px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export const QueCon = styled.div`
  flex: 1;
  padding: 2rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  animation: ${fadeUp} 0.35s ease both;
`;

export const QueTitCon = styled.div`
  margin-bottom: 1.75rem;
`;

export const QueTit = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${C.text};
  line-height: 1.4;
  font-family: "Georgia", serif;
`;

export const AnsCon = styled.div`
  flex: 1;
`;

export const AnsSub = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AnsBtn = styled.button`
  width: 100%;
  text-align: right;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1.5px solid ${({ selected }) => (selected ? C.primary : C.border)};
  background: ${({ selected }) => (selected ? C.bgAccent : C.bgCard)};
  color: ${({ selected }) => (selected ? C.primary : C.text)};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  outline: none;
  box-shadow: ${({ selected }) =>
    selected ? `0 0 0 3px ${C.primary}22` : "none"};
  &:focus {
    outline: none;
  }
  &:hover {
    border-color: ${C.primary};
    background: ${C.bgAccent};
    color: ${C.primary};
  }
`;

export const AnsCheck = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid ${({ selected }) => (selected ? C.primary : C.border)};
  background: ${({ selected }) => (selected ? C.primary : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;
  svg {
    width: 10px;
    height: 10px;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1.5px solid ${C.border};
  background: ${C.bgCard};
  color: ${C.text};
  font-size: 15px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  text-align: right;
  direction: rtl;
  &:focus {
    border-color: ${C.primary};
    box-shadow: 0 0 0 3px ${C.primary}22;
    outline: none;
  }
  &::placeholder {
    color: ${C.textMute};
  }
`;

// ─── Footer / CTA ─────────────────────────────────────────────────────────────

export const Footer = styled.div`
  padding: 1rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const FooterBtn = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  border: none;
  outline: none;
  background: ${({ disabled }) =>
    disabled
      ? "#d4c8be"
      : `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDk} 100%)`};
  color: ${C.white};
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  font-family: inherit;
  letter-spacing: 0.3px;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : `0 4px 16px ${C.primary}44`};
  &:focus {
    outline: none;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${C.primaryLt} 0%, ${C.primary} 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${C.primary}55;
  }
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px ${C.primary}33;
  }
`;

export const FooterSub = styled.p`
  font-size: 12px;
  color: ${C.textMute};
  text-align: center;
`;

export const AddedMessageNotification = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 10px 16px;
  margin: 0 1.5rem;
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
`;

// ─── Result Screen ────────────────────────────────────────────────────────────

export const MembershipCard = styled.div`
  background: linear-gradient(135deg, #fdf0e9 0%, #f7e8dc 100%);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 560px;
  margin-bottom: 1.25rem;
  min-height: 280px;
  border: 1px solid ${C.border};
  box-shadow: 0 6px 28px ${C.primary}18;
`;

export const PhoneImageWrap = styled.div`
  width: 180px;
  flex-shrink: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const MembershipContent = styled.div`
  flex: 1;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MembershipTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${C.text};
  font-family: "Georgia", serif;
  margin-bottom: 1rem;
  line-height: 1.25;
`;

export const MembershipDivider = styled.hr`
  border: none;
  border-top: 1px solid ${C.border};
  margin-bottom: 1rem;
`;

export const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: ${C.textMid};
  line-height: 1.4;
  text-align: right;
`;

export const BenefitIcon = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${C.bgAccent};
  border: 1.5px solid ${C.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  svg {
    width: 11px;
    height: 11px;
  }
`;

export const OrderSummaryContainer = styled.div`
  width: 100%;
  max-width: 560px;
  background: ${C.bgCard};
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid ${C.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export const OrderItemName = styled.span`
  font-size: 14px;
  color: ${C.text};
`;

export const OrderItemDetails = styled.span`
  font-size: 14px;
  color: ${C.primary};
  font-weight: 600;
`;

export const OrderTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: 4px;
  border-top: 1px solid ${C.border};
`;

export const OrderTotalText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${C.text};
`;

export const ConsentBox = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 1.25rem;
  background: ${C.bgMuted};
  padding: 1rem 1.25rem;
  border-radius: 14px;
`;

export const ConsentCheckbox = styled.input`
  width: 20px;
  height: 20px;
  min-width: 20px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: ${C.primary};
  border-radius: 4px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const ConsentLabel = styled.label`
  font-size: 13px;
  color: ${C.textMid};
  line-height: 1.6;
  cursor: pointer;
  text-align: right;
`;

export const PrivacyLink = styled(Link)`
  color: ${C.primary};
  text-decoration: underline;
  &:hover {
    color: ${C.primaryDk};
  }
`;

export const ConsentWarning = styled.p`
  font-size: 12px;
  color: #c0392b;
  text-align: center;
  margin-top: -8px;
  margin-bottom: 8px;
`;

export const SubmitOrderButton = styled.button`
  width: 100%;
  max-width: 560px;
  padding: 16px;
  border-radius: 50px;
  border: none;
  background: ${({ disabled }) =>
    disabled
      ? "#d4c8be"
      : `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDk} 100%)`};
  color: ${C.white};
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  font-family: inherit;
  letter-spacing: 0.3px;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : `0 4px 16px ${C.primary}44`};
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${C.primaryLt} 0%, ${C.primary} 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${C.primary}55;
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const questions = [
  { id: "name", question: "ما اسمك؟", type: "text", options: [] },
  {
    id: "sex",
    question: "ما جنسك؟",
    type: "multiple",
    options: ["ذكر", "أنثى"],
  },
  {
    id: "weight",
    question: "بماذا يمكننا مساعدتك؟",
    options: [
      "المساعدة في تحسين القلب والأوعية الدموية",
      "المساعدة في كسب العضلات",
      "المساعدة في فقدان الوزن",
      "المساعدة في كسب الوزن",
    ],
  },
  {
    id: "location",
    question: "أين تعيش؟ (أدخل الموقع، مثل الرمز البريدي أو البلد)",
    type: "text",
    options: [],
  },
  {
    id: "pastVitamins",
    question: "ما مستوى نشاطك الحالي؟",
    type: "multiple",
    options: [
      "أنا نشط جداً",
      "أنا نشط بشكل معتدل",
      "أنا لست نشطاً جداً",
      "أنا خامل",
    ],
  },
  {
    id: "currentSupplements",
    question: "ما مدى دافعيتك لإجراء تغييرات لتحقيق أهدافك؟",
    type: "multiple",
    options: ["أنا متحمس", "أنا مهتم", "أنا حذر", "أنا لست مستعد"],
  },
  {
    id: "familiarity",
    question: "ما مدى معرفتك بالفيتامينات والمكملات الغذائية؟",
    type: "multiple",
    options: [
      "غير مألوف على الإطلاق",
      "مألوف قليلاً",
      "مألوف بشكل معتدل",
      "مألوف جداً",
    ],
  },
  {
    id: "powders",
    question:
      "هل تستخدم أي مساحيق تكميلية (مثل مخفوقات البروتين أو خلطات المشروبات)؟",
    type: "multiple",
    options: ["نعم", "لا"],
  },
  {
    id: "healthGoals",
    question: "أي المجالات تود الحصول على دعم أكثر فيها؟",
    type: "multiple",
    options: [
      "المساءلة",
      "نظام غذائي للإقصاء",
      "التمارين الرياضية",
      "الطب الوظيفي",
      "الأكل البديهي",
      "فحوصات المختبر",
      "التخطيط للوجبات",
      "المغذيات الكبرى الشخصية",
      "العلاقة مع الطعام",
      "النوم",
    ],
    multiSelect: true,
  },
  { id: "email", question: "ما بريدك الإلكتروني؟", type: "text", options: [] },
  {
    id: "goal",
    question: "يرجى مشاركة أي تفاصيل أخرى حول ما تأمل في تحقيقه مع نوريش.",
    type: "text",
    options: [],
  },
  {
    id: "exerciseTypes",
    question: "ما أنواع التمارين التي تمارسها عادة؟",
    type: "multiple",
    options: [
      "تمارين القلب",
      "تمارين القوة",
      "اليوغا",
      "تمارين عالية الكثافة",
      "أخرى / لا توجد تمارين",
    ],
    multiSelect: true,
  },
  {
    id: "stressLevel",
    question: "كيف تقيم مستوى التوتر المعتاد لديك؟",
    type: "multiple",
    options: ["منخفض", "معتدل", "عالي"],
  },
  {
    id: "sleepHours",
    question: "كم ساعة من النوم تحصل عليها عادة في الليلة؟",
    type: "multiple",
    options: [
      "أقل من 5 ساعات",
      "5-6 ساعات",
      "6-7 ساعات",
      "7-8 ساعات",
      "8+ ساعات",
    ],
  },
  {
    id: "energyLevels",
    question: "كيف تصف مستويات الطاقة اليومية لديك؟",
    type: "multiple",
    options: ["غالباً متعب", "بعض التقلبات", "نشيط بشكل عام"],
  },
  {
    id: "digestiveDiscomfort",
    question: "كم مرة تعاني من عدم الراحة الهضمية (مثل الانتفاخ أو عسر الهضم)؟",
    type: "multiple",
    options: ["نادراً", "أحياناً", "بكثرة"],
  },
  {
    id: "getSick",
    question: "كم مرة تميل للإصابة بالمرض (مثل نزلات البرد في السنة)؟",
    type: "multiple",
    options: ["نادراً (0-1)", "أحياناً (2-3)", "غالباً (4+)"],
  },
  {
    id: "heartConcerns",
    question: "هل لديك أي مخاوف محددة بشأن صحة القلب؟",
    type: "multiple",
    options: [
      "لا توجد",
      "ضغط دم مرتفع",
      "كوليسترول مرتفع",
      "مخاوف أخرى بشأن القلب",
    ],
  },
  {
    id: "focusMemory",
    question: "هل تعاني من صعوبة في التركيز أو الذاكرة؟",
    type: "multiple",
    options: ["نعم", "لا"],
  },
  {
    id: "fruitVeggies",
    question: "كم حصة من الفواكه والخضروات تأكل في معظم الأيام؟",
    type: "multiple",
    options: ["0-1", "2-3", "4-5", "6+"],
  },
  {
    id: "fermentedFoods",
    question:
      "كم مرة تأكل الأطعمة المتخمرة (مثل الزبادي أو الكمبوتشا أو الكيمتشي)؟",
    type: "multiple",
    options: ["يومياً", "عدة مرات في الأسبوع", "نادراً", "أبداً"],
  },
  {
    id: "fiber",
    question: "هل تقول أنك تحصل على ما يكفي من الألياف في نظامك الغذائي؟",
    type: "multiple",
    options: ["قليل", "كافي", "عالي"],
  },
  {
    id: "dietPattern",
    question: "هل تتبع أي نظام غذائي أو نمط غذائي معين؟",
    type: "multiple",
    options: [
      "لا توجد",
      "نباتي",
      "نباتي (لا يأكل اللحوم)",
      "باليو",
      "خالي من الغلوتين/سيلياك",
      "أخرى",
    ],
  },
  {
    id: "allergies",
    question: "هل لديك أي حساسية أو حساسيات غذائية؟",
    type: "multiple",
    options: [
      "لا توجد",
      "الألبان",
      "الصويا",
      "الغلوتين",
      "المحار",
      "الرجيد",
      "أخرى",
    ],
    multiSelect: true,
  },
  {
    id: "smoke",
    question: "هل تدخن؟",
    type: "multiple",
    options: ["نعم", "لا"],
  },
];

const infoBreaks = [
  {
    title: "عمليات الأيض والوزن",
    content:
      "تركيب الجسم ومعدل الأيض يلعبان دورًا حاسمًا في التحكم بالوزن. تشير الأبحاث إلى أن معدلات الأيض يمكن أن تختلف بنسبة تصل إلى 20٪ بين أشخاص لديهم خصائص متشابهة.",
    fact: "بناء العضلات من خلال تمارين القوة يمكن أن يزيد من معدل الأيض أثناء الراحة، مما يساعدك على حرق المزيد من السعرات حتى عند عدم ممارسة الرياضة.",
    img: Woman2,
  },
  {
    title: "عوامل نمط الحياة",
    content:
      "غالبًا ما يتم التغاضي عن جودة النوم وإدارة التوتر في رحلات فقدان الوزن. قلة النوم قد تزيد من هرمونات الجوع بنسبة تصل إلى 15٪ وتقلل من الهرمونات التي تشعر بالشبع.",
    fact: "تشير الدراسات إلى أن الأشخاص الذين ينامون أقل من 7 ساعات يوميًا هم أكثر عرضة بنسبة 30٪ لزيادة الوزن مقارنة بمن ينامون 7 ساعات أو أكثر بانتظام.",
    img: Woman2,
  },
  {
    title: "الاعتبارات الطبية",
    content:
      "بعض الحالات الطبية يمكن أن تؤثر بشكل كبير على قدرتك في فقدان الوزن. على سبيل المثال، قصور الغدة الدرقية يمكن أن يبطئ من الأيض بنسبة 30٪ أو أكثر إذا لم يُعالج.",
    fact: "يجب دائمًا استشارة مقدم الرعاية الصحية قبل بدء أي برنامج لإدارة الوزن، خاصة إذا كنت تعاني من حالات طبية موجودة مسبقًا.",
    img: Woman2,
  },
  {
    title: "السلوك والعادات",
    content:
      "التغييرات السلوكية الصغيرة يمكن أن تؤدي إلى نتائج كبيرة مع مرور الوقت. استبدال مشروب سكري واحد فقط يوميًا بالماء يمكن أن يؤدي إلى خسارة أكثر من 10 أرطال خلال عام.",
    fact: "الأشخاص الذين يتتبعون تناولهم للطعام بانتظام يفقدون وزنًا أكثر بمعدل 2-3 مرات مقارنة بمن لا يراقبون ما يأكلون.",
    img: Woman2,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getCurrentQuestionProps = (questionIndex) => {
  const currentQ = questions[questionIndex];
  return {
    currentQ,
    isMultiSelect: currentQ?.multiSelect,
    isTextInput: currentQ?.type === "text",
  };
};

const getPlanBenefits = (category) => {
  const benefits = {
    "cardio-improvement": [
      "برنامج تمارين قلبية مخصص لمدة 12 أسبوعاً",
      "مكملات داعمة لصحة القلب والأوعية الدموية",
      "متابعة أسبوعية مع متخصص تغذية",
      "خطة غذائية لتحسين الأداء القلبي",
      "تقارير تقدم شهرية",
    ],
    "muscle-gain": [
      "برنامج تمارين قوة مخصص لمدة 12 أسبوعاً",
      "بروتينات وأحماض أمينية عالية الجودة",
      "متابعة أسبوعية مع متخصص تغذية",
      "خطة غذائية لبناء العضلات",
      "تقارير تقدم شهرية",
    ],
    "weight-loss": [
      "برنامج فقدان وزن مخصص لمدة 12 أسبوعاً",
      "مكملات طبيعية لتعزيز الأيض",
      "متابعة أسبوعية مع متخصص تغذية",
      "خطة وجبات مخصصة لأهدافك",
      "تقارير تقدم شهرية",
    ],
    "weight-gain": [
      "برنامج زيادة وزن صحي لمدة 12 أسبوعاً",
      "مكملات سعرات حرارية عالية الجودة",
      "متابعة أسبوعية مع متخصص تغذية",
      "خطة غذائية لزيادة الوزن بصحة",
      "تقارير تقدم شهرية",
    ],
  };
  return benefits[category] || benefits["weight-loss"];
};

const getPlanName = (category) => {
  const names = {
    "cardio-improvement": "اشتراك تحسين القلب",
    "muscle-gain": "اشتراك بناء العضلات",
    "weight-loss": "اشتراك فقدان الوزن",
    "weight-gain": "اشتراك زيادة الوزن",
  };
  return names[category] || "اشتراك نوريش";
};

const getRecommendedProduct = (userAnswers) => {
  const productOptions = {
    cardioImprovement: {
      _id: "cardio-improvement-program",
      name: "برنامج تحسين القلب والأوعية الدموية",
      price: 119.99,
      img: "https://alsallum.s3.eu-north-1.amazonaws.com/cardioWork.png",
      inStock: true,
      description: "مكملات لتعزيز صحة القلب وتحسين الأداء القلبي الوعائي",
      category: "cardio-improvement",
    },
    muscleGain: {
      _id: "muscle-gain-program",
      name: "برنامج بناء العضلات",
      price: 179.99,
      img: "https://alsallum.s3.eu-north-1.amazonaws.com/muscleGain.png",
      inStock: true,
      description:
        "مجموعة متكاملة من البروتينات والأحماض الأمينية لبناء العضلات",
      category: "muscle-gain",
    },
    weightLoss: {
      _id: "weight-loss-program",
      name: "برنامج فقدان الوزن المتقدم",
      price: 149.99,
      img: "https://alsallum.s3.eu-north-1.amazonaws.com/weightLoss.png",
      inStock: true,
      description:
        "برنامج شامل لفقدان الوزن يشمل مكملات طبيعية وخطة غذائية مخصصة",
      category: "weight-loss",
    },
    weightGain: {
      _id: "weight-gain-program",
      name: "برنامج زيادة الوزن الصحي",
      price: 129.99,
      img: "https://alsallum.s3.eu-north-1.amazonaws.com/weightGain.png",
      inStock: true,
      description: "مكملات غذائية عالية السعرات لزيادة الوزن بطريقة صحية",
      category: "weight-gain",
    },
  };

  switch (userAnswers.weight) {
    case "المساعدة في تحسين القلب والأوعية الدموية":
      return productOptions.cardioImprovement;
    case "المساعدة في كسب العضلات":
      return productOptions.muscleGain;
    case "المساعدة في فقدان الوزن":
      return productOptions.weightLoss;
    case "المساعدة في كسب الوزن":
      return productOptions.weightGain;
    default:
      return productOptions.weightLoss;
  }
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const CheckSVG = () => (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 6L5 9L10 3"
      stroke={C.white}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckOutlineSVG = () => (
  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 6L5 9L10 3"
      stroke={C.primary}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

const Recommendation = () => {
  const buttonRef = useRef();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentBreak, setCurrentBreak] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedSingleAnswer, setSelectedSingleAnswer] = useState("");
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [flowStep, setFlowStep] = useState("intro");
  const [addedMessage, setAddedMessage] = useState("");
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const progressPercentage =
    flowStep === "intro" || flowStep === "result"
      ? flowStep === "result"
        ? 100
        : 0
      : (currentQuestion / questions.length) * 100;

  const canContinue = () => {
    if (flowStep === "intro" || flowStep === "breakInfo") return true;
    if (flowStep === "quiz") {
      const { isMultiSelect, isTextInput } =
        getCurrentQuestionProps(currentQuestion);
      if (isTextInput) return textInput.trim().length > 0;
      if (isMultiSelect) return selectedAnswers.length > 0;
      return selectedSingleAnswer !== "";
    }
    return false;
  };

  const canGoBack = () => {
    if (flowStep === "intro" || flowStep === "result") return false;
    if (flowStep === "breakInfo") return true;
    if (flowStep === "quiz") return currentQuestion > 0;
    return false;
  };

  const handleSingleAnswer = (option) => {
    buttonRef.current?.blur();
    setSelectedSingleAnswer(option);
  };

  const handleMultiSelectToggle = (option) => {
    buttonRef.current?.blur();
    setSelectedAnswers((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const handleContinue = () => {
    if (flowStep === "intro") {
      setFlowStep("quiz");
      return;
    }
    if (flowStep === "breakInfo") {
      setFlowStep("quiz");
      return;
    }

    if (flowStep === "quiz") {
      const { currentQ, isMultiSelect, isTextInput } =
        getCurrentQuestionProps(currentQuestion);
      let newAnswers;

      if (isTextInput) {
        if (!textInput.trim()) return;
        newAnswers = { ...answers, [currentQ.id]: textInput };
      } else if (isMultiSelect) {
        if (selectedAnswers.length === 0) return;
        newAnswers = { ...answers, [currentQ.id]: selectedAnswers };
      } else {
        if (!selectedSingleAnswer) return;
        newAnswers = { ...answers, [currentQ.id]: selectedSingleAnswer };
      }

      setAnswers(newAnswers);
      setSelectedAnswers([]);
      setSelectedSingleAnswer("");
      setTextInput("");

      const nextQuestion = currentQuestion + 1;
      const shouldShowBreak =
        nextQuestion % 3 === 0 && nextQuestion < questions.length;

      if (shouldShowBreak) {
        const breakIndex = Math.floor(nextQuestion / 3) - 1;
        if (breakIndex < infoBreaks.length) {
          setCurrentBreak(breakIndex);
          setCurrentQuestion(nextQuestion);
          setFlowStep("breakInfo");
          return;
        }
      }

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        fetchRecommendedProducts(newAnswers);
      }
    }
  };

  const goToPrevious = () => {
    if (flowStep === "breakInfo") {
      setFlowStep("quiz");
      return;
    }
    if (flowStep === "quiz" && currentQuestion > 0) {
      const prevIndex = currentQuestion - 1;
      setCurrentQuestion(prevIndex);
      const prevQ = questions[prevIndex];
      if (answers[prevQ.id]) {
        if (prevQ.multiSelect) setSelectedAnswers(answers[prevQ.id]);
        else if (prevQ.type === "text") setTextInput(answers[prevQ.id]);
        else setSelectedSingleAnswer(answers[prevQ.id]);
      } else {
        setSelectedAnswers([]);
        setSelectedSingleAnswer("");
        setTextInput("");
      }
    }
  };

  const fetchRecommendedProducts = async (userAnswers) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const recommendedProduct = getRecommendedProduct(userAnswers);
      setProducts([recommendedProduct]);
      setFlowStep("result");
    } catch (error) {
      console.error("Error processing recommendations:", error);
      setProducts([getRecommendedProduct({})]);
      setFlowStep("result");
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = () => {
    if (!marketingConsent) return;
    const product = products[0];
    if (!product) return;
    dispatch(
      addProduct({
        _id: product._id,
        title: product.name,
        price: product.price,
        img: product.img,
        quantity: 1,
        category: product.category,
        description: product.description,
      }),
    );
    navigate("/outcome");
  };

  const renderContent = () => {
    switch (flowStep) {
      case "intro":
        return (
          <ContentContainer centered>
            <InfoHeader>استكشف خطط فقدان الوزن.</InfoHeader>
            <InfoSubheader>
              تعرّف على خيارات العلاج بناءً على أهدافك وعاداتك وتاريخك الصحي.
            </InfoSubheader>
          </ContentContainer>
        );

      case "quiz": {
        const { currentQ, isMultiSelect, isTextInput } =
          getCurrentQuestionProps(currentQuestion);
        return (
          <QueCon>
            <QueTitCon>
              <QueTit>{currentQ.question}</QueTit>
            </QueTitCon>
            <AnsCon>
              <AnsSub>
                {isTextInput ? (
                  <TextInput
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="أدخل إجابتك..."
                  />
                ) : (
                  currentQ.options.map((option, index) => {
                    const isSelected = isMultiSelect
                      ? selectedAnswers.includes(option)
                      : selectedSingleAnswer === option;
                    return (
                      <AnsBtn
                        key={index}
                        selected={isSelected}
                        onClick={() =>
                          isMultiSelect
                            ? handleMultiSelectToggle(option)
                            : handleSingleAnswer(option)
                        }
                      >
                        <span>{option}</span>
                        <AnsCheck selected={isSelected}>
                          {isSelected && <CheckSVG />}
                        </AnsCheck>
                      </AnsBtn>
                    );
                  })
                )}
              </AnsSub>
            </AnsCon>
          </QueCon>
        );
      }

      case "breakInfo": {
        const currentB = infoBreaks[currentBreak];
        return (
          <ContentContainer>
            <InfoCard>
              {/* Full image at top */}
              <InfoCardImageWrap>
                <InfoCardImage src={currentB.img} alt={currentB.title} />
                <InfoCardBadge>معلومة صحية</InfoCardBadge>
              </InfoCardImageWrap>

              <InfoCardBody>
                <InfoCardTitle>{currentB.title}</InfoCardTitle>
                <InfoCardContent>
                  <p>{currentB.content}</p>
                  <FactBox>
                    <FactTitle>💡 هل تعلم؟</FactTitle>
                    <p>{currentB.fact}</p>
                  </FactBox>
                </InfoCardContent>
              </InfoCardBody>
            </InfoCard>
          </ContentContainer>
        );
      }

      case "result": {
        const product = products[0];
        const benefits = getPlanBenefits(product?.category);
        const planName = getPlanName(product?.category);

        return (
          <ContentContainer centered>
            <MembershipCard>
              <PhoneImageWrap>
                <img src={PhoneImg} alt="تطبيق نوريش" />
              </PhoneImageWrap>
              <MembershipContent>
                <MembershipTitle>{planName}</MembershipTitle>
                <MembershipDivider />
                <BenefitsList>
                  {benefits.map((benefit, i) => (
                    <BenefitItem key={i}>
                      <BenefitIcon>
                        <CheckOutlineSVG />
                      </BenefitIcon>
                      <span>{benefit}</span>
                    </BenefitItem>
                  ))}
                </BenefitsList>
              </MembershipContent>
            </MembershipCard>

            {product && (
              <OrderSummaryContainer>
                <OrderItem>
                  <OrderItemName>{product.name}</OrderItemName>
                  <OrderItemDetails>
                    {product.price.toFixed(2)} ريال
                  </OrderItemDetails>
                </OrderItem>
                <OrderTotalContainer>
                  <OrderTotalText>الإجمالي</OrderTotalText>
                  <OrderTotalText>
                    {product.price.toFixed(2)} ريال
                  </OrderTotalText>
                </OrderTotalContainer>
              </OrderSummaryContainer>
            )}

            <ConsentBox>
              <ConsentCheckbox
                type="checkbox"
                id="marketingConsent"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
              />
              <ConsentLabel htmlFor="marketingConsent">
                أوافق على تلقي رسائل تسويقية من نوريش باستخدام نظام المراسلة
                الآلي على رقم الهاتف المذكور أعلاه. موافقتي ليست شرطاً لاستخدام
                هذه الخدمة. اكتب STOP للإلغاء. قد تُطبَّق رسوم الرسائل
                والبيانات. لمزيد من المعلومات حول كيفية معالجة بياناتك الصحية،
                يرجى قراءة{" "}
                <PrivacyLink to="/privacy">سياسة الخصوصية</PrivacyLink>.
              </ConsentLabel>
            </ConsentBox>

            {!marketingConsent && (
              <ConsentWarning>يجب الموافقة على الشروط للمتابعة</ConsentWarning>
            )}

            <SubmitOrderButton
              onClick={submitOrder}
              disabled={orderSubmitting || !marketingConsent}
            >
              {orderSubmitting ? "جارٍ إرسال الطلب..." : "إرسال الطلب"}
            </SubmitOrderButton>

            <FooterSub style={{ marginTop: "12px" }}>
              إلغاء في أي وقت. يتجدد الاشتراك تلقائياً كل عام.
            </FooterSub>
          </ContentContainer>
        );
      }

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <LoadingWrap>
        <LoadingSpinner />
        <LoadingText>جارٍ تحليل إجاباتك...</LoadingText>
      </LoadingWrap>
    );
  }

  return (
    <Wrapper>
      <WrapperForm onSubmit={(e) => e.preventDefault()}>
        <ProgressHeader>
          <ProgressCon>
            <ProgressTitle>
              {/* RTL layout: Back button on the right, logo center, spacer left */}
              <BackCon
                disabled={!canGoBack()}
                onClick={canGoBack() ? goToPrevious : undefined}
              >
                رجوع
              </BackCon>
              <LogoCon to={"/"}>
                <Logoimg src={Logo} alt="" />
              </LogoCon>
              <span style={{ width: "64px" }} />
            </ProgressTitle>
            {/* RTL progress bar: grows from right to left */}
            <ProgressTrack>
              <ProgressMeter progress={progressPercentage} />
            </ProgressTrack>
          </ProgressCon>
        </ProgressHeader>

        {addedMessage && (
          <AddedMessageNotification>{addedMessage}</AddedMessageNotification>
        )}

        {renderContent()}

        {flowStep !== "result" && (
          <Footer>
            <FooterBtn disabled={!canContinue()} onClick={handleContinue}>
              متابعة
            </FooterBtn>
            <FooterSub>جميع المعلومات التي تشاركها آمنة وسرية.</FooterSub>
          </Footer>
        )}
      </WrapperForm>
    </Wrapper>
  );
};

export default Recommendation;
