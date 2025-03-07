import React, { useState, useEffect } from "react";
import { loginUser, setLoginSuccess } from "../../../store/Actions";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/HomePage/navigation";
import Footer from "../../components/HomePage/footer";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { Spin } from "antd";
import api from "../../../resources/api";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const Login = (props) => {
  const dispatch = useDispatch();


  const params = useParams();
  const [display, setDisplay] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [state, setState] = useState({
    emailAddress: "",
    password: "",
    userName: ""
  });

  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
    userName: ""
  });
  const handleRoute = (route) => {
    console.log(route)
    props.history.push(route)
  }
  const handleChange = (e) => {
    e.persist();
    setDisplay(false)
    const { name, value } = e.target;
    setState((st) => ({ ...st, [name]: value }));
    var err = errors;
    switch (name) {
      case "userName":
        err.userName = value.length > 4
          ? ""
          : "Username is not valid!";
        break;
      case "emailAddress":
        err.emailAddress = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 6 ? "Password must be at least 6 characters" : "";
        break;
      default:
        break;
    }
    setErrors({ ...err });
  };

  useEffect(() => {
    if (params.lawyer) {
      dispatch(
        setLoginSuccess({ token: { user: JSON.parse(atob(params.lawyer)) } })
      );
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!display) {
      setSpinner(true);
      const validateForm = (error) => {
        let valid = true;
        Object.values(error).forEach((val) => val.length > 0 && (valid = false));
        return valid;
      };
      if (validateForm(errors)) {
        checkValidity();
      } else {
        setSpinner(false);
        setDisplay(true)
        return notification.warning({
          message: "Failed to Register.",
        });
      }
    }
  };

  const checkValidity = () => {
    if (state["emailAddress"] === "" || state["password"] === "" || state['userName'] === "") {
      setSpinner(false);
      setDisplay(true)
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    } else {
      dispatch(
        loginUser({ ...state, type: "user" }, (err, response) => {
          if (err) {
            setDisplay(true)
            console.log(err)
            if (err.message === "Your trial period expired." ||
              err.message === "You payment has been declined." ||
              err.message === "Payment confirmation awaited.") {

              props.history.push('/plans/subscription')

            }
            notification.error(err);
          } else {
            notification.success(response);
            console.log(response)

            localStorage.setItem('timer', 0)

            let user = JSON.parse(window.localStorage.getItem('Case.user'))
            user = user.token.user
            user.updated_at = new Date()
            delete user.userName
            api.post(`user/update/${user._id}`, user).then((res) => {
              console.log(res)
            }).catch((err) => {
              console.log(err)
            })

          }
          setSpinner(false);
        })
      );
    }
  };

  return (
    <>
      <Navigation />
      <div className="Login">
        <div className="container text-center">
          <div className="align-content-center py-5 row">
            <div className="col-md-6 offset-md-3">
              <div className="bg-light l-wrapper p-3 p-md-5 shadow">
                <div className="section-title mb-2">
                  <h2 className="text-center">Login</h2>
                </div>
                <form id="forgotForm">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          onChange={handleChange}
                          type="text"
                          name="userName"
                          value={state["userName"]}
                          id="userName"
                          className="form-control"
                          placeholder="Username"
                          required="required"
                        />
                        <p className="help-block text-danger">
                          {errors.userName}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          onChange={handleChange}
                          type="email"
                          name="emailAddress"
                          value={state["emailAddress"]}
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                        <p className="help-block text-danger">
                          {errors.emailAddress}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          onChange={handleChange}
                          type="password"
                          name="password"
                          value={state["password"]}
                          id="password"
                          className="form-control"
                          placeholder="Password"
                          required="required"
                        />
                        <p className="help-block text-danger">
                          {errors.password}
                        </p>
                      </div>
                    </div>
                  </div>
                  {spinner && <Spin />}

                  <div id="success"></div>
                  <button
                    type="submit"
                    onClick={handleLogin}
                    style={{ borderRadius: "0.25rem" }}
                    className="text-white page-scroll cust-btn-primary mt-3"
                  >
                    Login
                  </button>

                  <div class="text-block text-center my-3">
                    <Link
                      to="/forgot"
                      class="text-small forgot-password text-primary"
                    >
                      Forgot Password
                    </Link>
                  </div>
                  <div class="text-block text-center my-3">
                    <span class="text-small font-weight-semibold">
                      New user?
                    </span>
                    <Link
                      to="/registration"
                      className="text-custom-primary text-small"
                    >
                      {" "}
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer handleRoute={handleRoute} />
    </>
  );
};

export default Login;

