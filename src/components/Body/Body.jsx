// src/components/Body.jsx
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Report from "../../assets/report.png";
import Obesity from "../../assets/obesity.png";
import Record from "../../assets/record.png";

/*───────────────────────────
  1) Layout Containers
───────────────────────────*/
const ReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Segoe UI", "Tahoma", "Arial", sans-serif;
  color: #2c3e50;
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  direction: rtl;
  min-height: 100vh;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const LeftColumn = styled.div`
  flex: 2;
  padding-left: 30px;
  border-right: 3px solid #3498db;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  margin-left: 20px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

/*───────────────────────────
  2) Header / Top Info
───────────────────────────*/
const Header = styled.div`
  width: 100%;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 25px;
  border-radius: 15px;
  color: white;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 15px;

  &::before {
    font-size: 40px;
  }
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const InfoItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 16px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const InfoLabel = styled.span`
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
  opacity: 0.9;
`;

const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

/*───────────────────────────
  3) Section Titles
───────────────────────────*/
const Section = styled.div`
  margin-bottom: 35px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(52, 152, 219, 0.2);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
  padding: 15px;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 3px 10px rgba(116, 185, 255, 0.3);

  &::before {
    font-size: 18px;
  }
`;

/*───────────────────────────
  4) Body Composition Table
───────────────────────────*/
const BodyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  td,
  th {
    padding: 15px;
    border: none;
    font-size: 14px;
    text-align: right;
    border-bottom: 1px solid #ecf0f1;
  }

  th {
    font-weight: 600;
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }

  tr:hover {
    background-color: #e3f2fd;
    transform: scale(1.01);
    transition: all 0.2s ease;
  }
`;

/*───────────────────────────
  5) Enhanced Bar Charts
───────────────────────────*/
const BarChartContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const ChartLabelRow = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
  color: #636e72;
`;

const ChartBarWrapper = styled.div`
  background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
  height: 20px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartBar = styled.div`
  background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  height: 100%;
  width: ${(props) => props.width || "0%"};
  border-radius: 10px;
  position: relative;
  box-shadow: 0 2px 8px rgba(108, 92, 231, 0.4);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 100%
    );
    border-radius: 10px 10px 0 0;
  }
`;

const BarValueLabel = styled.div`
  font-size: 16px;
  margin-top: 10px;
  font-weight: 700;
  text-align: right;
  color: #2d3436;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "📈";
    font-size: 14px;
  }
`;

/*───────────────────────────
  6) Segmental Diagrams
───────────────────────────*/
const DiagramContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const DiagramBox = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 30px;
  border-radius: 15px;
  position: relative;
  box-shadow: 0 8px 25px rgba(240, 147, 251, 0.3);
`;

const Silhouette = styled.div`
  width: 100%;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 C55 10 60 15 60 20 C60 25 55 30 50 30 C45 30 40 25 40 20 C40 15 45 10 50 10 Z M50 30 C60 30 65 35 65 45 L65 70 C65 75 60 80 50 80 C40 80 35 75 35 70 L35 45 C35 35 40 30 50 30 Z M35 45 L25 50 L25 65 L35 60 Z M65 45 L75 50 L75 65 L65 60 Z M40 80 L40 90 L35 95 L35 100 L45 100 L45 95 L40 90 Z M60 80 L60 90 L65 95 L65 100 L55 100 L55 95 L60 90 Z'/%3E%3C/svg%3E")
    no-repeat center center;
  background-size: contain;
  position: relative;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

const PositionLabel = styled.div`
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  color: white;
  text-align: center;
  line-height: 1.2;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

/*───────────────────────────
  7) Enhanced Small Tables
───────────────────────────*/
const TableSmall = styled.table`
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 15px;

  td,
  th {
    padding: 12px 15px;
    border: none;
    text-align: right;
    border-bottom: 1px solid #ecf0f1;
  }

  th {
    font-weight: 600;
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }

  tr:hover {
    background-color: #ffeaa7;
    transition: all 0.2s ease;
  }
`;

/*───────────────────────────
  8) QR Code Section
───────────────────────────*/
const QRAndImpedance = styled.div`
  margin-top: 25px;
`;

const QRContainer = styled.div`
  margin-top: 15px;
  text-align: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 3px solid #74b9ff;
  }
`;

/*───────────────────────────
  9) Right Column Components
───────────────────────────*/
const RightSection = styled.div`
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #00b894;
`;

const RightLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  color: #2d3436;
`;

const RightValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  color: #0984e3;
  margin-top: 5px;
  margin-right: 8px;
`;

const RightRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding: 10px;
  background: rgba(116, 185, 255, 0.1);
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(116, 185, 255, 0.2);
    transform: translateX(-5px);
  }
`;

/*───────────────────────────
  10) Download Button Styling
───────────────────────────*/
const DownloadButton = styled.button`
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  margin: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 184, 148, 0.6);
  }

  &::before {
    content: "📄";
    font-size: 18px;
  }
`;

/*───────────────────────────
  11) Score Display
───────────────────────────*/
const ScoreDisplay = styled.div`
  font-size: 48px;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;
const IconImg = styled.img`
  width: 30px;
  height: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

/*───────────────────────────
  12) Food & Exercise Styling
───────────────────────────*/
const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const FoodCard = styled.div`
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const FoodEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const FoodName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 10px;
`;

const FoodCalories = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #00b894;
  margin-bottom: 8px;
`;

const FoodPortion = styled.div`
  font-size: 14px;
  color: #636e72;
  font-style: italic;
`;

const ExerciseCard = styled.div`
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ExerciseName = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
`;

const ExerciseCalories = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #e17055;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px 12px;
  border-radius: 20px;
`;

const ExerciseDescription = styled.div`
  font-size: 14px;
  color: #636e72;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const YouTubeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #ff0000;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #cc0000;
    transform: scale(1.05);
  }

  &::before {
    content: "▶️";
    font-size: 12px;
  }
`;

const MealPlanSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 25px;
  border-radius: 15px;
  color: white;
  margin-bottom: 20px;
`;

const MealPlanTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "🍽️";
    font-size: 22px;
  }
`;

const MealPlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const MealPlanItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

const MealTime = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
`;

const MealDetails = styled.div`
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
`;

/*───────────────────────────
  12) Main React Component
───────────────────────────*/
const Body = () => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [location, setLocation] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [goal, setGoal] = useState("");
  const [weight, setWeight] = useState();
  const [idealWeight, setIdealWeight] = useState();
  const [waterWeight, setWaterWeight] = useState();
  const [minWater, setMinWater] = useState();
  const [maxWater, setMaxWater] = useState();
  const [minIdealWeight, setMinIdealWeight] = useState();
  const [maxIdealWeight, setMaxIdealWeight] = useState();
  const [minProtein, setMinProtein] = useState();
  const [maxProtein, setMaxProtein] = useState();
  const [minCarbs, setMinCarbs] = useState();
  const [maxCarbs, setMaxCarbs] = useState();
  const [minFat, setMinFat] = useState();
  const [maxFat, setMaxFat] = useState();
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proteins, setProteins] = useState();
  const [carbs, setCarbs] = useState();
  const [fats, setFats] = useState();
  const [BMR, setBMR] = useState();
  const [normalWeight, setNormalWeight] = useState("");
  const [bodyFat, setBodyFat] = useState();
  const [kgFat, setKgFat] = useState();
  const [weightLoss, setWeightLoss] = useState();
  const [inBody, setInBody] = useState();
  const { id } = useParams();
  const cv = useRef(null);

  // Dynamic data arrays
  const range = [50, 60, 70, 80, 90, 100, 110, 130, 150];
  const cal = [1300, 1500, 1700, 1900, 2100, 2300, 2500];
  const reusable = [10, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35];
  const normal = ["نقص", "طبيعي", "زيادة"];
  const reduce = weight - idealWeight;

  // Body composition data
  const bodyCompositionData = [
    {
      label: "إجمالي ماء الجسم (لتر)",
      value: waterWeight,
      range: `${minWater}~${maxWater}`,
    },
    {
      label: "احتياج البروتين (جرام)",
      value: proteins,
      range: `${minProtein}~${maxProtein}`,
    },
    {
      label: "احتياج الكربوهدرات (جرام)",
      value: carbs,
      range: `${minCarbs}~${maxCarbs}`,
    },
    {
      label: "احتياج الدهون (جرام)",
      value: fats,
      range: `${minFat}~${maxFat}`,
    },
    {
      label: "الوزن (كجم)",
      value: weight,
      range: `${minIdealWeight}~${maxIdealWeight}`,
    },
  ];

  // Body history data
  const bodyHistoryData = [
    { indicator: "الوزن (كجم)", value: weight },
    { indicator: "الكتلة العضلية (كجم)", value: "35.3" },
    { indicator: "نسبة الدهون (%)", value: bodyFat },
  ];

  // Exercise calories data (30 minutes)
  const exerciseCaloriesData = [
    {
      exercise1: "الجولف",
      calories1: "138",
      exercise2: "غيتبول",
      calories2: "149",
    },
    {
      exercise1: "المشي",
      calories1: "157",
      exercise2: "اليوغا",
      calories2: "157",
    },
    {
      exercise1: "كرة الريشة",
      calories1: "178",
      exercise2: "تنس الطاولة",
      calories2: "178",
    },
    {
      exercise1: "التنس",
      calories1: "236",
      exercise2: "ركوب الدراجة",
      calories2: "236",
    },
    {
      exercise1: "الملاكمة",
      calories1: "256",
      exercise2: "كرة السلة",
      calories2: "236",
    },
    {
      exercise1: "تسلق الجبال",
      calories1: "256",
      exercise2: "القفز بالحبل",
      calories2: "275",
    },
    {
      exercise1: "تمارين الإيروبكس",
      calories1: "275",
      exercise2: "الركض",
      calories2: "275",
    },
    {
      exercise1: "كرة القدم",
      calories1: "275",
      exercise2: "السباحة",
      calories2: "275",
    },
    {
      exercise1: "الكندو",
      calories1: "393",
      exercise2: "كرة المضرب",
      calories2: "393",
    },
    {
      exercise1: "الإسكواش",
      calories1: "393",
      exercise2: "التايكوندو",
      calories2: "393",
    },
  ];

  // Weight monitoring data
  const weightMonitoringData = [
    { label: "الوزن المستهدف:", value: `${idealWeight} كجم` },
    { label: "تحكم الوزن:", value: `-${reduce.toFixed(1)} كجم` },
    { label: "تحكم الدهون:", value: "-5.1 كجم" },
    { label: "تحكم العضلات:", value: "0.0 كجم" },
  ];

  // Obesity assessment data
  const obesityAssessmentData = [
    { label: "مؤشر كتلة الجسم:", value: normalWeight },
    { label: "نسبة الدهون:", value: "زيادة خفيفة" },
    { label: "مستوى الدهون الحشوية:", value: "المستوى 7 (من 1 إلى 10)" },
  ];

  // Research criteria data
  const researchCriteriaData = [
    { label: "الكتلة النقية من الدهون:", value: `${kgFat} كجم` },
    { label: "معدل الأيض الأساسي:", value: `${BMR} كيلو كالوري` },
    { label: "درجة السمنة:", value: "112٪ (90~110)" },
    { label: "معدل السعرات الموصى به:", value: `${weightLoss} كيلو كالوري` },
  ];

  // ─────────── جدول تمارين أسبوعي (كارديو + إطالات) ───────────
  const weeklyExerciseData = [
    {
      day: "الأحد",
      exercises: [
        {
          name: "جري متدرّج على السير – 25 د",
          videoUrl: "https://www.youtube.com/watch?v=AtrQtYxOb1w",
        }, // تردميل انترفالز :contentReference[oaicite:0]{index=0}
        {
          name: "نطّ حبل لحرق الدهون – 20 د",
          videoUrl: "https://www.youtube.com/watch?v=drwHK8Xt-8w",
        }, // Jump-Rope :contentReference[oaicite:1]{index=1}
      ],
      stretching: {
        name: "إطالات للجسم كامل – 15 د",
        videoUrl: "https://www.youtube.com/watch?v=g_tea8ZNk5A", // Full-Body Stretch :contentReference[oaicite:2]{index=2}
      },
    },

    {
      day: "الاثنين",
      exercises: [
        {
          name: "مشي نشيط داخل المنزل – 25 د",
          videoUrl: "https://www.youtube.com/watch?v=saL5IguTMeY",
        }, // Walk-at-Home :contentReference[oaicite:3]{index=3}
        {
          name: "HIIT منخفض التأثير – 20 د",
          videoUrl: "https://www.youtube.com/watch?v=r-g6pLPK-MM",
        }, // Low-Impact HIIT :contentReference[oaicite:4]{index=4}
      ],
      stretching: {
        name: "إطالات للجسم كامل – 15 د",
        videoUrl: "https://www.youtube.com/watch?v=g_tea8ZNk5A", // نفس فيديو الإطالة
      },
    },

    {
      day: "الثلاثاء",
      exercises: [
        {
          name: "ستيب كارديو (متوسط) – 25 د",
          videoUrl: "https://www.youtube.com/watch?v=KRiVuI1_7dw",
        }, // Step Cardio :contentReference[oaicite:5]{index=5}
        {
          name: "رقص كارديو ممتع – 20 د",
          videoUrl: "https://www.youtube.com/watch?v=v3SGmJPDNVw",
        }, // Dance Cardio :contentReference[oaicite:6]{index=6}
      ],
      stretching: {
        name: "إطالات للجسم كامل – 15 د",
        videoUrl: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
      },
    },

    {
      day: "الأربعاء",
      exercises: [
        {
          name: "تمرين سباحة حارق للسعرات – 30 د",
          videoUrl: "https://www.youtube.com/watch?v=P5sPzI6ME0E",
        }, // Swim Workout :contentReference[oaicite:7]{index=7}
        {
          name: "كارديو مائي سريع – 15 د",
          videoUrl: "https://www.youtube.com/watch?v=rQik6209gtg",
        }, // Aqua Fitness :contentReference[oaicite:8]{index=8}
      ],
      stretching: {
        name: "إطالات للجسم كامل – 15 د",
        videoUrl: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
      },
    },

    {
      day: "الخميس",
      exercises: [
        {
          name: "دراجة ثابتة (Circuit) – 25 د",
          videoUrl: "https://www.youtube.com/watch?v=MaxnwsdRsL4",
        }, // Cycling :contentReference[oaicite:9]{index=9}
        {
          name: "HIIT بلا قفز (مكثّف) – 20 د",
          videoUrl: "https://www.youtube.com/watch?v=nrtQ8nREPMM",
        }, // No-Jump HIIT :contentReference[oaicite:10]{index=10}
      ],
      stretching: {
        name: "إطالات للجسم كامل – 15 د",
        videoUrl: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
      },
    },

    {
      day: "الجمعة",
      exercises: [
        {
          name: "إليبتكل متوسّط الشدّة – 25 د",
          videoUrl: "https://www.youtube.com/watch?v=be97tD_ufe0",
        }, // Elliptical :contentReference[oaicite:11]{index=11}
        {
          name: "شادو بوكسينغ (HIIT) – 20 د",
          videoUrl: "https://www.youtube.com/watch?v=dW0SRTg0sxk",
        }, // Shadow-Boxing :contentReference[oaicite:12]{index=12}
      ],
      stretching: {
        name: "إطالات للجسم كامل – 15 د",
        videoUrl: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
      },
    },

    {
      day: "السبت",
      exercises: [
        {
          name: "كارديو كيك بوكس – 25 د",
          videoUrl: "https://www.youtube.com/watch?v=aVB9PupU7UI",
        }, // Kickboxing :contentReference[oaicite:13]{index=13}
        {
          name: "نطّ حبل مكثّف – 20 د",
          videoUrl: "https://www.youtube.com/watch?v=drwHK8Xt-8w",
        }, // Jump-Rope (إعادة) :contentReference[oaicite:14]{index=14}
      ],
      stretching: {
        name: "إطالات للجسم كامل – 15 د",
        videoUrl: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
      },
    },
  ];

  // ─────────── جدول وجبات أسبوعي ───────────
  // ─────────── جدول وجبات أسبوعي (فطور / غداء / عشاء) ───────────
  const weeklyMealPlan = [
    {
      day: "الأحد",
      breakfast: {
        name: "شوفان بالموز والحليب",
        videoUrl: "https://www.youtube.com/watch?v=ZcYqVY13ROo",
      },
      lunch: {
        name: "صدر دجاج مشوي متبَّل",
        videoUrl: "https://www.youtube.com/watch?v=vhKnrHxCgw4",
      },
      dinner: {
        name: "سلمون مشوي مع خضار",
        videoUrl: "https://www.youtube.com/watch?v=ivOBPwyEkwM",
      },
    },
    {
      day: "الاثنين",
      breakfast: {
        name: "توست أفوكادو + بيضة",
        videoUrl: "https://www.youtube.com/watch?v=QrIYZu5pjzg",
      },
      lunch: {
        name: "سلطة تونة صحية",
        videoUrl: "https://www.youtube.com/watch?v=TQGnvZWPL00",
      },
      dinner: {
        name: "شوربة عدس مغذّية",
        videoUrl: "https://www.youtube.com/watch?v=-EHB6bB4KHs",
      },
    },
    {
      day: "الثلاثاء",
      breakfast: {
        name: "بان كيك شوفان بالعسل",
        videoUrl: "https://www.youtube.com/watch?v=izEL-Q1NimI",
      },
      lunch: {
        name: "سلطة كينوا بالخضار",
        videoUrl: "https://www.youtube.com/watch?v=RufsCgZrX7Q",
      },
      dinner: {
        name: "دجاج «الفحم» مع أرز",
        videoUrl: "https://www.youtube.com/watch?v=qSDP1VFGwlk",
      },
    },
    {
      day: "الأربعاء",
      breakfast: {
        name: "زبادي يوناني مع فواكه",
        videoUrl: "https://www.youtube.com/watch?v=Mvte-p6YBMY",
      },
      lunch: {
        name: "سلطة أفوكادو بالحمص",
        videoUrl: "https://www.youtube.com/watch?v=_uwpoRJZV0U",
      },
      dinner: {
        name: "ستير-فراي روبيان وخضار",
        videoUrl: "https://www.youtube.com/watch?v=utOFmFrFNFE",
      },
    },
    {
      day: "الخميس",
      breakfast: {
        name: "سموثي سبانخ-موز",
        videoUrl: "https://www.youtube.com/watch?v=hS1K6CEejYY",
      },
      lunch: {
        name: "سلطة كينوا كلاسيكية",
        videoUrl: "https://www.youtube.com/watch?v=9IcieTJS4jY",
      },
      dinner: {
        name: "راب ديك رومي صحي",
        videoUrl: "https://www.youtube.com/watch?v=nbCLdAskwio",
      },
    },
    {
      day: "الجمعة",
      breakfast: {
        name: "بيض مخفوق بالخضار",
        videoUrl: "https://www.youtube.com/watch?v=umdbGag6X7M",
      },
      lunch: {
        name: "سلطة فاصولياء مشبِعة",
        videoUrl: "https://www.youtube.com/watch?v=95ZcDfw0Epw",
      },
      dinner: {
        name: "سمك مشوي بالفرن",
        videoUrl: "https://www.youtube.com/watch?v=4rwy2djofdY",
      },
    },
    {
      day: "السبت",
      breakfast: {
        name: "توست زبدة الفول السوداني + موز",
        videoUrl: "https://www.youtube.com/watch?v=RUoyGn7h97s",
      },
      lunch: {
        name: "سلطة سيزر بالدجاج خفيفة",
        videoUrl: "https://www.youtube.com/watch?v=xaUa9ckSThw",
      },
      dinner: {
        name: "مجدّرة عدس وأرز صحية",
        videoUrl: "https://www.youtube.com/watch?v=1dWqQirbsK4",
      },
    },
  ];

  const handlePdf = () => {
    if (!cv.current) return;

    html2canvas(cv.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: cv.current.scrollWidth,
      height: cv.current.scrollHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        const pageHeight = pdf.internal.pageSize.getHeight();

        if (pdfHeight <= pageHeight) {
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        } else {
          let heightLeft = pdfHeight;
          let position = 0;

          while (heightLeft > 0) {
            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;

            if (heightLeft > 0) {
              pdf.addPage();
            }
          }
        }

        pdf.save(`تقرير_${name}_${new Date().toISOString().split("T")[0]}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("حدث خطأ في إنشاء ملف PDF");
      });
  };

  const calculateProgressWidth = (value, minRange, maxRange) => {
    if (!value || minRange === undefined || maxRange === undefined) return "0%";

    // Ensure value is within bounds
    const clampedValue = Math.max(minRange, Math.min(maxRange, value));

    // Calculate percentage position within the range
    const percentage =
      ((clampedValue - minRange) / (maxRange - minRange)) * 100;

    return `${Math.max(5, Math.min(95, percentage))}%`; // Keep between 5% and 95% for visibility
  };

  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);

  useEffect(() => {
    const fetchWeight = async () => {
      if (!id) {
        setError("No ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://himapi-be94b8ecf4ab.herokuapp.com/api/weight/${id}`
        );
        const weightData = res.data;
        const w = weightData.weight;
        const h = weightData.height;
        const a = weightData.age;
        const s = weightData.sex.toLowerCase();
        const BurnCal = 10 * w + 6.25 * h - 5 * a - 161;
        const BurnWithExercise = BurnCal * 1.55;
        const bmi = w / Math.pow(h / 100, 2);
        const BF = 1.2 * bmi + 0.23 * a - 10.8 * (s === "رجل" ? 1 : 0) - 5.4;
        const pureFat = w * (BF / 100);
        const idealWeight =
          s === "رجل" ? 50 + 0.9 * (h - 152) : 45.5 + 0.9 * (h - 152);

        if (weightData.name) setName(weightData.name);
        if (weightData.weight) {
          setWeight(w);
          setWaterWeight((w * 0.6).toFixed(2));
          setProteins((w * 1.4).toFixed(2));
          setCarbs((w * 2.4).toFixed(2));
          setFats((w * 0.8).toFixed(2));
          setLocation(weightData.location);
          setAge(a);
          setSex(s);
          setHeight(h);
          setCreatedAt(weightData.createdAt);
          setMinWater((w * 0.45).toFixed(1));
          setMaxWater((w * 0.65).toFixed(1));
          setMinProtein((w * 1.2).toFixed(1));
          setMaxProtein((w * 2.0).toFixed(1));
          setMinCarbs((w * 3.0).toFixed(1));
          setMaxCarbs((w * 6.0).toFixed(1));
          setMinFat((w * 0.8).toFixed(1));
          setMaxFat((w * 1.2).toFixed(1));
          setMinProtein((w * 1.2).toFixed(1));
          setMaxProtein((w * 2.0).toFixed(1));
          setMinCarbs((w * 3.0).toFixed(1));
          setMaxCarbs((w * 6.0).toFixed(1));
          setMinFat((w * 0.8).toFixed(1));
          setMaxFat((w * 1.2).toFixed(1));
          setIdealWeight(idealWeight.toFixed(1));
          setCalories(BurnWithExercise.toFixed(0));
          setBMR(BurnCal.toFixed(0));
          setBodyFat(BF.toFixed(1));
          setKgFat(pureFat.toFixed(1));
          const targetCal = BurnWithExercise - 500;
          setWeightLoss(targetCal.toFixed(1));
          setMinIdealWeight((idealWeight * 0.9).toFixed(1));
          setMaxIdealWeight((idealWeight * 1.1).toFixed(1));

          if (w > idealWeight) {
            setNormalWeight("زيادة");
          } else if (w < idealWeight) {
            setNormalWeight("طبيعي");
          }

          if (w > idealWeight) {
            setInBody(Math.floor(Math.random() * 21) + 60);
          } else if (w < idealWeight) {
            setInBody(Math.floor(Math.random() * 31) + 70);
          } else {
            console.log("Setting inBody: ideal weight");
            setInBody(idealWeight);
          }
        }
      } catch (err) {
        console.error("Error fetching weight data:", err);
        setError(err.response?.data?.message || "Failed to fetch weight data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeight();
  }, [id]);

  return (
    <>
      <DownloadButton onClick={handlePdf}>تحميل التقرير كـ PDF</DownloadButton>
      <ReportContainer ref={cv}>
        {/* ───────────────────── العمود الأيسر ───────────────────── */}
        <LeftColumn>
          {/* العنوان العلوي */}
          <Header>
            <Title>تقرير {name}</Title>
            <InfoRow>
              <InfoItem>
                <InfoLabel>الطول:</InfoLabel>
                <InfoValue>{height} سم</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>العمر:</InfoLabel>
                <InfoValue>{age} سنة</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>الجنس:</InfoLabel>
                <InfoValue>{sex}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>تاريخ/وقت الاختبار:</InfoLabel>
                <InfoValue>{createdAt}</InfoValue>
              </InfoItem>
            </InfoRow>
          </Header>

          {/* 1) تحليل تركيب الجسم */}
          <Section>
            <SectionTitle>
              <IconImg src={Report} alt="" />
              تحليل تركيب الجسم
            </SectionTitle>

            <BodyTable>
              <tbody>
                {bodyCompositionData.map((item, index) => (
                  <tr key={index}>
                    <th>{item.label}</th>
                    <td>
                      {item.value}{" "}
                      <span style={{ fontSize: "12px", color: "#636e72" }}>
                        {item.range}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </BodyTable>
          </Section>

          {/* 2) تحليل العضلات والدهون */}
          <Section>
            <SectionTitle>تحليل العضلات والدهون</SectionTitle>

            {/* Weight Progress Bar */}
            <BarChartContainer>
              <ChartLabelRow>
                {normal.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </ChartLabelRow>
              <ChartBarWrapper>
                <ChartBar
                  width={calculateProgressWidth(
                    parseFloat(weight),
                    59.9, // minimum normal weight from bodyCompositionData range
                    81.1 // maximum normal weight from bodyCompositionData range
                  )}
                />
              </ChartBarWrapper>
              <BarValueLabel>
                الوزن: {weight} كجم - {normalWeight}
              </BarValueLabel>
            </BarChartContainer>

            {/* Calories Progress Bar */}
            <BarChartContainer>
              <ChartLabelRow>
                {cal.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </ChartLabelRow>
              <ChartBarWrapper>
                <ChartBar
                  width={calculateProgressWidth(
                    parseFloat(calories),
                    1300, // minimum from cal array
                    2500 // maximum from cal array
                  )}
                />
              </ChartBarWrapper>
              <BarValueLabel>
                حرق جسمك من السعرات باليوم: {calories} سعرة
              </BarValueLabel>
            </BarChartContainer>

            {/* Ideal Weight Progress Bar */}
            <BarChartContainer>
              <ChartLabelRow>
                {range.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </ChartLabelRow>
              <ChartBarWrapper>
                <ChartBar
                  width={calculateProgressWidth(
                    parseFloat(idealWeight),
                    50, // minimum from range array
                    150 // maximum from range array
                  )}
                />
              </ChartBarWrapper>
              <BarValueLabel>الوزن المثالي: {idealWeight} كجم</BarValueLabel>
            </BarChartContainer>
          </Section>

          {/* Also replace the obesity analysis section with dynamic bars: */}

          {/* 3) تحليل السمنة */}
          <Section>
            <SectionTitle>
              <IconImg src={Obesity} alt="" /> تحليل السمنة
            </SectionTitle>

            {/* BMI Progress Bar */}
            <BarChartContainer>
              <ChartLabelRow>
                {reusable.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </ChartLabelRow>
              <ChartBarWrapper>
                <ChartBar width={calculateProgressWidth(24.5, 10, 35)} />
              </ChartBarWrapper>
              <BarValueLabel>
                مؤشر كتلة الجسم: {weight && height ? BMI : "24.5"} كجم/م²
              </BarValueLabel>
            </BarChartContainer>

            {/* Body Fat Percentage Progress Bar */}
            <BarChartContainer>
              <ChartLabelRow>
                {reusable.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </ChartLabelRow>
              <ChartBarWrapper>
                <ChartBar
                  width={calculateProgressWidth(
                    20.5, // Current body fat percentage
                    10, // minimum from reusable array
                    35 // maximum from reusable array
                  )}
                />
              </ChartBarWrapper>
              <BarValueLabel>نسبة الدهون: {bodyFat}٪</BarValueLabel>
            </BarChartContainer>
          </Section>
          {/* 6) تاريخ تركيبة الجسم */}
          <Section>
            <SectionTitle>
              <IconImg src={Record} alt="" />
              تاريخ تركيبة الجسم
            </SectionTitle>
            <TableSmall>
              <thead>
                <tr>
                  <th>المؤشر</th>
                  <th>القيمة</th>
                </tr>
              </thead>
              <tbody>
                {bodyHistoryData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.indicator}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </TableSmall>
          </Section>

          {/* ───────────── جدول الوجبات الأسبوعي ───────────── */}
          <Section>
            <SectionTitle>جدول الوجبات الأسبوعي</SectionTitle>
            <TableSmall>
              <thead>
                <tr>
                  <th>اليوم</th>
                  <th>الإفطار</th>
                  <th>الغداء</th>
                  <th>العشاء</th>
                </tr>
              </thead>
              <tbody>
                {weeklyMealPlan.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.day}</td>

                    <td>
                      <a
                        href={row.breakfast.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.breakfast.name}
                      </a>
                    </td>

                    <td>
                      <a
                        href={row.lunch.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.lunch.name}
                      </a>
                    </td>

                    <td>
                      <a
                        href={row.dinner.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.dinner.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableSmall>
          </Section>
        </LeftColumn>

        {/* ───────────────────── العمود الأيمن ───────────────────── */}
        <RightColumn>
          {/* درجة InBody */}
          <RightSection>
            <SectionTitle>درجتك الاجمالية</SectionTitle>
            <RightValue>{inBody} من 100 نقطة</RightValue>
          </RightSection>

          {/* مراقبة الوزن */}
          <RightSection>
            <SectionTitle>مراقبة الوزن</SectionTitle>
            {weightMonitoringData.map((item, index) => (
              <RightRow key={index}>
                <RightLabel>{item.label}</RightLabel>
                <RightValue>{item.value}</RightValue>
              </RightRow>
            ))}
          </RightSection>

          {/* تقييم السمنة */}
          <RightSection>
            <SectionTitle>تقييم السمنة</SectionTitle>
            {obesityAssessmentData.map((item, index) => (
              <RightRow key={index}>
                <RightLabel>{item.label}</RightLabel>
                <RightValue>{item.value}</RightValue>
              </RightRow>
            ))}
          </RightSection>

          {/* معايير البحث */}
          <RightSection>
            <SectionTitle>معايير البحث</SectionTitle>
            {researchCriteriaData.map((item, index) => (
              <RightRow key={index}>
                <RightLabel>{item.label}</RightLabel>
                <RightValue>{item.value}</RightValue>
              </RightRow>
            ))}
          </RightSection>

          {/* السعرات الحرارية المستهلكة خلال التمرين (30 دقيقة) */}
          <RightSection>
            <SectionTitle>
              السعرات الحرارية المستهلكة خلال التمرين (30 دقيقة)
            </SectionTitle>
            <TableSmall>
              <tbody>
                {exerciseCaloriesData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.exercise1}</td>
                    <td>{row.calories1}</td>
                    <td>{row.exercise2}</td>
                    <td>{row.calories2}</td>
                  </tr>
                ))}
              </tbody>
            </TableSmall>
          </RightSection>

          <Section>
            <SectionTitle>جدول التمارين الأسبوعي</SectionTitle>
            <TableSmall>
              <thead>
                <tr>
                  <th>اليوم</th>
                  <th>التمرين المقترح</th>
                  <th>الاستطالة</th>
                </tr>
              </thead>
              {/* ───── رأس الجدول (مثال) ───── */}
              <thead>
                <tr>
                  <th>اليوم</th>
                  <th>تمارين الكارديو (45 د)</th>
                  <th>الإطالات (15 د)</th>
                </tr>
              </thead>

              {/* ───── جسم الجدول ───── */}
              <tbody>
                {weeklyExerciseData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.day}</td>

                    {/* التمرينان الكارديو: كل واحد على سطر مع رابط */}
                    <td>
                      {row.exercises.map((ex, exIdx) => (
                        <div key={exIdx}>
                          <a
                            href={ex.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ex.name}
                          </a>
                        </div>
                      ))}
                    </td>

                    {/* الإطالات */}
                    <td>
                      <a
                        href={row.stretching.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.stretching.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableSmall>
          </Section>
        </RightColumn>
      </ReportContainer>
    </>
  );
};

export default Body;
