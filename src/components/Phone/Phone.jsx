import React, { useState, useEffect } from "react";
import {
  ArCon,
  ArCont,
  ArImg,
  ArPa,
  ArSp,
  ArSub,
  ArWra,
  AtAA,
  AtImg,
  AtWr,
  ButLe,
  ButRi,
  ButSp,
  ButWr,
  DotLi,
  DotWr,
} from "./Phone.elements";
import Appstore from "../../assets/appstore.png";
import Googlestore from "../../assets/googlePlay.png";

const Phone = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const articles = [
    {
      text: "طور مستواك خطوة بخطوة",
      subText: "احرص على تطوير مهاراتك في اللغة الإنجليزية بشكل تدريجي ومتقدم.",
      imgSrc: "https://alsallum.s3.eu-north-1.amazonaws.com/educationDiet.png",
    },
    {
      text: "تعلم الإنجليزي بطريقة تفاعلية",
      subText:
        "استمتع بتجربة تعلم تفاعلية وفعالة تضمن لك التقدم السريع والملحوظ.",
      imgSrc: "https://alsallum.s3.eu-north-1.amazonaws.com/start.png",
    },
    {
      text: "تعلم من القصص",
      subText:
        "استمتع بقراءة القصص الممتعة وتعلم اللغة الإنجليزية من خلال السرد.",
      imgSrc: "https://alsallum.s3.eu-north-1.amazonaws.com/report.png",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + articles.length) % articles.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <ArWra>
      <ArCon>
        <ArSub>
          {articles.map((article, index) => (
            <ArCont
              key={index}
              style={{ display: currentIndex === index ? "flex" : "none" }}
            >
              <ArPa>
                {article.text}
                <br />
                <br />
                <ArSp>{article.subText}</ArSp>
              </ArPa>
              <ArImg src={article.imgSrc} alt="" />
            </ArCont>
          ))}
        </ArSub>
      </ArCon>
      <ButWr>
        <ButLe onClick={handlePrevious}>
          <ButSp>‹</ButSp>
        </ButLe>
        <ButRi onClick={handleNext}>
          <ButSp>›</ButSp>
        </ButRi>
      </ButWr>
      <DotWr>
        {articles.map((_, index) => (
          <DotLi
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              background: currentIndex === index ? "#ff7143" : "#d6d6ea",
            }}
          />
        ))}
      </DotWr>
      <AtWr>
        <AtAA href="">
          <AtImg src={Appstore} alt="" />
        </AtAA>
        <AtAA href="">
          <AtImg src={Googlestore} alt="" />
        </AtAA>
      </AtWr>
    </ArWra>
  );
};

export default Phone;
