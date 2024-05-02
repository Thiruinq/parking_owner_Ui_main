import Header from "../../components/Header";
import BreadCrumbs from "../../components/BreadCrumbs";
import Footer from "../../components/Footer";
import Icon1 from "../../../assets/images/l-icon1.png";
import Icon2 from "../../../assets/images/l-icon2.png";
import Icon3 from "../../../assets/images/l-icon3.png";
import Google from "../../../assets/images/google.png";
import Fbicon from "../../../assets/images/fb.png";
import Apple from "../../../assets/images/apple.png";
import { useState } from "react";
import AdminLogin from "../AdminLogin";
import Register from "../Register";

const Home = () => {
  const [logginClicked, setLogginClicked] = useState(false);

  const [signUpClicked, setSignUpClicked] = useState(false);

  return (
    <div>
      <Header />
      <BreadCrumbs title="Parking Spot Owners" />
      <div className="loginOuter">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="card px-3">
                <div className="row reviewBookingOuter">
                  <div className="col-lg-6 col-md-12 card-body border-end">
                    <div className="reviewDetails">
                      <div className="loginList mb-2">
                        <h4>Park In My Driveway</h4>
                        <ul>
                          <li>
                            Do you Live near a concert venue, stadium or an area
                            with limited parking ?
                          </li>
                          <li>
                            Rent out your driveway to people who want to park
                            for upto $20/day
                          </li>
                          <li>We want to be the AirBnb for Parking</li>
                        </ul>
                      </div>

                      <div className="loginListBtm">
                        <ul>
                          <li>
                            <img src={Icon1} className="img-fluid" />
                            <strong>Tech Driven Parking</strong>
                          </li>
                          <li>
                            <img src={Icon2} className="img-fluid" />
                            <strong>Driven By Innovation</strong>
                          </li>
                          <li>
                            <img src={Icon3} className="img-fluid" />
                            <strong>Rent Out Your Driveway</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 card-body">
                    <div
                      id="form-credit-card"
                      className="bg-lighter rounded  mb-3"
                    >
                      <h4 className="">Let's gets started</h4>

                      <div className="row">
                        <div className="col-lg-4 mb-2">
                          <div className="loginasIcon">
                            <a>
                              <img src={Google} />
                            </a>
                          </div>
                        </div>

                        <div className="col-lg-4 mb-2">
                          <div className="loginasIcon">
                            <a>
                              <img src={Fbicon} />
                            </a>
                          </div>
                        </div>

                        <div className="col-lg-4 mb-2">
                          <div className="loginasIcon">
                            <a>
                              <img src={Apple} />
                            </a>
                          </div>
                        </div>
                        {!logginClicked && (
                          <div className="col-xl-12 col-md-12 mb-2">
                            <div className="loginasIcon">
                              <a
                                style={{ cursor: "pointer" }}
                                className="cursor"
                                onClick={() => {
                                  setLogginClicked(true);
                                  setSignUpClicked(false);
                                }}
                              >
                                Login with email
                              </a>
                            </div>
                          </div>
                        )}
                        {logginClicked && <AdminLogin />}
                        {signUpClicked && <Register />}

                        {!signUpClicked && (
                          <>
                            <div className="col-xl-12 col-md-12 mb-2">
                              <div className="loginasIcon text-center">or</div>
                            </div>
                            <div className="col-xl-12 col-md-12 mb-2">
                              <div className="loginasIcon">
                                <a
                                  className="cursor"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setLogginClicked(false);
                                    setSignUpClicked(true);
                                  }}
                                >
                                  Signup with email
                                </a>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
