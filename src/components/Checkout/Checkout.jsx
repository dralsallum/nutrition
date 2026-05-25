import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, clearCart } from "../../redux/cartRedux";
import Cross from "../../assets/crossFirst.png";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

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
  error: "#c0392b",
  success: "#2d6a4f",
};

// ─── Animations ───────────────────────────────────────────────────────────────
const spin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Page Shell ───────────────────────────────────────────────────────────────

const PageShell = styled.div`
  min-height: 100vh;
  background: ${C.bg};
  direction: rtl;
  animation: ${fadeUp} 0.3s ease both;
`;

const PageInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  @media (max-width: 768px) {
    padding: 1.5rem 1rem 3rem;
  }
`;

// ─── Header ───────────────────────────────────────────────────────────────────

const PageHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${C.border};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: ${C.text};
  font-family: "Georgia", serif;
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const LoginPrompt = styled.p`
  font-size: 0.9rem;
  color: ${C.textMute};
  margin: 0;
  a {
    color: ${C.primary};
    text-decoration: none;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
      color: ${C.primaryDk};
    }
  }
`;

// ─── Error Banner ─────────────────────────────────────────────────────────────

const ErrorBanner = styled.div`
  background: #fff5f5;
  border: 1px solid #f5c6cb;
  border-right: 3px solid ${C.error};
  color: ${C.error};
  padding: 0.85rem 1.1rem;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.75rem;
  align-items: flex-start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Cards ────────────────────────────────────────────────────────────────────

const Card = styled.div`
  background: ${C.bgCard};
  border-radius: 18px;
  border: 1px solid ${C.border};
  box-shadow: 0 2px 12px rgba(176, 90, 54, 0.06);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${C.border};
  background: ${C.bgAccent};
`;

const CardTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${C.text};
  margin: 0;
  letter-spacing: 0.2px;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }
`;

// ─── Form Fields ──────────────────────────────────────────────────────────────

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${C.textMid};
  letter-spacing: 0.2px;
`;

const FieldInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid ${C.border};
  background: ${C.bg};
  color: ${C.text};
  font-size: 15px;
  font-family: inherit;
  box-sizing: border-box;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  text-align: right;
  direction: rtl;
  outline: none;
  &:focus {
    border-color: ${C.primary};
    box-shadow: 0 0 0 3px ${C.primary}22;
    background: ${C.bgCard};
    outline: none;
  }
  &::placeholder {
    color: ${C.textMute};
  }
`;

const FieldSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid ${C.border};
  background: ${C.bg};
  color: ${C.text};
  font-size: 15px;
  font-family: inherit;
  box-sizing: border-box;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  text-align: right;
  direction: rtl;
  outline: none;
  cursor: pointer;
  appearance: none;
  &:focus {
    border-color: ${C.primary};
    box-shadow: 0 0 0 3px ${C.primary}22;
    background: ${C.bgCard};
    outline: none;
  }
`;

// ─── Order Summary ────────────────────────────────────────────────────────────

const SummaryCard = styled(Card)`
  position: sticky;
  top: 1.5rem;
  @media (max-width: 900px) {
    position: static;
    order: -1;
  }
`;

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.85rem 0;
  border-bottom: 1px solid ${C.border};
  gap: 10px;
  &:last-of-type {
    border-bottom: none;
  }
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${C.text};
  margin: 0 0 4px;
  line-height: 1.4;
`;

const CartItemMeta = styled.p`
  font-size: 13px;
  color: ${C.textMute};
  margin: 0;
`;

const CartItemPrice = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${C.primary};
  white-space: nowrap;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.15s;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #fde8e8;
  }
  img {
    width: 16px;
    height: 16px;
    opacity: 0.6;
    transition: opacity 0.15s;
  }
  &:hover img {
    opacity: 1;
  }
`;

const CouponRow = styled.div`
  display: flex;
  gap: 8px;
  margin: 1rem 0;
`;

const CouponInput = styled(FieldInput)`
  flex: 1;
  padding: 10px 12px;
  font-size: 14px;
`;

const CouponBtn = styled.button`
  background: ${C.bgMuted};
  color: ${C.primary};
  border: 1.5px solid ${C.border};
  padding: 10px 16px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  border-radius: 12px;
  font-family: inherit;
  transition: all 0.15s;
  white-space: nowrap;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${C.bgAccent};
    border-color: ${C.primary};
  }
`;

const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 14px;
  color: ${C.textMid};
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 0;
  margin-top: 8px;
  border-top: 2px solid ${C.border};
  font-size: 16px;
  font-weight: 700;
  color: ${C.text};
`;

const TotalAmount = styled.span`
  color: ${C.primary};
  font-size: 18px;
`;

// ─── Terms ────────────────────────────────────────────────────────────────────

const TermsRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 1.25rem;
  padding: 1rem;
  background: ${C.bgAccent};
  border-radius: 12px;
  border: 1px solid ${C.border};
`;

const TermsCheckbox = styled.input`
  width: 18px;
  height: 18px;
  min-width: 18px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: ${C.primary};
  outline: none;
  &:focus {
    outline: none;
  }
`;

const TermsLabel = styled.label`
  font-size: 13px;
  color: ${C.textMid};
  line-height: 1.6;
  cursor: pointer;
  text-align: right;
  a {
    color: ${C.primary};
    text-decoration: underline;
    font-weight: 600;
    &:hover {
      color: ${C.primaryDk};
    }
  }
`;

// ─── CTA Button ───────────────────────────────────────────────────────────────

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  border: none;
  background: ${({ disabled }) =>
    disabled
      ? "#d4c8be"
      : `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDk} 100%)`};
  color: ${C.white};
  font-size: 16px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  font-family: inherit;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1.25rem;
  outline: none;
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

const SpinnerIcon = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: ${C.white};
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
  flex-shrink: 0;
`;

const SecurityNote = styled.p`
  font-size: 12px;
  color: ${C.textMute};
  text-align: center;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const EmptyCart = styled.div`
  padding: 2rem 0;
  text-align: center;
  color: ${C.textMute};
  font-size: 14px;
`;

// ─── Component ────────────────────────────────────────────────────────────────

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
  const [currentStep, setCurrentStep] = useState("");

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const termsRef = useRef(null);

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  const validateForm = () => {
    if (!email) {
      setErrorMessage("يرجى تعبئة حقل البريد الإلكتروني.");
      emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    if (!name) {
      setErrorMessage("يرجى تعبئة حقل الاسم الكامل.");
      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    if (!country) {
      setErrorMessage("يرجى اختيار الدولة.");
      return false;
    }
    if (!city) {
      setErrorMessage("يرجى تعبئة حقل المدينة.");
      cityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    if (!street) {
      setErrorMessage("يرجى تعبئة حقل عنوان الشارع.");
      streetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    }
    if (!termsAccepted) {
      setErrorMessage("يرجى الموافقة على الشروط والأحكام للمتابعة.");
      termsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    if (cart.products.length === 0) {
      setErrorMessage("سلة التسوق فارغة. يرجى إضافة منتجات للمتابعة.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setCurrentStep("uploading");

    const orderTotal = cart.total;
    const orderProducts = cart.products;

    try {
      const orderData = {
        userId: localStorage.getItem("userId") || "guestUser",
        products: orderProducts.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        })),
        amount: orderTotal,
        address: { country, city, street, email, name },
        status: "pending",
      };
      const orderResponse = await publicRequest.post("/orders", orderData);
    } catch (error) {
      console.error("Error submitting order:", error);
      setErrorMessage("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
      setLoading(false);
      return;
    }

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
    <PageShell>
      <PageInner>
        {/* Header */}
        <PageHeader>
          <TitleRow>
            <CheckoutTitle>الدفع</CheckoutTitle>
            <LoginPrompt>
              هل أنت عميلٌ سابق؟ <Link to="/login">انقر هنا لتسجيل الدخول</Link>
            </LoginPrompt>
          </TitleRow>
        </PageHeader>

        {/* Error Banner */}
        {errorMessage && (
          <ErrorBanner>
            <span>⚠</span>
            {errorMessage}
          </ErrorBanner>
        )}

        <CheckoutLayout>
          {/* ── Billing Form ── */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات الفوترة</CardTitle>
            </CardHeader>
            <CardBody>
              <FieldGroup>
                <FormField>
                  <FieldLabel>البريد الإلكتروني *</FieldLabel>
                  <FieldInput
                    ref={emailRef}
                    type="email"
                    placeholder="مثال: name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormField>

                <FormField>
                  <FieldLabel>الاسم الكامل *</FieldLabel>
                  <FieldInput
                    ref={nameRef}
                    type="text"
                    placeholder="الاسم الأول واسم العائلة"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormField>

                <FormField>
                  <FieldLabel>الدولة / المنطقة *</FieldLabel>
                  <FieldSelect
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
                  </FieldSelect>
                </FormField>

                <FormField>
                  <FieldLabel>المدينة / البلدة *</FieldLabel>
                  <FieldInput
                    ref={cityRef}
                    type="text"
                    placeholder="أدخل اسم المدينة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormField>

                <FormField>
                  <FieldLabel>عنوان الشارع *</FieldLabel>
                  <FieldInput
                    ref={streetRef}
                    type="text"
                    placeholder="أدخل عنوان الشارع"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FormField>
              </FieldGroup>
            </CardBody>
          </Card>

          {/* ── Order Summary ── */}
          <SummaryCard>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardBody>
              {cart.products.length === 0 ? (
                <EmptyCart>سلة التسوق فارغة. أضف منتجات لعرضها هنا.</EmptyCart>
              ) : (
                cart.products.map((product) => (
                  <CartItemRow key={product._id}>
                    <CartItemInfo>
                      <CartItemName>{product.title}</CartItemName>
                      <CartItemMeta>الكمية: {product.quantity}</CartItemMeta>
                    </CartItemInfo>
                    <CartItemPrice>
                      {"ر.س " + (product.price * product.quantity).toFixed(2)}
                    </CartItemPrice>
                    <RemoveBtn
                      onClick={() => handleRemove(product._id)}
                      title="حذف"
                    >
                      <img src={Cross} alt="حذف المنتج" />
                    </RemoveBtn>
                  </CartItemRow>
                ))
              )}

              <CouponRow>
                <CouponInput type="text" placeholder="كود القسيمة" />
                <CouponBtn type="button">تطبيق</CouponBtn>
              </CouponRow>

              <SummaryLine>
                <span>المجموع الفرعي</span>
                <span>{"ر.س " + cart.total.toFixed(2)}</span>
              </SummaryLine>
              <SummaryLine>
                <span>الشحن</span>
                <span style={{ color: "#2d6a4f", fontWeight: 600 }}>مجاني</span>
              </SummaryLine>

              <SummaryTotal>
                <span>الإجمالي</span>
                <TotalAmount>{"ر.س " + cart.total.toFixed(2)}</TotalAmount>
              </SummaryTotal>

              <TermsRow ref={termsRef}>
                <TermsCheckbox
                  type="checkbox"
                  id="termsCheck"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <TermsLabel htmlFor="termsCheck">
                  لقد قرأت وأوافق على <Link to="/policy">الشروط والأحكام</Link>
                </TermsLabel>
              </TermsRow>

              <CheckoutBtn onClick={handleCheckout} disabled={loading}>
                {loading ? (
                  <>
                    <SpinnerIcon />
                    {currentStep === "uploading"
                      ? "نقوم بمعالجة طلبك..."
                      : "جاري التنفيذ..."}
                  </>
                ) : (
                  "أرسل الطلب والدفع"
                )}
              </CheckoutBtn>

              <SecurityNote>🔒 جميع المعاملات آمنة ومشفّرة</SecurityNote>
            </CardBody>
          </SummaryCard>
        </CheckoutLayout>
      </PageInner>
    </PageShell>
  );
};

export default Checkout;
