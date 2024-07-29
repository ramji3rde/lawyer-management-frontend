import React from "react";
import img from "../img/circle_shape.png";
import "./NewFeature.css";
import headerpic from "../img/headerLogo.png";
const NewFeature = () => {
  return (
    <div className="circle-container">
      <div className="circle-right">
        
        <div className="contact"  >
        <div className="feature-para"> CONTACT MANAGEMENT</div>
          <div className="desc">
            Add and store contact details of all your clients.Create
            Client Files with all information in one place
          </div>
        </div>
        <div className="billing"  >
          <div className="feature-para"> BILLING</div>
          <div className="desc">
          Set custom billing rates specific to clients or matter. Hourly, Retainer or you define your billing structure.
          </div>
        </div>
        <div className="document" >
          < div className="feature-para"> DOCUMENT MANAGEMENT</div>
          <div className="desc">
            Manage all your client document in the Cloud.Never misplace a case file again
          </div>
        </div>
        </div>
      <div className="circle-center">
        
        
        <div 
        style={{
            // position: "absolute",
          alignContent: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <img className="circle" src={img} alt="img" />
        <img className="header-pic" src={headerpic} alt='headerpicture' />
      </div>
        </div>
      <div className="circle-left">
        
        <div className="accounts" >
          <div className="feature-para"> CLIENT ACCOUNT</div>
          <div className="desc">
            Set up Client Trust Accounts for easy reconiliation. Assign all your bills to correct accounts
          </div>
        </div>

   
        <div className="dashboard"  >
          <div className="feature-para"> DASHBOARD</div>
          <div className="desc">
           See your Firms performance at a glance. Assign Financial Targets and track them easily
          </div>
        </div>
        <div className="task">
          <div className="feature-para"> TASK MANAGEMENT</div>
          <div className="desc">
            Always know what is outstanding. See your progress to know what is falling behind
          </div>
        </div>
        </div>
      
    </div>
  );
};

export default NewFeature;
