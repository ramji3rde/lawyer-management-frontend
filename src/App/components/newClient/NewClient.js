import React from "react";
import "./NewClient.scss";
import Slider from "react-slick";

const NewClient = () => {
  const options = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className="main-client">
      <div className="newclient-container container">
        <div className="client-container">
          <h3>Our Client Say</h3>
          <p>
            We are regraded as industry leaders in stunning websites
            solutions,focused
            on delivering unsurpassed user experiences.
          </p>
        </div>
        <Slider {...options}>
          <div>
            <div className="client-pic-text">

              <div className="client-avatar">
                <img src="https://reqres.in/img/faces/7-image.jpg" className="client-avatar" />
              </div>
              <div className='client-text'>

                <p >
                  <span style={{ fontSize: '14px', fontFamily: "open Sans" }}><i className="fas fa-quote-left"></i></span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
                  ut labore et dolore magna aliquyam erat, sed diam voluptua.
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.
                </p>
                <div className="img-footer">
                  <h5 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>Alon Smith</h5>
                  <h6 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>CEO of AVC Group</h6>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="client-pic-text">

              <div className="client-avatar">
                <img src="https://reqres.in/img/faces/7-image.jpg" className="client-avatar" />
              </div>
              <div className='client-text'>

                <p >
                  <span style={{ fontSize: '14px', fontFamily: "open Sans" }}><i className="fas fa-quote-left"></i></span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
                  ut labore et dolore magna aliquyam erat, sed diam voluptua.
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.
                </p>
                <div className="img-footer">
                  <h5 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>Alon Smith</h5>
                  <h6 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>CEO of AVC Group</h6>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="client-pic-text">

              <div className="client-avatar">
                <img src="https://reqres.in/img/faces/7-image.jpg" className="client-avatar" />
              </div>
              <div className='client-text'>

                <p >
                  <span style={{ fontSize: '14px', fontFamily: "open Sans" }}><i className="fas fa-quote-left"></i></span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
                  ut labore et dolore magna aliquyam erat, sed diam voluptua.
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.
                </p>
                <div className="img-footer">
                  <h5 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>Alon Smith</h5>
                  <h6 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>CEO of AVC Group</h6>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="client-pic-text">

              <div className="client-avatar">
                <img src="https://reqres.in/img/faces/7-image.jpg" className="client-avatar" />
              </div>
              <div className='client-text'>

                <p >
                  <span style={{ fontSize: '14px', fontFamily: "open Sans" }}><i className="fas fa-quote-left"></i></span>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
                  ut labore et dolore magna aliquyam erat, sed diam voluptua.
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.
                </p>
                <div className="img-footer">
                  <h5 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>Alon Smith</h5>
                  <h6 style={{ color: "white", fontFamily: 'Roboto', fontSize: '20px', fontWeight: 'bold' }}>CEO of AVC Group</h6>
                </div>
              </div>
            </div>
          </div>
        </Slider>

      </div>
    </div>
    
  );
};

export default NewClient;
