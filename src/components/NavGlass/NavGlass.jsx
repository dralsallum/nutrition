import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import Play from "../../assets/play.png";
import Pause from "../../assets/pause.png";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Tajawal:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body {
    background: #0e0c0b;
    font-family: 'Tajawal', sans-serif;
    color: #fff;
    overflow-x: hidden;
    direction: rtl;
  }
`;

const navFadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -12px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// Page wrapper: invisible until videoReady, then fades in
const PageWrapper = styled.div`
  opacity: ${({ $ready }) => ($ready ? 1 : 0)};
  transition: opacity 0.6s ease;
`;

// ── Loader animations ──────────────────────────────────────────────────────────

const loaderFadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const orbPulse = keyframes`
  0%   { transform: scale(1);    opacity: 1; }
  50%  { transform: scale(1.18); opacity: 0.7; }
  100% { transform: scale(1);    opacity: 1; }
`;

const ringExpand = keyframes`
  0%   { transform: scale(0.7); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
`;

const ringExpand2 = keyframes`
  0%   { transform: scale(0.7); opacity: 0.4; }
  100% { transform: scale(1.9); opacity: 0; }
`;

const barFill = keyframes`
  0%   { width: 0%; }
  60%  { width: 75%; }
  80%  { width: 88%; }
  100% { width: 100%; }
`;

const dotBounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%            { transform: translateY(-8px); opacity: 1; }
`;

const subtitleFade = keyframes`
  0%   { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// ── Loader styled components ───────────────────────────────────────────────────

const LoaderOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: #0e0c0b;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  animation: ${({ $ready }) => ($ready ? loaderFadeOut : "none")} 0.55s ease
    forwards;
  pointer-events: ${({ $ready }) => ($ready ? "none" : "all")};
`;

/* Decorative top-left / bottom-right corner brackets */
const CornerBracket = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  opacity: 0.18;

  &.tl {
    top: 32px;
    left: 32px;
    border-top: 1px solid #b05a36;
    border-left: 1px solid #b05a36;
  }
  &.br {
    bottom: 32px;
    right: 32px;
    border-bottom: 1px solid #b05a36;
    border-right: 1px solid #b05a36;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    &.tl {
      top: 20px;
      left: 20px;
    }
    &.br {
      bottom: 20px;
      right: 20px;
    }
  }
`;

/* Thin horizontal rule above everything */
const TopRule = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent 0%,
    #b05a36 40%,
    #e07a54 60%,
    transparent 100%
  );
  opacity: 0.7;
`;

const OrbWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
`;

/* Expanding ripple rings */
const Ring = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid #b05a36;
  animation: ${ringExpand} 2s ease-out infinite;
  animation-delay: ${({ $delay }) => $delay || "0s"};
`;

const Ring2 = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(176, 90, 54, 0.5);
  animation: ${ringExpand2} 2s ease-out infinite;
  animation-delay: ${({ $delay }) => $delay || "0s"};
`;

/* Central glowing orb */
const Orb = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 38% 38%,
    #e07a54 0%,
    #b05a36 55%,
    #7a3820 100%
  );
  box-shadow:
    0 0 0 1px rgba(176, 90, 54, 0.5),
    0 0 24px rgba(176, 90, 54, 0.45),
    0 0 56px rgba(176, 90, 54, 0.2);
  animation: ${orbPulse} 2.2s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

/* SVG wave mark inside the orb */
const OrbMark = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <circle
      cx="16"
      cy="16"
      r="14"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth="1.2"
      fill="none"
    />
    <path
      d="M4 16 Q10 10 16 16 Q22 22 28 16"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M4 16 Q10 22 16 16 Q22 10 28 16"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const LoaderLogo = styled.div`
  font-family: "Amiri", serif;
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  direction: rtl;
`;

const LoaderTagline = styled.div`
  font-family: "Tajawal", sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.4px;
  margin-bottom: 40px;
  animation: ${subtitleFade} 0.8s 0.3s ease both;
  direction: rtl;
`;

/* Progress bar track */
const BarTrack = styled.div`
  width: 180px;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 24px;
`;

const BarFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #7a3820, #b05a36, #e07a54);
  border-radius: 99px;
  animation: ${barFill} 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

/* Bouncing dots */
const DotsRow = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #b05a36;
  animation: ${dotBounce} 1.3s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || "0s"};
`;

const Nav = styled.nav`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: min(calc(100vw - 2rem), 1400px);
  min-width: 320px;
  height: 64px;
  padding: 0 24px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition:
    background 0.4s ease,
    border-color 0.4s ease;
  animation: ${navFadeIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  direction: rtl;

  @media (max-width: 480px) {
    height: 56px;
    padding: 0 16px;
    top: 0.75rem;
  }
`;

const NavInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  gap: 16px;

  @media (max-width: 860px) {
    display: flex;
    justify-content: space-between;
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const LogoText = styled.span`
  font-family: "Amiri", serif;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.3px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: "Tajawal", sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
  &:hover {
    color: #ffffff;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
`;

const NavLoginBtn = styled.button`
  background: none;
  border: none;
  font-family: "Tajawal", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.75;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const NavCTABtn = styled.button`
  background: #b05a36;
  border: none;
  border-radius: 50px;
  padding: 10px 22px;
  font-family: "Tajawal", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(176, 90, 54, 0.4);

  &:hover {
    background: #c4653e;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(176, 90, 54, 0.5);
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

const NavIconBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }

  @media (max-width: 480px) {
    &.search {
      display: none;
    }
  }
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  direction: rtl;
`;

const VideoBg = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(10, 9, 8, 0.08) 0%,
    rgba(10, 9, 8, 0.18) 40%,
    rgba(10, 9, 8, 0.55) 70%,
    rgba(10, 9, 8, 0.8) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 5vw 56px;
  max-width: 760px;
  animation: ${fadeUp} 0.9s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
  text-align: right;

  @media (max-width: 600px) {
    padding: 0 24px 40px;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 22px;
  letter-spacing: 0.3px;
  backdrop-filter: blur(8px);
`;

const HeroHeadline = styled.h1`
  font-family: "Amiri", serif;
  font-size: clamp(48px, 7vw, 90px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 18px;
  letter-spacing: 0;
`;

const HeroSub = styled.p`
  font-family: "Tajawal", sans-serif;
  font-size: clamp(14px, 1.6vw, 17px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 520px;
  margin-right: 0;
  margin-left: auto;
`;

const HeroCTABtn = styled.button`
  background: rgba(255, 255, 255, 0.92);
  border: none;
  border-radius: 50px;
  padding: 14px 30px;
  font-family: "Tajawal", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #b05a36;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #ffffff;
    transform: translateY(-1px);
  }
`;

const StatsBar = styled.div`
  position: absolute;
  bottom: 56px;
  left: 5vw;
  z-index: 2;
  display: flex;
  align-items: stretch;
  gap: 0;
  animation: ${fadeIn} 1s 0.6s both;

  @media (max-width: 700px) {
    display: none;
  }
`;

const StatItem = styled.div`
  padding: 0 28px;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  text-align: right;

  &:first-child {
    border-right: none;
    padding-right: 0;
  }
`;

const StatValue = styled.div`
  font-family: "Tajawal", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 3px;
`;

const StatLabel = styled.div`
  font-family: "Tajawal", sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.65);
`;

const PlayBtn = styled.button`
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: background 0.2s;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const NavGlass = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // video autoplays
  const [videoReady, setVideoReady] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Scroll listener for nav glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gate the page on video being ready to play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoReady(true);

    // If already ready (cached), fire immediately
    if (video.readyState >= 3) {
      setVideoReady(true);
    } else {
      video.addEventListener("canplay", onCanPlay);
    }

    // Keep isPlaying in sync if the browser pauses/resumes the video
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // Toggle play / pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    // state is updated via the "play"/"pause" event listeners above
  };

  return (
    <>
      <GlobalStyle />

      {/* Branded loader — visible until video canplay fires */}
      <LoaderOverlay $ready={videoReady}>
        <TopRule />
        <CornerBracket className="tl" />
        <CornerBracket className="br" />

        <OrbWrapper>
          <Ring $delay="0s" />
          <Ring $delay="0.7s" />
          <Ring2 $delay="1.4s" />
          <Orb>
            <OrbMark />
          </Orb>
        </OrbWrapper>

        <LoaderLogo>فانكشن</LoaderLogo>
        <LoaderTagline>جارٍ تحضير التجربة…</LoaderTagline>

        <BarTrack>
          <BarFill />
        </BarTrack>

        <DotsRow>
          <Dot $delay="0s" />
          <Dot $delay="0.18s" />
          <Dot $delay="0.36s" />
        </DotsRow>
      </LoaderOverlay>

      <PageWrapper $ready={videoReady}>
        <Nav
          style={{
            background: scrolled
              ? "rgba(14, 12, 11, 0.65)"
              : "rgba(14, 12, 11, 0.28)",
            borderColor: scrolled
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.04)",
          }}
        >
          <NavInner>
            <NavLogo>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M4 16 Q10 10 16 16 Q22 22 28 16"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M4 16 Q10 22 16 16 Q22 10 28 16"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M7 10 Q13 7 16 10 Q19 13 25 10"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M7 22 Q13 25 16 22 Q19 19 25 22"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <LogoText>فانكشن</LogoText>
            </NavLogo>

            <NavLinks>
              <NavLink href="#">كيف يعمل</NavLink>
              <NavLink href="#">ما نفحصه</NavLink>
              <NavLink href="#">الفحوصات</NavLink>
              <NavLink href="#">الأسئلة الشائعة</NavLink>
              <NavLink href="#">من نحن</NavLink>
            </NavLinks>

            <NavRight>
              <NavLoginBtn>تسجيل الدخول</NavLoginBtn>
              <NavCTABtn onClick={() => navigate("/recommendation")}>
                ابدأ الفحص
              </NavCTABtn>
              <NavIconBtn className="search" aria-label="بحث">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </NavIconBtn>
              <NavIconBtn aria-label="القائمة">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
              </NavIconBtn>
            </NavRight>
          </NavInner>
        </Nav>

        <HeroSection>
          <VideoBg ref={videoRef} autoPlay loop muted playsInline>
            <source
              src="https://alsallum.s3.eu-north-1.amazonaws.com/Gen-4+Aleph+-+remove+all+text+and+buttons+and+I+mean+every+don't+keep+anything+but+the+video.mp4"
              type="video/mp4"
            />
          </VideoBg>

          <Overlay />

          <HeroContent>
            <Badge>مؤهّل لـ HSA / FSA</Badge>
            <HeroHeadline>افحص صحتك.</HeroHeadline>
            <HeroSub>
              كل عام. يبدأ بأكثر من ١٦٠ فحصاً مخبرياً يكشف أكثر من ١٠٠٠ حالة. بـ
              ٣٦٥ دولاراً فقط سنوياً — دولار واحد في اليوم.
            </HeroSub>
            <HeroCTABtn onClick={() => navigate("/recommendation")}>
              ابدأ الفحص
            </HeroCTABtn>
          </HeroContent>

          <StatsBar>
            <StatItem>
              <StatValue>+١٦٠ فحصاً مخبرياً</StatValue>
              <StatLabel>إجمالي كل عام</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>الجسم كله</StatValue>
              <StatLabel>فحصان في السنة</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>دولار يومياً</StatValue>
              <StatLabel>٣٦٥ دولاراً سنوياً</StatLabel>
            </StatItem>
          </StatsBar>

          {/*
            isPlaying = true  → video is running  → show Pause icon (click to pause)
            isPlaying = false → video is paused   → show Play  icon (click to play)
          */}
          <PlayBtn
            onClick={togglePlay}
            aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
          >
            <img
              src={isPlaying ? Pause : Play}
              alt={isPlaying ? "pause" : "play"}
              width={16}
              height={16}
              style={{ objectFit: "contain", display: "block" }}
            />
          </PlayBtn>
        </HeroSection>
      </PageWrapper>
    </>
  );
};

export default NavGlass;
