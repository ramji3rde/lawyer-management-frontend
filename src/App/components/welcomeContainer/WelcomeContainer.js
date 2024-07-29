import React from "react";
import "./WelcomeContainer.css";
import img1 from "../img/icon-img-1.jpg";
import img2 from "../img/icon-img-2.jpg";
import img3 from "../img/icon-img-3.jpg";
import hall from "../img/hall.jpg";
import SimpleImageSlider from "react-simple-image-slider";

const WelcomeContainer = () => {
  return (
    <div
      className="container-welcome"
    // style={{
    //   display: "flex",
    //   marginTop: "10%",
    //   marginLeft: "6%",
    //   flexDirection: "row",

    // }}
    >
      <div
        className="welcome-text"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>
          <div className="welcome-title"
            // style={{
            //   color: "#181884",
            //   fontWeight: "bold",
            //   fontSize: "30px",
            //   marginTop: "9%",
            // }}
            style={{
              borderLeft: '3px solid rgb(108, 233, 182)',
              paddingLeft: 12,
              marginLeft: -20,
              lineHeight: '38px',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              paddingTop: 8
            }}
          >
            Weclome to Precedentonline
          </div>
          <div className="welcome-main-para">
            <span className="card-title"> Precedentonline</span> firm india
            provides a spectrum of legal service to its clients is a qualitative
            manner and is well known for it's expertise is various fields....
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "8%" }}>
          <div>
            <img src={img1} />
          </div>
          <div>
            <div className="card-title" style={{ fontSize: 18 }}>OUR MISSION</div>
            <div className="welcome-para">
              To provide dedicated,efficient,commercially sound and result
              oriented solution to clients.
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
        >
          <div>
            <img src={img2} />
          </div>
          <div>
            <div className="card-title" style={{ fontSize: 18 }}>OUR VISION</div>
            <div className="welcome-para">
              To excel a leading.Progressive,innovative, dynamic and unique
              indian law pratice
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
        >
          <div>
            <img src={img3} />
          </div>
          <div>
            <div className="card-title" style={{ fontSize: 18 }}>OUR VALUES</div>
            <div className="welcome-para">
              To priniciples which guide us in all our deadlings with our client
              and which drive our practice
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          className="hall-picture"
          src={hall}
          alt="hall"
          style={{
            width: "55%",
            height: "48vh",
            marginLeft: "80px",
            marginTop: "10%",
          }}
        />
      </div>
    </div>
  );
};

export default WelcomeContainer;
