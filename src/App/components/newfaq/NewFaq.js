import React from "react";
import "./NewFaq.css";
import laptop from "../img/feature-laptop (1).png";

const NewFaq = (props) => {
  return (
    <div className="new-feature-container">
      <div className="main-container">
        <div className="main-question">
          <div className="first-question">
            <p>Frequently asked questions</p>
            <div className="para">
              we are regraded as industry leaders in stunning websites
              solutions, focused on delivering unsurpassed user experiences.
            </div>
          </div>
          <div className="faq-questions">
            <div
              style={{ color: "green", fontSize: "16px", fontWeight: "bold" }}
            >
              what kind of questions can i ask? <span className="sign1">-</span>
            </div>
            <div className="question-para">
              we are regraded as industry leaders in stunning websites
              solutions,focused on delivering unsurpassed user experiences.
            </div>
            <p>
              How do I change my custody and suport orders?
              <span className="sign2">+</span>
            </p>
            <p>
              How to make a General Diray? <span className="sign3">+</span>
            </p>
            <p>
              What papaerwork do I need to complete to fill for dirvorce? <span className="sign4">+</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <img className="faq-img" src={laptop} alt="img" />
      </div>
    </div>
  );
};

export default NewFaq;
