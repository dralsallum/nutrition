import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, clearCart } from "../../redux/cartRedux";
import Cross from "../../assets/crossFirst.png";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  padding: 10px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  direction: rtl;
  text-align: right;
  background-color: #edf4f7;
  @media (max-width: 768px) {
    margin: 10px;
    padding: 8px;
  }
`;

const CheckoutWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 0 0.5rem;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CheckoutTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const LoginPrompt = styled.p`
  font-size: 0.95rem;
  color: #666;
  a {
    color: #ff7143;
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: -1rem;
`;

const CheckoutContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 1.5rem;
  }
`;

const BillingColumn = styled.div`
  flex: 3;
  margin-right: 2rem;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1.5rem;
    order: 2;
    width: 100%;
  }
`;

const BillingInfo = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BillingTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #444;
    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }
  input,
  select {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.75rem;
    font-size: 1rem;
    color: #333;
    @media (max-width: 768px) {
      font-size: 0.95rem;
      padding: 0.65rem;
    }
  }
`;

const TermsCheckbox = styled.div`
  margin-top: 1rem;
  label {
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
    input {
      margin-left: 0.5rem;
      margin-right: 0;
    }
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
  a {
    color: #ff7143;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const OrderSummary = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) {
    order: 1;
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #444;
  strong {
    color: #333;
  }
  @media (max-width: 768px) {
    font-size: 0.95rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CrossIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    margin-right: 0;
  }
`;

const CouponWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 0 6px 6px 0;
    padding: 0.75rem;
    font-size: 1rem;
    @media (max-width: 768px) {
      font-size: 0.95rem;
      padding: 0.65rem;
    }
  }
  button {
    background: #ff7143;
    color: #fff;
    border: none;
    padding: 0 1rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 6px 0 0 6px;
    font-size: 1rem;
    &:hover {
      opacity: 0.9;
    }
    @media (max-width: 768px) {
      font-size: 0.95rem;
      padding: 0 0.75rem;
    }
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BuyNowButton = styled.button`
  background: #ff7143;
  color: #fff;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    padding: 0.75rem;
  }
`;

const Spinner = styled.div`
  border: 2px solid #fff;
  border-top: 2px solid #ff7143;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
const MainInput = styled.input`
  background-color: #fff;

  @media (max-width: 768px) {
  }
`;
const Main = styled.div`
  background-color: #fff;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
const MainSelect = styled.select`
  background-color: #fff;

  @media (max-width: 768px) {
  }
`;

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("المملكة العربية السعودية");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(""); // "uploading" or "processing"

  // =============== NEW: Refs for each form field ===============
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const termsRef = useRef(null);
  // ============================================================

  // Remove a product from cart
  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  // Validate the billing form and cart state
  const validateForm = () => {
    // Check Email
    if (!email) {
      setErrorMessage("يرجى تعبئة حقل البريد الإلكتروني.");
      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    // Check Name
    if (!name) {
      setErrorMessage("يرجى تعبئة حقل الاسم الكامل.");
      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    // Check Country (already has a default but let's just be safe)
    if (!country) {
      setErrorMessage("يرجى اختيار الدولة.");
      return false; // You could scroll to country if needed, but it's a select with a default
    }
    // Check City
    if (!city) {
      setErrorMessage("يرجى تعبئة حقل المدينة.");
      cityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    // Check Street
    if (!street) {
      setErrorMessage("يرجى تعبئة حقل عنوان الشارع.");
      streetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    }
    // Check Terms
    if (!termsAccepted) {
      setErrorMessage("يرجى الموافقة على الشروط والأحكام للمتابعة.");
      termsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    // Check Cart
    if (cart.products.length === 0) {
      setErrorMessage("سلة التسوق فارغة. يرجى إضافة منتجات للمتابعة.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Combined handler: first submit order info then proceed to Tap payment
  const handleCheckout = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setCurrentStep("uploading");

    // Save cart details before clearing them
    const orderTotal = cart.total;
    const orderProducts = cart.products;

    try {
      // Prepare order data
      const orderData = {
        userId: localStorage.getItem("userId") || "guestUser",
        products: orderProducts.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        })),
        amount: orderTotal,
        address: {
          country,
          city,
          street,
          email,
          name,
        },
        status: "pending",
      };

      // Submit order information
      const orderResponse = await publicRequest.post("/orders", orderData);
      if (orderResponse.data) {
        // Order submitted successfully
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setErrorMessage("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
      setLoading(false);
      return;
    }

    // Proceed to Tap payment
    setCurrentStep("processing");
    try {
      const payload = {
        amount: orderTotal,
        currency: "SAR",
        items: orderProducts.map((product) => ({
          name: product.title,
          quantity: product.quantity,
          unit_price: product.price,
        })),
      };

      const tapResponse = await publicRequest.post("/tap-charge", payload);
      if (tapResponse.data?.transaction?.url) {
        // Clear the cart only after successful tap charge creation
        dispatch(clearCart());
        window.location.href = tapResponse.data.transaction.url;
        return;
      } else {
        console.error("Tap charge creation failed:", tapResponse.data);
        setErrorMessage("فشل إنشاء عملية الدفع. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in Tap payment:", error);
      setErrorMessage("حدث خطأ أثناء معالجة الدفع مع Tap.");
      setLoading(false);
    }
  };

  return (
    <Main>
      <PageContainer>
        <CheckoutWrapper>
          <TitleRow>
            <CheckoutTitle>الدفع</CheckoutTitle>
            <LoginPrompt>
              هل أنت عميلٌ سابق؟ <Link to="/login">انقر هنا لتسجيل الدخول</Link>
            </LoginPrompt>
          </TitleRow>

          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <CheckoutContent>
            <OrderSummary>
              <SummaryTitle>ملخص الطلب</SummaryTitle>
              {cart.products.length === 0 ? (
                <p style={{ marginBottom: "1rem" }}>
                  سلة التسوق فارغة. أضف منتجات لعرضها هنا.
                </p>
              ) : (
                cart.products.map((product) => (
                  <SummaryItem key={product._id}>
                    <div>
                      {product.title} × {product.quantity}
                      <br />
                      <strong>
                        {"ر.س" + (product.price * product.quantity).toFixed(2)}
                      </strong>
                    </div>
                    <CrossIcon
                      src={Cross}
                      alt="حذف المنتج"
                      onClick={() => handleRemove(product._id)}
                    />
                  </SummaryItem>
                ))
              )}

              <CouponWrapper>
                <MainInput type="text" placeholder="كود القسيمة" />
                <button>تطبيق</button>
              </CouponWrapper>

              <SummaryItem>
                <span>المجموع الفرعي</span>
                <strong>{"ر.س" + cart.total.toFixed(2)}</strong>
              </SummaryItem>

              <TotalAmount>
                <span>الإجمالي</span>
                <span>{"ر.س" + cart.total.toFixed(2)}</span>
              </TotalAmount>

              {/* Ref here for terms if you want to scroll on error */}
              <TermsCheckbox ref={termsRef}>
                <label>
                  <MainInput
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                  />
                  لقد قرأت وأوافق على <Link to="/policy">الشروط والأحكام</Link>
                </label>
              </TermsCheckbox>

              <ButtonContainer>
                <BuyNowButton onClick={handleCheckout} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner />{" "}
                      {currentStep === "uploading"
                        ? "نقوم بمعالجة طلبك..."
                        : "جاري التنفيذ..."}
                    </>
                  ) : (
                    "أرسل الطلب والدفع"
                  )}
                </BuyNowButton>
              </ButtonContainer>
            </OrderSummary>

            <BillingColumn>
              <BillingInfo>
                <BillingTitle>معلومات الفوترة</BillingTitle>
                <FormField>
                  <label>البريد الإلكتروني *</label>
                  <MainInput
                    ref={emailRef} // attach ref
                    type="email"
                    placeholder="مثال: name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormField>
                <FormField>
                  <label>الاسم الكامل *</label>
                  <MainInput
                    ref={nameRef} // attach ref
                    type="text"
                    placeholder="الاسم الأول واسم العائلة"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormField>
                <FormField>
                  <label>اختر دولة/منطقة *</label>
                  <MainSelect
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="المملكة العربية السعودية">
                      المملكة العربية السعودية
                    </option>
                    <option value="الإمارات العربية المتحدة">
                      الإمارات العربية المتحدة
                    </option>
                    <option value="قطر">قطر</option>
                    <option value="البحرين">البحرين</option>
                    <option value="الكويت">الكويت</option>
                  </MainSelect>
                </FormField>
                <FormField>
                  <label>المدينة / البلدة *</label>
                  <MainInput
                    ref={cityRef} // attach ref
                    type="text"
                    placeholder="أدخل اسم المدينة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormField>
                <FormField>
                  <label>عنوان الشارع *</label>
                  <MainInput
                    ref={streetRef} // attach ref
                    type="text"
                    placeholder="أدخل عنوان الشارع"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FormField>
              </BillingInfo>
            </BillingColumn>
          </CheckoutContent>
        </CheckoutWrapper>
      </PageContainer>
    </Main>
  );
};

export default Checkout;
