import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  background-color: #fef9ee;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  font-family: "Tajawal", serif;
  direction: rtl;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 400;
  color: #2c2c2c;
  margin-bottom: 44px;
  letter-spacing: -0.01em;
  animation: ${fadeIn} 0.6s ease both;
  font-family: "Tajawal", serif;

  em {
    font-style: italic;
    color: #b5614a;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  border-radius: 16px;
  overflow: hidden;
  animation: ${fadeIn} 0.7s ease 0.1s both;
  box-shadow:
    0 6px 40px rgba(0, 0, 0, 0.13),
    0 2px 12px rgba(0, 0, 0, 0.07);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  table-layout: fixed;
`;

const HeaderRow = styled.tr``;

const HeaderCell = styled.th`
  padding: 18px 24px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-align: center;
  font-family: "Tajawal", serif;

  &.label-th {
    text-align: right;
    background: transparent;
    width: 55%;
  }

  &.function-col {
    background-color: #b5614a;
    color: #fff;
    border-radius: 14px 14px 0 0;
    width: 22%;
  }

  &.standard-col {
    color: #999;
    font-weight: 400;
    background: transparent;
    width: 23%;
  }
`;

const FunctionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 700;
`;

const LogoCircle = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 255, 255, 0.7);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
`;

const Row = styled.tr`
  &:nth-child(odd) td {
    background-color: #ede8df;
  }
  &:nth-child(even) td {
    background-color: #f0ece3;
  }
  &:last-child td {
    border-bottom: none;
  }
`;

const Cell = styled.td`
  padding: 16px 24px;
  font-size: 0.9rem;
  color: #3a3a3a;
  text-align: center;
  vertical-align: middle;
  font-family: "Tajawal", serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  &.label-td {
    text-align: right;
    color: #555;
    font-weight: 400;
    font-size: 0.95rem;
  }

  &.function-col {
    background-color: #b5614a !important;
    color: #fff;
  }

  &.standard-col {
    color: #aaa;
  }
`;

const ValueText = styled.span`
  font-weight: 800;
  font-size: 1.15rem;
  color: #fff;
`;

const StdValue = styled.span`
  font-size: 1.1rem;
  color: #777;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #2c2c2c;
  margin-top: 60px;
  letter-spacing: -0.01em;
  animation: ${fadeIn} 0.7s ease 0.3s both;
  font-family: "Tajawal", serif;

  em {
    font-style: italic;
    color: #b5614a;
  }
`;

const LogoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" />
    <circle cx="7" cy="7" r="2" fill="white" />
  </svg>
);

const CheckIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="13" r="13" fill="rgba(255,255,255,0.22)" />
    <path
      d="M8 13.5l3.5 3.5 7-7"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="13" r="12" stroke="#ccc" strokeWidth="1.2" />
    <path
      d="M9 9l8 8M17 9l-8 8"
      stroke="#bbb"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const features = [
  { label: "فحوصات مخبرية سنوياً", function: "١٨٠+", standard: "~٢٨" },
  { label: "خطة عمل شخصية", function: true, standard: false },
  { label: "رفع نتائج سابقة", function: true, standard: false },
  { label: "لا حاجة للتأمين", function: true, standard: false },
  { label: "كل ٦ أشهر", function: true, standard: false },
  { label: "فحص الهرمونات والخصوبة", function: true, standard: false },
  { label: "فحص المعادن الثقيلة والسموم", function: true, standard: false },
  { label: "فحص الأيض والبنكرياس", function: true, standard: false },
  {
    label: "فحص القلب لما هو أبعد من الكوليسترول",
    function: true,
    standard: false,
  },
  { label: "فحص العناصر الغذائية والكهارل", function: true, standard: false },
  { label: "فحص المناعة الذاتية", function: true, standard: false },
  { label: "فحص الغدة الدرقية", function: true, standard: false },
  {
    label: "الوصول إلى التصوير بالرنين والـ CT",
    function: true,
    standard: false,
  },
  { label: "فحص Galleri® للكشف عن السرطانات", function: true, standard: false },
  { label: "فحص الزهايمر وصحة الدماغ", function: true, standard: false },
  { label: "فحص التفاعل مع العفن", function: true, standard: false },
];

const renderFunctionValue = (val) => {
  if (val === true) return <CheckIcon />;
  if (typeof val === "string") return <ValueText>{val}</ValueText>;
  return null;
};

const renderStandardValue = (val) => {
  if (val === false) return <XIcon />;
  if (typeof val === "string") return <StdValue>{val}</StdValue>;
  return null;
};

export default function Between() {
  return (
    <>
      {/* Load Tajawal Arabic font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
        rel="stylesheet"
      />

      <Page>
        <Title>
          <em>ليس فحصك</em> الاعتيادي
        </Title>

        <TableWrapper>
          <Table>
            <colgroup>
              <col style={{ width: "55%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "23%" }} />
            </colgroup>
            <thead>
              <HeaderRow>
                <HeaderCell className="label-th" />
                <HeaderCell className="function-col">
                  <FunctionBadge>
                    <LogoCircle>
                      <LogoIcon />
                    </LogoCircle>
                    فانكشن
                  </FunctionBadge>
                </HeaderCell>
                <HeaderCell className="standard-col">
                  الفحص الاعتيادي
                </HeaderCell>
              </HeaderRow>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <Row key={i}>
                  <Cell className="label-td">{feature.label}</Cell>
                  <Cell className="function-col">
                    {renderFunctionValue(feature.function)}
                  </Cell>
                  <Cell className="standard-col">
                    {renderStandardValue(feature.standard)}
                  </Cell>
                </Row>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Subtitle>
          مبني مع <em>أفضل الأطباء</em> في العالم
        </Subtitle>
      </Page>
    </>
  );
}
