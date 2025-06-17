// File: src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Home from "./pages/Home";
import Test from "./pages/Test";
import { Practice, Recommendation } from "./components";
import Onboarding from "./pages/Onboarding";
import Outcome from "./pages/Outcome";
import Product from "./pages/Product";
// import other pages/components as needed

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/outcome" element={<Outcome />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
