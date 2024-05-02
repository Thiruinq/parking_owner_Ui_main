import { useEffect, useState } from "react";

import Footer from "./Footer";
import { NavLink, useLocation } from "react-router-dom";
import Header from "./Header";
import BreadCrumbs from "./BreadCrumbs";
import { getDateOnly } from "../utils/DateTime";

const ViewParkingSpots = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(state);
  }, [state]);
  return (
    <>
      <Header />
      <BreadCrumbs title="View Bookings" />
      <div className="loginOuter afterownerLogin">
        <div className="container">
          <div className="dashboardList">
            <div className="row tabContentOuter">
              <div className="col-lg-12 col-md-12 mx-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <h3>Parking Slot Details</h3>
                  <NavLink to="/parking-spots">Back</NavLink>
                </div>
                <div className="card mb-4 mt-2">
                  <div className="card-body corporateMenu">
                    <div className="row">
                      <div className="col-lg-9 col-md-12 mx-auto mt-3">
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Slot Name
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">{data?.slot_name}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Available Time
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">
                              {data?.available_time}
                            </span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Photos
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">
                              {data?.photos &&
                                data?.photos.map((item) => {
                                  return (
                                    <img
                                      style={{
                                        height: "100px",
                                        width: "120px",
                                      }}
                                      key={item.id}
                                      src={`${
                                        import.meta.env.VITE_APP_BASE_URL
                                      }/storage/${item.photo_path.slice(6)}`}
                                      alt={item.id}
                                    />
                                  );
                                })}
                            </span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Google map
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">{data?.google_map}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Latitude
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">{data?.latitude}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Longitude
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">{data?.longitude}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Available Slots
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">
                              {data?.available_slots}
                            </span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            From Date
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">
                              {data?.from_date_time &&
                                getDateOnly(data?.from_date_time)}
                            </span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            To Date
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">
                              {data?.to_date_time &&
                                getDateOnly(data?.to_date_time)}
                            </span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Vehicle Fee
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">{data?.vehicle_fees}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            Comment
                          </label>
                          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span className="label">{data?.nearby_places}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <h3>Vehicle Types &amp; Fees</h3>
                  <div className="card mb-4 mt-2">
                    <div className="card-body corporateMenu">
                      <form
                        name="addUser"
                        id="addUser"
                        className="ng-pristine ng-valid ng-isolate-scope"
                        noValidate="noValidate"
                      >
                        <div className="row">
                          <div className="col-lg-9 col-md-12 mx-auto mt-3">
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Vehicle Types
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <span className="label">Sedan</span>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Parking Fees
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <span className="label">
                                  1 hour - $10
                                  <br />
                                  4 hours - $35
                                  <br />
                                  8 hours - $65
                                  <br />
                                  12 hours - $125
                                  <br />
                                  24 hours - $200
                                </span>
                              </div>
                            </div>
                            <hr />
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Vehicle Types
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <span className="label">SUV</span>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Parking Fees
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <span className="label">
                                  1 hour - $20
                                  <br />
                                  4 hours - $30
                                  <br />
                                  8 hours - $70
                                  <br />
                                  12 hours - $120
                                  <br />
                                  24 hours - $220
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />;
    </>
  );
};

export default ViewParkingSpots;
