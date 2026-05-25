import React, { useState, useEffect, useRef } from "react";
import styled, { css, createGlobalStyle, keyframes } from "styled-components";
import Food from "../../assets/food.png";
import Pill from "../../assets/pill.png";
import Exercise from "../../assets/weights.png";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
`;

/* ─── Keyframes ──────────────────────────────────────── */
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(60px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const drawLine = keyframes`
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
`;

const popIn = keyframes`
  0%   { opacity: 0; transform: scale(0.8); }
  65%  { transform: scale(1.07); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideInFromLeft = keyframes`
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
`;

/* ─── Layout ─────────────────────────────────────────── */
const Section = styled.section`
  background: #fdf9ee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Tajawal", sans-serif;
  direction: rtl;

  @media (max-width: 980px) {
    padding: 40px 16px;
    justify-content: flex-start;
  }
`;

const Heading = styled.h1`
  font-family: "Amiri", serif;
  font-weight: 700;
  font-size: 52px;
  color: #2c2b30;
  margin: 0 0 52px;
  letter-spacing: 0.5px;
  text-align: center;
  opacity: 0;

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideUp} 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards;
    `}

  em {
    font-style: italic;
    color: #b05a36;
    font-weight: 400;
  }

  @media (max-width: 980px) {
    font-size: 36px;
    margin: 0 0 32px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 52px;
  direction: rtl;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin-bottom: 32px;
  }
`;

/* ─── Card ────────────────────────────────────────────── */
const Card = styled.div`
  background: #f0ebe3;
  border-radius: 20px;
  padding: 36px 45px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 380px;
  opacity: 0;

  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${slideUp} 0.7s cubic-bezier(0.22, 1, 0.36, 1)
        ${$delay ?? 0.25}s forwards;
    `}

  @media (max-width: 980px) {
    padding: 28px 45px 32px;
    min-height: unset;
  }
`;

const StepNum = styled.span`
  font-family: "Tajawal", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #b05a36;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const CardTitle = styled.h2`
  font-family: "Amiri", serif;
  font-weight: 700;
  font-size: 28px;
  color: #2c2b30;
  margin: 0 0 8px;
  text-align: center;
`;

const CardSub = styled.p`
  font-size: 14px;
  color: #7a7570;
  margin: 0 0 28px;
  text-align: center;
  font-family: "Tajawal", sans-serif;
`;

/* ─── Card 1: Calendar ───────────────────────────────── */
const Calendar = styled.div`
  width: 100%;
`;

const DayRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 12px;
  flex-direction: row-reverse;

  @media (max-width: 980px) {
    gap: 6px;
  }
`;

const DayCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 52px;

  @media (max-width: 980px) {
    width: 44px;
  }
`;

const DayLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #7a7570;
  letter-spacing: 0.5px;
  font-family: "Tajawal", sans-serif;
`;

const DayNum = styled.div`
  width: 48px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  font-family: "Amiri", serif;
  transition: all 0.25s ease;

  ${({ $active }) =>
    $active
      ? css`
          background: #b05a36;
          color: #fff;
          box-shadow: 0 4px 14px rgba(176, 90, 54, 0.35);
        `
      : css`
          background: #fff;
          color: #2c2b30;
        `}

  @media (max-width: 980px) {
    width: 42px;
    height: 46px;
    font-size: 18px;
  }
`;

const TimeRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-direction: row-reverse;

  @media (max-width: 980px) {
    gap: 6px;
    flex-wrap: wrap;
  }
`;

const TimeChip = styled.div`
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  font-family: "Tajawal", sans-serif;
  cursor: pointer;
  transition: all 0.25s ease;

  ${({ $active }) =>
    $active
      ? css`
          background: #b05a36;
          color: #fff;
          box-shadow: 0 4px 10px rgba(176, 90, 54, 0.3);
        `
      : css`
          background: #fff;
          color: #2c2b30;
        `}
`;

/* ─── Card 2: Chart ──────────────────────────────────── */
const ChartWrap = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
`;

const ChartSvg = styled.svg`
  width: 100%;
  max-width: 340px;
  overflow: visible;
`;

const AnimatedLine = styled.line`
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  pathlength: 1;
  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${drawLine} 0.8s cubic-bezier(0.22, 1, 0.36, 1)
        ${$delay ?? 0.2}s forwards;
    `}
`;

const AnimatedCircle = styled.circle`
  opacity: 0;
  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${popIn} 0.4s ease ${$delay ?? 0}s forwards;
    `}
`;

const AnimatedText = styled.text`
  opacity: 0;
  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${fadeIn} 0.4s ease ${$delay ?? 0}s forwards;
    `}
`;

/* ─── Card 3: Protocol ───────────────────────────────── */
const ProtocolList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProtocolItem = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  direction: rtl;
  opacity: 0;

  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${slideInFromLeft} 0.5s cubic-bezier(0.22, 1, 0.36, 1)
        ${$delay ?? 0}s forwards;
    `}
`;

const ProtocolText = styled.div`
  h4 {
    margin: 0 0 2px;
    font-size: 14px;
    font-weight: 600;
    color: #2c2b30;
    font-family: "Tajawal", sans-serif;
    text-align: right;
  }
  p {
    margin: 0;
    font-size: 12px;
    color: #7a7570;
    font-family: "Tajawal", sans-serif;
    text-align: right;
  }
`;

/* ─── Buttons ─────────────────────────────────────────── */
const BtnRow = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row-reverse;
  opacity: 0;

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.8s forwards;
    `}

  @media (max-width: 980px) {
    flex-direction: column;
    width: 100%;
    max-width: 480px;
  }
`;

const BtnPrimary = styled.button`
  background: #b05a36;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 16px 36px;
  font-size: 15px;
  font-weight: 600;
  font-family: "Tajawal", sans-serif;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(176, 90, 54, 0.35);
  transition: all 0.2s ease;

  &:hover {
    background: #8f4829;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(176, 90, 54, 0.45);
  }

  @media (max-width: 980px) {
    width: 100%;
    padding: 16px 24px;
  }
`;

const BtnOutline = styled.button`
  background: transparent;
  color: #b05a36;
  border: 2px solid #b05a36;
  border-radius: 50px;
  padding: 16px 36px;
  font-size: 15px;
  font-weight: 600;
  font-family: "Tajawal", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(176, 90, 54, 0.08);
  }

  @media (max-width: 980px) {
    width: 100%;
    padding: 16px 24px;
  }
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const IconImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
`;

const StyledText = styled.text`
  font-size: 9.5px;
  fill: #7a7570;
  font-family: "Tajawal", sans-serif;
  letter-spacing: 0.7px;
  font-weight: 600;
`;

/* ─── Component ───────────────────────────────────────── */
const Health = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const days = [
    { label: "الثلاثاء", num: 5 },
    { label: "الأربعاء", num: 6 },
    { label: "الخميس", num: 7, active: true },
    { label: "الجمعة", num: 8 },
    { label: "السبت", num: 9 },
  ];

  const times = ["8:50", "9:00", "9:10", "9:20", "9:30"];
  const [activeTime, setActiveTime] = useState("9:00");

  return (
    <Section ref={sectionRef}>
      <GlobalStyle />

      <Heading $visible={visible}>
        الفحص أصبح <em>سهلاً</em>
      </Heading>

      <Grid>
        {/* Card 1 - Calendar */}
        <Card $visible={visible} $delay={0.25}>
          <StepNum>٠١</StepNum>
          <CardTitle>+160 فحصاً مخبرياً</CardTitle>
          <CardSub>حدد موعدك في +2000 موقع لـ Quest Diagnostics</CardSub>
          <Calendar>
            <DayRow>
              {days.map((d) => (
                <DayCell key={d.num}>
                  <DayLabel>{d.label}</DayLabel>
                  <DayNum $active={d.active}>{d.num}</DayNum>
                </DayCell>
              ))}
            </DayRow>
            <TimeRow>
              {times.map((t) => (
                <TimeChip
                  key={t}
                  $active={activeTime === t}
                  onClick={() => setActiveTime(t)}
                >
                  {t}
                </TimeChip>
              ))}
            </TimeRow>
          </Calendar>
        </Card>

        {/* Card 2 - Results */}
        <Card $visible={visible} $delay={0.38}>
          <StepNum>٠٢</StepNum>
          <CardTitle>نتائج مفسَّرة</CardTitle>
          <CardSub>من كبار الأطباء وآلاف ساعات البحث</CardSub>
          <ChartWrap>
            <ChartSvg
              viewBox="0 0 400 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Zone bars */}
              <rect
                x="380"
                y="20"
                width="10"
                height="60"
                rx="3"
                fill="#f0ebe3"
                stroke="#ccc7bf"
                strokeWidth="1.2"
              />
              <rect
                x="380"
                y="90"
                width="10"
                height="60"
                rx="3"
                fill="#b05a36"
                opacity="0.75"
              />
              <rect
                x="380"
                y="160"
                width="10"
                height="60"
                rx="3"
                fill="#f0ebe3"
                stroke="#ccc7bf"
                strokeWidth="1.2"
              />

              {/* Zone labels */}
              <StyledText x="374" y="50">
                فوق المعدل
              </StyledText>
              <StyledText x="376" y="125">
                ضمن المعدل
              </StyledText>
              <StyledText x="374" y="195">
                دون المعدل
              </StyledText>

              {/* Dashed dividers */}
              <line
                x1="14"
                y1="90"
                x2="386"
                y2="90"
                stroke="#ccc7bf"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              <line
                x1="14"
                y1="150"
                x2="386"
                y2="150"
                stroke="#ccc7bf"
                strokeWidth="1"
                strokeDasharray="4,3"
              />

              {/* In-range shaded band */}
              <rect
                x="14"
                y="90"
                width="372"
                height="60"
                fill="#b05a36"
                opacity="0.10"
              />

              {/* Animated solid line P1→P2 */}
              <AnimatedLine
                x1="140"
                y1="45"
                x2="240"
                y2="118"
                stroke="#b05a36"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                $visible={visible}
                $delay={0.7}
              />

              {/* Animated dashed line P2→P3 */}
              <AnimatedLine
                x1="240"
                y1="118"
                x2="320"
                y2="98"
                stroke="#b05a36"
                strokeWidth="2"
                strokeDasharray="5,4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                $visible={visible}
                $delay={0.95}
              />

              {/* Dots */}
              <AnimatedCircle
                cx="140"
                cy="45"
                r="5"
                fill="#b05a36"
                $visible={visible}
                $delay={0.65}
              />
              <AnimatedCircle
                cx="240"
                cy="118"
                r="5"
                fill="#b05a36"
                $visible={visible}
                $delay={0.88}
              />
              <AnimatedCircle
                cx="320"
                cy="98"
                r="5"
                fill="#b05a36"
                $visible={visible}
                $delay={1.08}
              />

              {/* Value labels */}
              <AnimatedText
                x="140"
                y="35"
                fontSize="11"
                fill="#2c2b30"
                fontFamily="Tajawal, sans-serif"
                fontWeight="500"
                textAnchor="middle"
                $visible={visible}
                $delay={0.7}
              >
                ١٤٫٧
              </AnimatedText>
              <AnimatedText
                x="240"
                y="134"
                fontSize="11"
                fill="#2c2b30"
                fontFamily="Tajawal, sans-serif"
                fontWeight="500"
                textAnchor="middle"
                $visible={visible}
                $delay={0.93}
              >
                ١٠٫٠
              </AnimatedText>
              <AnimatedText
                x="320"
                y="88"
                fontSize="11"
                fill="#2c2b30"
                fontFamily="Tajawal, sans-serif"
                fontWeight="500"
                textAnchor="middle"
                $visible={visible}
                $delay={1.12}
              >
                ١٢٫٥
              </AnimatedText>
            </ChartSvg>
          </ChartWrap>
        </Card>

        {/* Card 3 - Protocol */}
        <Card $visible={visible} $delay={0.5}>
          <StepNum>٠٣</StepNum>
          <CardTitle>اتبع بروتوكولك</CardTitle>
          <CardSub>تصرّف. افحص مجدداً.</CardSub>
          <ProtocolList>
            <ProtocolItem $visible={visible} $delay={0.68}>
              <IconBox>
                <IconImg src={Food} alt="الغذاء" />
              </IconBox>
              <ProtocolText>
                <h4>الأغذية</h4>
                <p>سلمون بري ٦ أوقية، بقدونس عضوي…</p>
              </ProtocolText>
            </ProtocolItem>
            <ProtocolItem $visible={visible} $delay={0.8}>
              <IconBox>
                <IconImg src={Pill} alt="المكملات" />
              </IconBox>
              <ProtocolText>
                <h4>المكملات الغذائية</h4>
                <p>إينوزيتول ٧٥٠ مجم، CoQ10 ١٠٠ مجم…</p>
              </ProtocolText>
            </ProtocolItem>
            <ProtocolItem $visible={visible} $delay={0.92}>
              <IconBox>
                <IconImg src={Exercise} alt="الصحة اليومية" />
              </IconBox>
              <ProtocolText>
                <h4>الصحة اليومية</h4>
                <p>الإطالة، بناء العضلات، النوم…</p>
              </ProtocolText>
            </ProtocolItem>
          </ProtocolList>
        </Card>
      </Grid>

      <BtnRow $visible={visible}>
        <BtnPrimary>ابدأ الفحص</BtnPrimary>
        <BtnOutline>شاهد كيف يعمل</BtnOutline>
      </BtnRow>
    </Section>
  );
};

export default Health;
