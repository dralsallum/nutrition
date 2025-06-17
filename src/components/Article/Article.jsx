import React from "react";
import {
  ArContainerF,
  ArContainerFCon,
  ArContainerFHe,
  ArContainerFPara,
  ArContainerS,
  ArContainerSImg,
  ArSubContainerF,
  ArWrapper,
} from "./Article.elements";
import Girl from "../../assets/girl.png";

const Article = () => {
  return (
    <ArWrapper>
      <ArContainerF>
        <ArSubContainerF>
          <ArContainerFCon>رحلة صحية متكاملة</ArContainerFCon>
          <ArContainerFHe>ابدأ نمط حياة أفضل اليوم</ArContainerFHe>
          <ArContainerFPara>
            انطلق في رحلتك نحو وزن صحي وحياة أكثر نشاطًا من خلال تقارير مخصصة
            ونصائح علمية. نحن نقدم لك خطة مدروسة تساعدك على فهم جسمك، تحديد
            أهدافك، واتخاذ قرارات صحية يوميًا.
            <br />
            من خلال تحليل شامل لأسلوب حياتك، نقدم لك إرشادات غذائية وتمارين
            مناسبة وطرق فعالة لتحفيزك على الاستمرار. هدفنا هو مساعدتك على فقدان
            الوزن بطريقة آمنة ومستدامة، دون حرمان أو ضغط.
            <br />
            كن جزءًا من مجتمع يشاركك نفس الهدف، واستفد من دعم الخبراء والمحتوى
            التفاعلي لتعيش حياة متوازنة وصحية.
          </ArContainerFPara>
        </ArSubContainerF>
      </ArContainerF>
      <ArContainerS>
        <ArContainerSImg src={Girl} alt="صورة توضيحية" />
      </ArContainerS>
    </ArWrapper>
  );
};

export default Article;
