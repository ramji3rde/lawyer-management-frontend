import React from "react";
import api from "../../../resources/api";
import { Link } from "react-router-dom";
import location from '../img/Google-Maps.jpg'
import headerLogo from '../img/headerLogo.png'

import '../HomePage/NewFooter.css'
class footer extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      list2: [],
      description: "",
      address: "",
      socialMedia: [
        { item: "Facebook", url: "" },
        { item: "Twitter", url: "" },
        { item: "Youtube", url: "" },
        { item: "Instagram", url: "" },
        { item: "LinkedIn", url: "" },
      ],
      imageFile: "",
      header: [],
      logo: "",
      banner: [
        "WE SUPPORT  ATTORNEYS , CASE MANAGEMENT MADE EASY on Lawyer, Lawyers rely on us",
      ],
    };
  }

  componentDidMount() {
    api.get(`/footer/showall/`).then((res) => {
      console.log(res);
      this.setState(res.data.data[res.data.data.length - 1]);
      //  this.setState(res.data.data)
    });
  }

  render() {
    return (
      <div id="footer" >
        <div className="f-top">
          <center className="footer-upper-section">
            <img src={headerLogo} className="footer-image" />
            <p>
              As per the rules of the bar Council of India, we are not permitted to solcit work and advertise. The user acknowledges that there has been no
              advertisement and personal communication from A&A, any information obtained or material downloaded from this website is completely at the user's
              violation and any transmission, reciept or use of this would not create any laywer-client relationship.
            </p>
          </center>

          <div className="container">

            <div className="row justify-content-center">

              {
                // <div className="col-md-3 col-sm-12 pb-4">
                //               <div className="ftr-set">
                //                 {/* <h3><img alt = "No image" height = "40%"width="40%" src = {this.state.logo}></img></h3> */}
                //                 <p>{this.state.description}</p>
                //               </div>
                //             </div>
              }

              <div className="col-md-3 col-sm-12 pb-4 ">
                <div className="ftr-set" >
                  <h3>Office Address</h3>
                  <ul className="nav ftr-nav flex-column">
                    <div style={{ fontWeight: "bold" }}>
                      <p>Suite 27, Winchester</p>
                      <p>Business Center</p>
                      {/* <p>Contact: 0123456789</p>
                      <p>Email: admin@gmail.com</p> */}
                      <p className="mt-5"><i className="fas fa-phone-square-alt"></i> Contact : 01234567890</p>
                      <p><i className="far fa-envelope"></i> Email : admin@gmail.com</p>
                    </div>

                    {/* {this.state.list.map((val, index) => {
                      return (
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.handleRoute(val.url);
                          }}
                        >
                          <a className="page-scroll">{val.item}</a>
                        </li>
                      );
                    })} */}
                    {/*
                  <li>
                  <a href="/" className="page-scroll">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/features" className="page-scroll">
                    Feature
                  </a>
                </li>
                <li>
                  <a href="/subscription" className="page-scroll">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/blog" className="page-scroll">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="page-scroll">
                    Contact us
                  </a>
                </li>
                  */}
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-12 pb-4" >
                <div className="ftr-set">
                  <h3>Quick Links</h3>
                  {
                    <React.Fragment>
                      <p className="nav-item">
                        <Link to="/features" className="nav-link page-scroll">
                          Feature
                        </Link>
                      </p>
                      <p className="nav-item">
                        <Link
                          to="/subscription"
                          className="nav-link page-scroll"
                        >
                          Pricing
                        </Link>
                      </p>
                      {/* <li className="nav-item">
                      <Link to="/blog" className="nav-link page-scroll">
                        Blog
                      </Link>
                    </li> */}
                      <p className="nav-item">
                        <Link to="/contact" className="nav-link page-scroll">
                          About us
                        </Link>
                      </p>
                      <p className="nav-item">
                        <Link to="/contact" className="nav-link page-scroll">
                          FAQ
                        </Link>
                      </p>
                    </React.Fragment>
                  }

                  <ul className="nav ftr-nav flex-column">
                    {/* {this.state.list2.map((val, index) => {
                      return (
                        <li>
                          <a href={val.url} className="page-scroll">
                            {val.item}
                          </a>
                        </li>
                      );
                    })} */}
                    {/*
                  <li>
                  <a href="#home" className="page-scroll">
                    Work from Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="page-scroll">
                    Legal Trends Report
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="page-scroll">
                    Start a Law Firm
                  </a>
                </li>
                <li>
                  <a href="#blog" className="page-scroll">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#contactus" className="page-scroll">
                    Blog
                  </a>
                </li>
                  */}
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-12 ">
                <div className="ftr-set">
                  <div className="social">
                    <h3>Follow us</h3>
                    {/* <p> {this.state.address}</p> */}
                    {/* <h3>Social</h3> */}
                    <ul className="clearfix ">
                      <li>
                        <a
                          onClick={() => {
                            window.location.href = this.state.socialMedia[0].url;
                          }}
                        >
                          <i style={{
                            width: 24,
                            height: 24,
                            background: '#3b5999',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            alignItems: 'center'
                          }} className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            window.location.href = this.state.socialMedia[1].url;
                          }}
                        >
                          <i style={{
                            width: 24,
                            height: 24,
                            background: '#00abf0',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            alignItems: 'center'
                          }} className="fa fa-twitter"></i>
                        </a>
                      </li>
                      {/* <li>
                    <a  onClick={()=>{window.open(this.state.socialMedia[2].url)}}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li> */}
                      <li>
                        <a
                          onClick={() => {
                            window.open(this.state.socialMedia[4].url);
                          }}
                        >
                          <span style={{
                            width: 24,
                            height: 24,
                            background: '#0e76a9',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            alignItems: 'center'
                          }} className="fa fa-linkedin"></span>
                        </a>
                      </li>

                      {/* <li>
                  <a onClick={()=>{window.open(this.state.socialMedia[3].url)}}>
                    <span className="fa fa-instagram"></span>
                  </a>
                </li> */}
                    </ul>
                    <img src={location} alt="location" width="280" height="150" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="f-nav"  >
          <div className="container p-0">
            <ul
              className="clearfix f-menu-items"
              style={{ "line-height": "2", marginBottom: 0 }}
            >
              {/* <li>
                <small>{this.state.footer}</small>
              </li> */}
              {/*
            <li>
            <a
              href="/"
              target="_blank"
              data-tracking-trigger="click"
              data-tracking-action="NA Footer Navigation Link"
            >
              <small>Terms of Service</small>
            </a>
          </li>
          <li>
            <a
              href="/"
              target="_blank"
              data-tracking-trigger="click"
              data-tracking-action="NA Footer Navigation Link"
            >
              <small>Legal Service</small>
            </a>
          </li>
          <li>
            <a
              href="/"
              target="_blank"
              data-tracking-trigger="click"
              data-tracking-action="NA Footer Navigation Link"
            >
              <small>Privacy Policy</small>
            </a>
          </li>
          <li>
            <div className="o-region-selector l-region-selector js-region-selector">
              <select
                data-tracking-trigger="change"
                data-tracking-action="Region Selector"
              >
                <option value="" selected="selected">
                  Region
                </option>
                <option value="uk" data-alternate-url="/">
                  United Kingdom
                </option>
              </select>
            </div>
          </li>
             */}
              <li className="p-0">
                <div className="l-social c-social">
                  <ul>
                    <li style={{padding: 0}}>
                      <p style={{ fontWeight: "bold", margin: 0 }}> @Copyright 2021.Precedent Online</p>
                      {/* <a
                        onClick={() => {
                          window.location.href = this.state.socialMedia[0].url;
                        }}
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          window.location.href = this.state.socialMedia[1].url;
                        }}
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          window.open(this.state.socialMedia[2].url);
                        }}
                      >
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          window.open(this.state.socialMedia[4].url);
                        }}
                      >
                        <span className="fa fa-linkedin"></span>
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => {
                          window.open(this.state.socialMedia[3].url);
                        }}
                      >
                        <span className="fa fa-instagram"></span>
                      </a> */}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default footer;
