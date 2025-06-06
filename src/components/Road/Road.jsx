import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Clock from "../../assets/clock.png";
import Back from "../../assets/back.png";
import Logo from "../../assets/logo.png";
import Lock from "../../assets/lock.png";

// Styled Components with responsive adjustments
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  background-color: #fefcf8;
  padding: 1rem;
  font-family: sans-serif;
  color: #1f2937;
  direction: rtl;

  @media (max-width: 640px) {
    padding: 0.75rem;
  }
`;
const TopCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px 0;
  @media (max-width: 640px) {
    padding: 0.75rem;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: fefcf8;
  border-radius: 1rem;

  padding: 1.5rem;

  @media (max-width: 640px) {
    padding: 1rem;
    border-radius: 0.75rem;
    max-width: 100%;
  }
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 3rem;
  width: 100%;

  @media (max-width: 640px) {
    margin-bottom: 2rem;
  }
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  background-color: #e16e42;
  border-radius: 9999px;
  transition: width 0.5s ease;
  width: ${(props) => props.progress}%;
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const QuestionTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 35px;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 24px;
    margin-bottom: 35px;
  }
`;

const OptionsList = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

// after:
const Img = styled.img`
  width: ${({ width }) => width || "24px"};
  height: ${({ height, width }) => height || width || "24px"};

  @media (max-width: 640px) {
    width: ${({ mobileWidth, width }) => mobileWidth || width || "24px"};
    height: ${({ mobileHeight, height, mobileWidth, width }) =>
      mobileHeight || mobileWidth || height || width || "24px"};
  }
`;

const TimerCon = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  justify-content: center;
  align-item: center;
  border-radius: 8px;
  background-color: #eeebf7;
  color: #4a2f98;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;
const BackCon = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  justify-content: center;
  align-item: center;
  border-radius: 8px;
  color: #000;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

const OptionButton = styled.button`
  width: 100%;
  text-align: right;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
  border-color: ${(props) => (props.selected ? "#e16e42" : "#e5e7eb")};
  background-color: ${(props) => (props.selected ? "white" : "white")};
  color: ${(props) => (props.selected ? "#e16e42" : "inherit")};

  &:hover {
    border-color: #e16e42;
    background-color: ${(props) => (props.selected ? "#f0fdf4" : "#f9fafb")};
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  text-align: right;
  direction: rtl;
  background-color: #fff;
  color: #000;

  &:focus {
    outline: none;
    border-color: #e16e42;
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  height: 8rem;
  text-align: right;
  direction: rtl;

  &:focus {
    outline: none;
    border-color: #e16e42;
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
    height: 6rem;
    font-size: 0.9rem;
  }
`;

const BottomWrapper = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 10;
`;

const LockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const NextButton = styled.button`
  width: calc(100% - 2rem);
  max-width: 28rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: white;
  background-color: ${(props) => (props.disabled ? "#e16e42" : "#e16e42")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  z-index: 10;

  &:hover:not(:disabled) {
    background-color: #e16e42;
    transform: translate(-50%, -0.25rem);
  }

  &:active:not(:disabled) {
    transform: translate(-50%, 0);
  }

  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
`;

// Enhanced questions array with Arabic translations
const questions = [
  {
    id: "helpWith",
    question: "بماذا يمكننا مساعدتك اليوم؟",
    type: "multipleChoice",
    options: [
      "داء السكري أو ما قبل السكري",
      "اضطراب في الأكل",
      "الأكل العاطفي",
    ],
  },
  {
    id: "additionalHelp",
    question: "كيف يمكننا مساعدتك أيضًا؟",
    type: "multipleChoice",
    options: [
      "إدارة الوزن",
      "تغذية أفضل",
      "تحسين مستويات الطاقة",
      "إدارة الحالة الصحية",
    ],
  },
  {
    id: "activityLevel",
    question: "ما هو مستوى نشاطك الحالي؟",
    type: "multipleChoice",
    options: [
      "أنا نشيط جدًا",
      "أنا نشيط بشكل معتدل",
      "أنا لست نشيطًا كثيرًا",
      "أنا خامل",
    ],
  },
  {
    id: "birthSex",
    question: "ما هو جنسك عند الولادة؟",
    type: "input",
    placeholder: "أدخل جنسك عند الولادة",
  },
  {
    id: "eatingHabits",
    question: "كيف تصف عاداتك الغذائية؟",
    type: "multipleChoice",
    options: [
      "وجبات منتظمة",
      "وجبات خفيفة متكررة",
      "أنماط غير منتظمة",
      "أكل مقيد",
    ],
  },
  {
    id: "supportAreas",
    question: "في أي المجالات ترغب في الحصول على مزيد من الدعم؟",
    type: "multipleChoice",
    options: [
      "المساءلة",
      "حمية الاستبعاد",
      "التمارين الرياضية",
      "الطب الوظيفي",
      "الأكل الحدسي",
      "تخطيط الوجبات",
      "تخصيص العناصر الغذائية الكبيرة",
      "العلاقة مع الطعام",
    ],
  },
  {
    id: "birthDate",
    question: "متى ولدت؟",
    type: "input",
    placeholder: "يوم/شهر/سنة",
  },
  {
    id: "phoneNumber",
    question: "ما هو رقم هاتفك؟",
    type: "input",
    placeholder: "أدخل رقم هاتفك",
  },
  {
    id: "additionalDetails",
    question: "يرجى مشاركة أي تفاصيل أخرى حول ما تأمل في تحقيقه مع التغذية",
    type: "textArea",
    placeholder: "شارك أفكارك هنا...",
  },
];

const Road = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(600);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const formateTimer = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (index) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]:
        questions[currentQuestion].options[index],
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleNext = () => {
    // For input and textarea questions, save the input value
    if (
      questions[currentQuestion].type === "input" ||
      questions[currentQuestion].type === "textArea"
    ) {
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: inputValue,
      });
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setInputValue(""); // Reset input value for next question
    } else {
      // Handle questionnaire completion
      console.log("Questionnaire completed:", answers);
      alert("تم إكمال الاستبيان! تحقق من وحدة التحكم للنتائج.");
    }
  };

  const isNextDisabled = () => {
    const questionType = questions[currentQuestion].type;

    if (questionType === "multipleChoice") {
      return answers[questions[currentQuestion].id] === undefined;
    } else if (questionType === "input" || questionType === "textArea") {
      return inputValue.trim() === "";
    }

    return true;
  };

  const renderQuestionContent = () => {
    const currentQ = questions[currentQuestion];

    switch (currentQ.type) {
      case "multipleChoice":
        return (
          <OptionsList>
            {currentQ.options.map((item, index) => (
              <OptionButton
                key={index}
                selected={answers[currentQ.id] === item}
                onClick={() => handleOptionSelect(index)}
              >
                {item}
              </OptionButton>
            ))}
          </OptionsList>
        );

      case "input":
        return (
          <Input
            type="text"
            placeholder={currentQ.placeholder}
            value={inputValue}
            onChange={handleInputChange}
          />
        );

      case "textArea":
        return (
          <TextArea
            placeholder={currentQ.placeholder}
            value={inputValue}
            onChange={handleInputChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Card>
        <TopCon>
          <TimerCon>
            <Img src={Clock} alt="" />
            <div>{formateTimer(timer)}</div>
          </TimerCon>
          <Img src={Logo} alt="" width="34px" />
          <BackCon>
            رجوع
            <span>
              <Img src={Back} alt="" />
            </span>
          </BackCon>
        </TopCon>
        <ProgressBarContainer>
          <ProgressBarOuter>
            <ProgressBarInner progress={progress} />
          </ProgressBarOuter>
        </ProgressBarContainer>

        {/* Question title */}
        <QuestionTitle>{questions[currentQuestion].question}</QuestionTitle>

        {/* Question content (options or input field) */}
        {renderQuestionContent()}

        {/* Next button */}
        <BottomWrapper>
          <NextButton disabled={isNextDisabled()} onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? "متابعة" : "إكمال"}
          </NextButton>
          <LockInfo>
            <div>نتعامل مع معلوماتك بسرية تامة</div>
            <Img src={Lock} alt="" width="14px" />
          </LockInfo>
        </BottomWrapper>
      </Card>
    </Container>
  );
};

export default Road;
