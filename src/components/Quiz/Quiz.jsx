// File: src/components/Quiz/Quiz.jsx

/*
 * DETAILED EXPLANATION
 * --------------------
 * This component creates a simple personality quiz UI that replaces the original Main component.
 *
 * Key changes from the original:
 * 1. Renamed the component from Main to Quiz
 * 2. Changed styled components names to be more descriptive for quiz functionality
 * 3. Added state management for quiz questions and user answers
 * 4. Added functionality to track progress and show results
 * 5. Maintained the same general structure with two wrapper sections
 *
 * The component maintains the same visual structure as the original but repurposes it
 * as an interactive quiz rather than a static banner display.
 */

import React, { useState } from "react";
import {
  QuizContainer,
  QuizHeading,
  QuizSubContainer,
  QuizWrapper,
  QuizParagraph,
  QuizImage,
  QuizMain,
  QuizSeparator,
  QuizOption,
  QuizButton,
  QuizResult,
} from "./Quiz.elements";
import QuizBanner from "../../assets/drslallum.png"; // Assuming you have this image

const questions = [
  {
    question: "كيف تتفاعل عادة في المواقف الاجتماعية الجديدة؟",
    options: [
      "أتحدث مع الجميع وأستمتع بالتعرف على أشخاص جدد",
      "أفضل التحدث مع أشخاص محددين والاستماع أكثر",
      "أشعر بالراحة مع الأصدقاء المقربين فقط",
      "أفضل تجنب المواقف الاجتماعية الكبيرة",
    ],
    isCorrect: "أشعر بالراحة مع الأصدقاء المقربين فقط",
  },
  {
    question: "كيف تتخذ قراراتك المهمة؟",
    options: [
      "بناء على المشاعر والحدس",
      "بناء على المنطق والتحليل",
      "مزيج من المشاعر والمنطق",
      "استشارة الآخرين دائماً",
    ],
    isCorrect: "مزيج من المشاعر والمنطق",
  },
  // You would add more questions here
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex) => {
    setAnswer([...answer, answerIndex]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setAnswer([]);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    return answer.reduce((score, ansIndex, idx) => {
      const selected = questions[idx].options[ansIndex];
      return selected === questions[idx].isCorrect ? score + 1 : score;
    }, 0);
  };

  return (
    <QuizMain>
      <QuizImage src={QuizBanner} alt="Quiz Banner" />
      <QuizContainer>
        <QuizSubContainer>
          {!showResults ? (
            <>
              <QuizHeading>اختبار الشخصية</QuizHeading>
              <QuizSeparator></QuizSeparator>
              <QuizParagraph>
                {questions[currentQuestion].question}
              </QuizParagraph>

              {/* Map through the options for the current question */}
              {questions[currentQuestion].options.map((item, index) => (
                <QuizOption key={index} onClick={() => handleAnswer(index)}>
                  {item}
                </QuizOption>
              ))}

              <QuizParagraph>
                السؤال {currentQuestion + 1} من {questions.length}
              </QuizParagraph>
            </>
          ) : (
            <>
              <QuizHeading>نتيجة الاختبار</QuizHeading>
              <QuizSeparator></QuizSeparator>
              <QuizResult>
                لقد حصلت على {calculateScore()} من {questions.length} إجابات
                صحيحة
              </QuizResult>
              <QuizParagraph>
                شكراً لإكمال الاختبار! اكتشف المزيد عن شخصيتك وكيفية التعامل
                معها.
              </QuizParagraph>
              <QuizButton onClick={resetQuiz}>إعادة الاختبار</QuizButton>
            </>
          )}
        </QuizSubContainer>
      </QuizContainer>
    </QuizMain>
  );
};

export default Quiz;
