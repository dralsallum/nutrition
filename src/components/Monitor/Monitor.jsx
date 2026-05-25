import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #f5f0e8;
    font-family: 'Cairo', sans-serif;
    direction: rtl;
  }
`;

const Section = styled.section`
  min-height: 100vh;
  background: #fef9ee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 72px;
  overflow: hidden;
  direction: rtl;
`;

const HeadlineWrap = styled.div`
  text-align: center;
  margin-bottom: 22px;
  padding: 0 20px;
`;

const HeadlineLine1 = styled.h2`
  font-family: "Cairo", sans-serif;
  font-weight: 700;
  font-size: clamp(34px, 4.8vw, 62px);
  color: #1c140a;
  line-height: 1.4;
  letter-spacing: 0;

  .pill {
    background: #c4b3ef;
    border-radius: 5px;
    padding: 1px 8px 3px;
    display: inline-block;
  }
`;

const HeadlineLine2 = styled.div`
  font-family: "Cairo", sans-serif;
  font-weight: 300;
  font-size: clamp(34px, 4.8vw, 62px);
  color: #bf5228;
  line-height: 1.4;
  letter-spacing: 0;
`;

const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 52px;
  direction: rtl;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 7px;
  font-size: 14px;
  color: #5c4b38;
  font-weight: 400;
  font-family: "Cairo", sans-serif;
`;

const Check = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid #bf5228;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #bf5228;
  flex-shrink: 0;
`;

const MarqueeArea = styled.div`
  width: 100%;
  position: relative;
  margin: 70px 0 0 0;
`;

const Row = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 13px 0;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 160px;
    z-index: 10;
    pointer-events: none;
  }

  &::before {
    right: 0;
    background: linear-gradient(to left, #fef9ee 0%, transparent 100%);
  }

  &::after {
    left: 0;
    background: linear-gradient(to right, #fef9ee 0%, transparent 100%);
  }
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`;

const Tag = styled.span`
  white-space: nowrap;
  font-family: "Cairo", sans-serif;
  font-size: clamp(15px, 1.5vw, 19px);
  font-weight: 400;
  color: #221808;
  padding: 0 6px;

  &::before {
    content: "• ";
    color: #b8a898;
    padding: 0 14px;
  }
`;

const CardWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: clamp(270px, 30vw, 360px);
`;

const Card = styled.div`
  background: #fef9ef;
  border-radius: 20px;
  border: 1px solid rgba(220, 210, 195, 0.7);
  box-shadow:
    0 2px 0px rgba(255, 255, 255, 0.9) inset,
    0 12px 40px rgba(60, 35, 10, 0.1),
    0 2px 8px rgba(60, 35, 10, 0.06);
  padding: 20px 22px 14px;
  overflow: hidden;
  direction: rtl;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px;
`;

const CardTitle = styled.div`
  font-family: "Cairo", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  color: #8a7060;
`;

const CardBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "Cairo", sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #4aaa78;
  background: rgba(74, 170, 120, 0.1);
  border-radius: 20px;
  padding: 3px 9px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4aaa78;
    display: inline-block;
  }
`;

const ROW1 = [
  "متلازمة الأيض",
  "مرض الخلايا المنجلية",
  "مقاومة الأنسولين",
  "سرطان البروستاتا",
  "مرض هاشيموتو",
  "سرطان البنكرياس",
  "الذئبة الحمراء",
  "مرض الكلى المزمن",
  "مرض الشريان التاجي",
  "كثرة الحمر",
  "فقر الدم",
  "متلازمة كوشينغ",
  "التصلب المتعدد",
  "مرض باركنسون",
  "مرض الزهايمر",
  "السكري من النوع الثاني",
  "ضغط الدم المرتفع",
  "هشاشة العظام",
  "انقطاع النفس النومي",
  "الرجفان الأذيني",
  "مرض كرون",
  "بطانة الرحم المهاجرة",
  "الصدفية",
  "النقرس",
  "التجلط الوريدي العميق",
  "الصمة الرئوية",
];

const ROW2 = [
  "مرض الاضطراب الهضمي",
  "تسمم العفن",
  "نقص الغدد التناسلية",
  "سرطان المبيض",
  "مرض غريفز",
  "الفيبروميالغيا",
  "متلازمة تكيس المبايض",
  "قصور الغدة الدرقية",
  "التنكس البقعي",
  "الكبد الدهني غير الكحولي",
  "سرطان الثدي",
  "سرطان القولون",
  "حصى الكلى",
  "الجلوكوما",
  "اعتلال الأعصاب المحيطي",
  "قصور الغدة الكظرية",
  "ورم الغدة النخامية",
  "التهاب المثانة الخلالي",
  "الوهن العضلي الوبيل",
  "متلازمة شوغرن",
  "التهاب الأوعية",
  "الساركويد",
  "داء ترسب الأصبغة الدموية",
  "مرض ويلسون",
];

const CW = 300;
const CH = 190;

const COL_W = 6;
const COL_GAP = 4;
const COL1_X = CW - COL_W;
const COL2_X = CW - COL_W * 2 - COL_GAP;
const COLS_START = COL2_X - 0;

const CHART_X0 = COLS_START - 40;
const CHART_X1 = CW * (1 - 0.56);
const CHART_X2 = CW * (1 - 0.92);

const Y_IN = CH * 0.22;
const Y_DIV = CH * 0.5;
const Y_BELOW = CH * 0.84;

const pts = (points) => points.map((p) => `${p.x},${p.y}`).join(" ");

export default function Monitor() {
  return (
    <>
      <GlobalStyle />
      <Section dir="rtl">
        <HeadlineWrap>
          <HeadlineLine1>
            <span className="pill">راقِب</span> المؤشرات المبكرة لـ
          </HeadlineLine1>
          <HeadlineLine2>آلاف الأمراض</HeadlineLine2>
        </HeadlineWrap>

        <FeatureRow>
          {[
            "أنشئ خط أساسك طويل الأمد",
            "متابعة مدى الحياة",
            "راقب كيف يتغير جسمك",
          ].map((f) => (
            <Feature key={f}>
              <Check>✓</Check>
              {f}
            </Feature>
          ))}
        </FeatureRow>

        <MarqueeArea>
          <Row>
            <Track>
              {ROW1.map((name, i) => (
                <Tag key={i}>{name}</Tag>
              ))}
            </Track>
          </Row>
          <Row>
            <Track>
              {ROW2.map((name, i) => (
                <Tag key={i}>{name}</Tag>
              ))}
            </Track>
          </Row>

          <CardWrap>
            <Card>
              <CardHeader>
                <CardTitle>اتجاه المؤشر الحيوي</CardTitle>
                <CardBadge>ضمن النطاق</CardBadge>
              </CardHeader>

              <svg
                viewBox={`0 0 ${CW} ${CH + 22}`}
                width="100%"
                style={{ display: "block", overflow: "visible" }}
              >
                <rect
                  x={COL1_X}
                  y={0}
                  width={COL_W}
                  height={Y_DIV}
                  fill="#fef9ef"
                  stroke="rgba(200,185,170,0.4)"
                  strokeWidth="0.5"
                  rx="2"
                />
                <rect
                  x={COL1_X}
                  y={Y_DIV}
                  width={COL_W}
                  height={CH - Y_DIV}
                  fill="#dd9a7c"
                  rx="2"
                />

                {/* IN RANGE shaded band */}
                <rect
                  x={0}
                  y={0}
                  width={COLS_START}
                  height={Y_DIV}
                  fill="rgba(74,170,120,0.07)"
                  rx="4"
                />

                {/* Dashed divider */}
                <line
                  x1={0}
                  y1={Y_DIV}
                  x2={COLS_START}
                  y2={Y_DIV}
                  stroke="#ddd6cc"
                  strokeWidth="1"
                  strokeDasharray="5 4"
                />

                {/* Zone labels */}
                <text
                  x={COLS_START - 40}
                  y={Y_DIV - 40}
                  fontFamily="Cairo, sans-serif"
                  fontSize="8"
                  fontWeight="600"
                  fill="#4aaa78"
                  textAnchor="end"
                >
                  ضمن النطاق
                </text>
                <text
                  x={COLS_START - 35}
                  y={Y_DIV + 40}
                  fontFamily="Cairo, sans-serif"
                  fontSize="8"
                  fontWeight="600"
                  fill="#b06040"
                  textAnchor="end"
                >
                  دون النطاق
                </text>

                {/* Orange segment */}
                <polyline
                  points={pts([
                    { x: CHART_X0, y: Y_BELOW },
                    { x: CHART_X1, y: Y_IN + 4 },
                  ])}
                  fill="none"
                  stroke="#c06040"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Green segment */}
                <polyline
                  points={pts([
                    { x: CHART_X1, y: Y_IN + 4 },
                    { x: CHART_X2, y: Y_IN },
                  ])}
                  fill="none"
                  stroke="#4aaa78"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Origin dot */}
                <circle
                  cx={CHART_X0}
                  cy={Y_BELOW}
                  r="5"
                  fill="#c06040"
                  stroke="#fffdf7"
                  strokeWidth="2.5"
                />

                {/* Crossover dot */}
                <circle
                  cx={CHART_X1}
                  cy={Y_IN + 4}
                  r="5"
                  fill="#4aaa78"
                  stroke="#fffdf7"
                  strokeWidth="2.5"
                />

                {/* Current reading dot */}
                <circle
                  cx={CHART_X2}
                  cy={Y_IN}
                  r="8"
                  fill="none"
                  stroke="#4aaa78"
                  strokeWidth="2"
                />
                <circle cx={CHART_X2} cy={Y_IN} r="3.5" fill="#4aaa78" />

                {/* X-axis labels */}
                {[
                  { x: CHART_X2, label: "مايو 26" },
                  { x: CHART_X1, label: "أكتوبر 25" },
                  { x: CHART_X0, label: "مايو 25" },
                ].map(({ x, label }) => (
                  <text
                    key={label}
                    x={x}
                    y={CH + 14}
                    fontFamily="Cairo, sans-serif"
                    fontSize="9"
                    fill="#c0b0a0"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                ))}
              </svg>
            </Card>
          </CardWrap>
        </MarqueeArea>
      </Section>
    </>
  );
}
