import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from '../../../resources/api'
import "bootstrap/js/src/collapse.js";
import NewHeader from "../newHeader/NewHeader";
import headerLogo from '../img/headerLogo.png'
import '../HomePage/NewNavigation.css';

export class Navigation extends Component {
  constructor() {
    super()
    this.state = {

      list: [],
      list2: [],
      description: '',
      address: '',
      socialMedia: [
        { item: "Facebook", url: '' },
        { item: "Twitter", url: '' },
        { item: "Youtube", url: '' },
        { item: "Instagram", url: '' },
        { item: "LinkedIn", url: '' }
      ],
      imageFile: '',
      header: [],
      logo: "",
      banner: ["WE SUPPORT  ATTORNEYS , CASE MANAGEMENT MADE EASY"],

    }
  }

  componentDidMount() {
    api.get(`/footer/showall/`).then((res) => {
      console.log(res)
      this.setState(res.data.data[res.data.data.length - 1])
      //  this.setState(res.data.data)
    })
  }

  render() {
    return (
      <div>

        <NewHeader />

        <div
          id="menu"
          className="bg-white border-bottom navigation-wrap shadow-sm sticky-top p-0">
          <div className="container" style={{ padding: 0 }}>
            <div className="row">
              <div className="col-12 p-0"  >
                <nav className="navbar navbar-expand-md navbar-light p-0" >
                  <Link
                    className="navbar-brand-name page-scroll ml-2"
                    to="/"
                  >
                    <img alt="Case Management" src={headerLogo} className="main-logo" width="110"></img>
                    {/* <img src="../img/headerLogo.png" alt="Case Management"  height = "90px" width="100px" srcset=""/> */}
                  </Link>
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style={{ justifyContent: 'flex-end' }}
                  >
                    <ul
                      className="nav-bar"
                    // className="navbar-nav pt-1 px-md-3"  id=" topNav"
                    //  style={{marginLeft:"31%"}}
                    >
                      {

                        this.state.header.map((val, index) => {
                          return <li className="nav-item">
                            <Link to={val.url} className="nav-link page-scroll">
                              {val.item}
                            </Link>
                          </li>
                        })
                      }
                      {/* i worked here */}
                      {
                        <React.Fragment >
                          <li className="nav-item">
                            <Link to="/features" className="nav-link page-scroll" style={{ borderBottom: '4px solid rgb(24, 24, 132)' }}>
                              Home
                      </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/features" className="nav-link page-scroll">
                              Feature
                      </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/subscription" className="nav-link page-scroll">
                              Pricing
                      </Link>
                          </li>
                          {/* <li className="nav-item">
                      <Link to="/blog" className="nav-link page-scroll">
                        Blog
                      </Link>
                    </li> */}
                          <li className="nav-item">
                            <Link to="/contact" className="nav-link page-scroll">
                              About us
                      </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/contact" className="nav-link page-scroll">
                              FAQ
                      </Link>
                          </li>

                        </React.Fragment>

                      }
                      {/* upto here */}
                    </ul>

                    <div className="navbar-login " style={{ justifyContent: 'space-around' }} id="bottomNav">
                      <ul className="nav-bar">
                        <li className="nav-item mr-3" >
                          <Link to="/login"
                            className="login"
                          // style={{ borderRadius:'26px', outline: 'none',backgroundColor:'#181884',color:'white',padding: '12px 32px',border:'none', marginTop:'10px' }}
                          >
                            Login
                        </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/registration"
                            className="signup"
                          // style={{borderRadius:'26px', outline: 'none',backgroundColor:'#0bc25d',color:'white',padding: '12px 32px',border:'none' }}
                          // style={{ borderradius:'22px', outline: 'none',background:'#0bc25d',border:'none' }}
                          >
                            Sign Up
                        </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
