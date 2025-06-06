// Quiz.jsx
import React, { useState, useEffect, useRef } from "react";

import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearCart } from "../../redux/cartRedux";
import Basket from "../../assets/cart.png";
import Woman2 from "../../assets/woman2.webp";

import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  LoadingWrap,
  WrapperForm,
  ProgressHeader,
  LogoCon,
  BasketImg,
  BackCon,
  ProgressTitle,
  BasketContainer,
  BasketIconWrapper,
  BasketCount,
  BasketTotal,
  AddedMessageNotification,
  ProgressCon,
  ProgressSub,
  ProgressMeter,
  QueCon,
  QueTitCon,
  QueTit,
  AnsCon,
  AnsSub,
  AnsBtnCon,
  AnsBtn,
  InfoHeader,
  TextInput,
  Footer,
  FooterBtn,
  FooterSub,
  ContentContainer,
  InfoSubheader,
  InfoCard,
  InfoCardTitle,
  InfoCardContent,
  FactBox,
  FactTitle,
  ChartImage,
  ResultHeader,
  ProductsContainer,
  ProductCard,
  ProductImage,
  ProductName,
  ProductPrice,
  OriginalPrice,
  DiscountTag,
  AddButton,
  OrderSummaryContainer,
  OrderSummaryTitle,
  OrderSummaryItems,
  OrderItem,
  OrderItemName,
  OrderItemDetails,
  OrderTotalContainer,
  OrderTotalText,
  SubmitOrderButton,
  InfoImg,
} from "./Recommendation.elements";

const questions = [
  {
    id: "name",
    question: "ما اسمك؟",
    type: "text",
    options: [],
  },
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
  {
    id: "email",
    question: "ما بريدك الإلكتروني؟",
    type: "text",
    options: [],
  },
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

const getCurrentQuestionProps = (questionIndex) => {
  const currentQ = questions[questionIndex];
  return {
    currentQ,
    isMultiSelect: currentQ?.multiSelect,
    isTextInput: currentQ?.type === "text",
  };
};

const Recommendation = () => {
  const buttonRef = useRef();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentBreak, setCurrentBreak] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedSingleAnswer, setSelectedSingleAnswer] = useState("");
  const [textInput, setTextInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [flowStep, setFlowStep] = useState("intro");
  const [addedMessage, setAddedMessage] = useState("");
  const [shakeBasket, setShakeBasket] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basketItems = useSelector((state) => state.cart?.products || []);
  const basketTotal = useSelector((state) => state.cart?.total || 0);
  const basketCount = basketItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Function to submit order with patient data and products
  const submitOrder = async () => {
    if (basketItems.length === 0) {
      alert("لا توجد منتجات في السلة");
      return;
    }

    setOrderSubmitting(true);

    try {
      const orderData = {
        patientData: {
          answers: answers,
          timestamp: new Date().toISOString(),
          questionnaireCompleted: true,
        },
        products: basketItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          description: item.description,
        })),
        orderSummary: {
          totalItems: basketCount,
          totalAmount: basketTotal,
          currency: "USD",
        },
        orderDate: new Date().toISOString(),
        status: "pending",
      };

      const orderResponse = await publicRequest.post("/orders", orderData);

      if (orderResponse.data) {
        // Order submitted successfully
        setAddedMessage("تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.");

        // Navigate to checkout or confirmation page after 2 seconds
        setTimeout(() => {
          navigate("/outcome", {
            state: {
              orderId: orderResponse.data._id,
              orderData: orderData,
            },
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setAddedMessage("حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setOrderSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (flowStep) {
      case "intro":
        return (
          <>
            <ContentContainer centered>
              <InfoHeader>استكشف خطط فقدان الوزن.</InfoHeader>
              <InfoSubheader>
                تعرّف على خيارات العلاج بناءً على أهدافك وعاداتك وتاريخك الصحي.
              </InfoSubheader>
            </ContentContainer>
          </>
        );

      case "quiz":
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
                  currentQ.options.map((option, index) => (
                    <AnsBtnCon key={index}>
                      <AnsBtn
                        selected={
                          isMultiSelect
                            ? selectedAnswers.includes(option)
                            : selectedSingleAnswer === option
                        }
                        onClick={() => {
                          if (isMultiSelect) {
                            handleMultiSelectToggle(option);
                          } else {
                            handleSingleAnswer(option);
                          }
                        }}
                      >
                        {isMultiSelect &&
                          selectedAnswers.includes(option) &&
                          "✓ "}
                        {option}
                      </AnsBtn>
                    </AnsBtnCon>
                  ))
                )}
              </AnsSub>
            </AnsCon>
          </QueCon>
        );

      case "breakInfo":
        const currentB = infoBreaks[currentBreak];
        return (
          <>
            <ContentContainer>
              <InfoCard>
                <InfoCardTitle>{currentB.title}</InfoCardTitle>
                <InfoCardContent>
                  <p>{currentB.content}</p>
                  <FactBox>
                    <FactTitle>هل تعلم؟</FactTitle>
                    <p>{currentB.fact}</p>
                  </FactBox>
                </InfoCardContent>
                <InfoImg src={currentB.img} alt={currentB.title} />
              </InfoCard>
            </ContentContainer>
          </>
        );

      case "result":
        return (
          <>
            <ContentContainer>
              <ProductsContainer>
                {products.length > 0 ? (
                  products.map((product) => {
                    const isInBasket = basketItems.some(
                      (item) => item._id === product._id
                    );
                    const basketItem = basketItems.find(
                      (item) => item._id === product._id
                    );

                    return (
                      <ProductCard key={product._id}>
                        <ProductImage
                          src={product.img || "https://via.placeholder.com/150"}
                          alt={product.name}
                        />
                        <ProductName>{product.name}</ProductName>
                        <ProductPrice>
                          ${product.price?.toFixed(2)}
                          {product.oldPrice && (
                            <>
                              <OriginalPrice>
                                ${product.oldPrice.toFixed(2)}
                              </OriginalPrice>
                              {product.discount && (
                                <DiscountTag>
                                  {product.discount}% OFF
                                </DiscountTag>
                              )}
                            </>
                          )}
                        </ProductPrice>
                        <AddButton
                          onClick={() => handleAddToBasket(product)}
                          disabled={!product.inStock}
                          isInBasket={isInBasket}
                        >
                          {!product.inStock
                            ? "غير متوفر"
                            : isInBasket
                            ? `اضافة المنتج مجدداً (${
                                basketItem?.quantity || 0
                              })`
                            : "إضافة للسلة"}
                        </AddButton>
                      </ProductCard>
                    );
                  })
                ) : (
                  <p>لم تتطابق أي منتجات مع ملفك الشخصي. جرب تعديل إجاباتك.</p>
                )}
              </ProductsContainer>

              {/* Order Summary and Submit Button */}
              {basketItems.length > 0 && (
                <OrderSummaryContainer>
                  <OrderSummaryTitle>ملخص الطلب</OrderSummaryTitle>
                  <OrderSummaryItems>
                    {basketItems.map((item) => (
                      <OrderItem key={item._id}>
                        <OrderItemName>{item.name}</OrderItemName>
                        <OrderItemDetails>
                          الكمية: {item.quantity} × ${item.price.toFixed(2)}
                        </OrderItemDetails>
                      </OrderItem>
                    ))}
                  </OrderSummaryItems>
                  <OrderTotalContainer>
                    <OrderTotalText>
                      الإجمالي: ${basketTotal.toFixed(2)}
                    </OrderTotalText>
                  </OrderTotalContainer>
                  <SubmitOrderButton
                    onClick={submitOrder}
                    disabled={orderSubmitting}
                  >
                    {orderSubmitting ? "جارٍ إرسال الطلب..." : "إرسال الطلب"}
                  </SubmitOrderButton>
                </OrderSummaryContainer>
              )}
            </ContentContainer>
          </>
        );
      default:
        return null;
    }
  };

  if (Loading) {
    return <LoadingWrap>جارٍ التحميل...</LoadingWrap>;
  }

  const handleSingleAnswer = (selectedAnswer) => {
    buttonRef.current?.blur();
    setSelectedSingleAnswer(selectedAnswer);
  };

  const handleMultiSelectToggle = (option) => {
    buttonRef.current?.blur();

    setSelectedAnswers((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
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
        newAnswers = {
          ...answers,
          [currentQ.id]: textInput,
        };
      } else if (isMultiSelect) {
        if (selectedAnswers.length === 0) return;
        newAnswers = {
          ...answers,
          [currentQ.id]: selectedAnswers,
        };
      } else {
        if (!selectedSingleAnswer) return;
        newAnswers = {
          ...answers,
          [currentQ.id]: selectedSingleAnswer,
        };
      }

      setAnswers(newAnswers);

      setSelectedAnswers([]);
      setSelectedSingleAnswer("");
      setTextInput("");

      const nextQuestion = currentQuestion + 1;
      const shouldShowBreak =
        nextQuestion % 3 === 0 && nextQuestion < questions.length;

      if (shouldShowBreak) {
        const breakIndex = Math.floor((nextQuestion - 1) / 3);
        if (breakIndex < infoBreaks.length) {
          setCurrentBreak(breakIndex);
          setFlowStep("breakInfo");
          setCurrentQuestion(nextQuestion);
        } else {
          if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
          } else {
            fetchRecommendedProducts(newAnswers);
          }
        }
      } else {
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          fetchRecommendedProducts(newAnswers);
        }
      }
    }
  };

  const goToPrevious = () => {
    if (flowStep === "quiz" && currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      const prevQ = questions[currentQuestion - 1];
      if (answers[prevQ.id]) {
        if (prevQ.multiSelect) {
          setSelectedAnswers(answers[prevQ.id]);
        } else if (prevQ.type === "text") {
          setTextInput(answers[prevQ.id]);
        } else {
          setSelectedSingleAnswer(answers[prevQ.id]);
        }
      } else {
        setSelectedAnswers([]);
        setSelectedSingleAnswer("");
        setTextInput("");
      }
    } else if (flowStep === "breakInfo") {
      setFlowStep("quiz");
    } else if (flowStep === "quiz" && currentQuestion === 0) {
      setFlowStep("intro");
    }
  };

  const progressPercentage =
    flowStep === "intro"
      ? 0
      : ((currentQuestion + (flowStep === "breakInfo" ? 1 : 0)) /
          questions.length) *
        100;

  const canContinue = () => {
    if (flowStep === "intro" || flowStep === "breakInfo") {
      return true;
    }

    if (flowStep === "quiz") {
      const currentQ = questions[currentQuestion];
      const isMultiSelect = currentQ?.multiSelect;
      const isTextInput = currentQ?.type === "text";

      if (isTextInput) {
        return textInput.trim().length > 0;
      } else if (isMultiSelect) {
        return selectedAnswers.length > 0;
      } else {
        return selectedSingleAnswer !== "";
      }
    }

    return false;
  };

  const canGoBack = () => {
    if (flowStep === "intro") {
      return false;
    }
    if (flowStep === "breakInfo") {
      return true;
    }
    if (flowStep === "quiz") {
      return currentQuestion > 0 || flowStep !== "intro";
    }
    return false;
  };

  const getRecommendedProduct = (userAnswers) => {
    const productOptions = {
      cardioImprovement: {
        _id: "cardio-improvement-program",
        name: "برنامج تحسين القلب والأوعية الدموية",
        price: 119.99,
        oldPrice: 159.99,
        discount: 25,
        img: "https://via.placeholder.com/200x200/96CEB4/ffffff?text=Cardio+Health",
        inStock: true,
        description: "مكملات لتعزيز صحة القلب وتحسين الأداء القلبي الوعائي",
        category: "cardio-improvement",
      },
      muscleGain: {
        _id: "muscle-gain-program",
        name: "برنامج بناء العضلات",
        price: 179.99,
        oldPrice: 229.99,
        discount: 22,
        img: "https://via.placeholder.com/200x200/45B7D1/ffffff?text=Muscle+Gain",
        inStock: true,
        description:
          "مجموعة متكاملة من البروتينات والأحماض الأمينية لبناء العضلات",
        category: "muscle-gain",
      },
      weightLoss: {
        _id: "weight-loss-program",
        name: "برنامج فقدان الوزن المتقدم",
        price: 149.99,
        oldPrice: 199.99,
        discount: 25,
        img: "https://via.placeholder.com/200x200/FF6B6B/ffffff?text=Weight+Loss",
        inStock: true,
        description:
          "برنامج شامل لفقدان الوزن يشمل مكملات طبيعية وخطة غذائية مخصصة",
        category: "weight-loss",
      },
      weightGain: {
        _id: "weight-gain-program",
        name: "برنامج زيادة الوزن الصحي",
        price: 129.99,
        oldPrice: 169.99,
        discount: 24,
        img: "https://via.placeholder.com/200x200/4ECDC4/ffffff?text=Weight+Gain",
        inStock: true,
        description: "مكملات غذائية عالية السعرات لزيادة الوزن بطريقة صحية",
        category: "weight-gain",
      },
    };

    const weightAnswer = userAnswers.weight;

    switch (weightAnswer) {
      case "المساعدة في تحسين القلب والأوعية الدموية":
        return productOptions.cardioImprovement;
      case "المساعدة في كسب العضلات":
        return productOptions.muscleGain;
      case "المساعدة في فقدان الوزن":
        return productOptions.weightLoss;
      case "المساعدة في كسب الوزن":
        return productOptions.weightGain;
      default:
        return productOptions.cardioImprovement;
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
      const fallbackProduct = getRecommendedProduct({});
      setProducts([fallbackProduct]);
      setFlowStep("result");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToBasket = (product) => {
    dispatch(
      addProduct({
        ...product,
        quantity: 1,
      })
    );

    setAddedMessage(`تم إضافة "${product.name}" إلى سلتك!`);
    setShakeBasket(true);

    setTimeout(() => {
      setAddedMessage("");
      setShakeBasket(false);
    }, 2500);
  };

  const BasketIcon = () => (
    <BasketContainer className={shakeBasket ? "shake" : ""}>
      <BasketIconWrapper>
        <img
          src={Basket}
          alt="Shopping Cart"
          style={{ width: "24px", height: "24px" }}
        />
        {basketCount > 0 && (
          <BasketCount>{basketCount > 99 ? "99+" : basketCount}</BasketCount>
        )}
      </BasketIconWrapper>
      {basketCount > 0 && (
        <BasketTotal>ريال{basketTotal.toFixed(2)}</BasketTotal>
      )}
    </BasketContainer>
  );
  return (
    <Wrapper>
      <WrapperForm onSubmit={(e) => e.preventDefault()}>
        <ProgressHeader>
          <ProgressCon>
            <ProgressTitle>
              <BackCon
                disabled={!canGoBack()}
                onClick={canGoBack() ? goToPrevious : undefined}
              >
                رجوع
              </BackCon>
              <LogoCon>🏥</LogoCon>
              <BasketIcon />
            </ProgressTitle>
            <ProgressSub>
              <ProgressMeter progress={progressPercentage}></ProgressMeter>
            </ProgressSub>
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
