import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import BreadCrumbs from "../../components/BreadCrumbs";
import Header from "../../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-parking-spots");
  };

  return (
    <>
      <Header />
      <BreadCrumbs title="Dashboard" />
      <div className="loginOuter afterownerLogin">
        <div className="container">
          <div className="dashboardList">
            <div className="row">
              <div className="mb-5 col-xl-7 col-md-7 mx-auto">
                <div className="py-2 shadow card border-left-primary h-100">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="mr-2 col">
                        <div className="text-center text-xs font-weight-bold text-primary">
                          <h3>Welcome to Park In My Driveway</h3>
                          You dont have slots, please{" "}
                          <a
                            onClick={handleClick}
                            style={{ cursor: "pointer" }}
                            className="cursor text-underline"
                          >
                            add slots
                          </a>
                          to get bookings.
                        </div>
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
    </>
  );
};

export default Dashboard;
