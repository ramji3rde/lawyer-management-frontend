import React from "react";
import "./Frequntly.css";
import laptop from "../img/feature-laptop (1).png";
// import Minus from 'app/assets/icons/MinusIcon.svg';
//  import Plus from 'app/assets/icons/PlusIcon.svg';

import { Collapse } from "antd";
import { CaretRightOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'

// import laptop from "../img/feature-laptop (1).png";

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const text = (
  <p style={{ paddingTop: 10, background: "white", color: "black", border: 'none', width: '100%', height: "10vh", fontFamily: 'myriadopro', fontSize: '16px' }}>
    We are regraded as industry leaders in stunning websites solutions, focused
    on delivering unsurpassed user experiences.
  </p>
  // <header style={{color:"white"}}></header>
);
// const quest1 =(

// <p style={{color:"white"}}>
//   what kind of questions can i ask?
// </p>

// )


const Frequntly = () => {
  return (
    <div className="frequntly-cotainer">
      <div className="frequntly-collapse">
        <div className="totalFaq" style={{ borderLeft: "3px solid green" }}>
          <p style={{ fontWeight: "bold", fontSize: "31px", fontFamily: 'playfair' }}>Frequently asked questions</p>
          <p style={{ fontFamily: 'myriadopro' }}>
            We are regraded as industry leaders in stunning website solutions,
            focused on delivering unsurpassed user experiences.
          </p>
        </div>
        <Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />} bordered={false} defaultActiveKey={["1"]} expandIconPosition="right" >

          <Panel showArrow={true}
            header="What kind of questions can i ask?"
            key="1"
            style={{ backgroundColor: "black" }}
          >
            {text}
          </Panel>
          <Panel showArrow={true}
            header=" How do I change my custody and suport orders?"
            key="2"
            style={{ backgroundColor: "black" }}
          >
            {text}
          </Panel>
          <Panel showArrow={true}
            header=" How to make a General Diray?"
            key="3"
            style={{ backgroundColor: "black" }}
          >
            {text}
          </Panel>
          <Panel showArrow={true}
            header=" What papaerwork do I need to complete to fill for dirvorce?"
            key="4"
            style={{ backgroundColor: "black" }}
          >
            {text}
          </Panel>
        </Collapse>
      </div>

      <div>
        <img className="frequntly-img" src={laptop} alt="img" />
      </div>
    </div>
  );
};

export default Frequntly;
