import React, { Component } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import NewCard from '../newCard/NewCard';
import ConatainerCard from '../NewContainer/ConatainerCard';
import '../newCard/NewCard.css';
import '../newHeader/NewHeader.css'
export class Header extends Component {
  render() {

    const images = [
      { url: '/img/main.jpg' },
      { url: "/img/slider3.jpg" },
      { url: "/img/intro-bg.jpg" },
      { url: "/img/slider2.jpg" },
      { url: "/img/slider1.jpg" },
    ];
    return (
      <div style={{ display: "flex" }}>

        <SimpleImageSlider
          style={{ zIndex: 0 }}
          width={"100%"}
          height={"calc(100vh - 93px)"}
          images={images}
        />
        <div className="head-centered overlay-slider">
          <h1 style={{ textTransform: 'uppercase' }}>{this.props.state.banner[0]}</h1>
        </div>
        <div
          className="newcard"

        // style={{
        //   position: "absolute",
        //   background: "white",
        //   top: "90%",
        //   display: "flex",
        //   alignSelf: "center",
        //   padding: "15px",
        //   width: "76%",
        //   marginLeft: "12%",
        //   justifyContent: "center",
        //   boxShadow: "5px 5px 15px 5px #21212140",
        // }}
        >
          <NewCard />
          {/* <ConatainerCard/> */}
        </div>
      </div>
    )
  }
}

export default Header
