import Header from "./Header";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AxiosClient from "../../axios/AxiosClient";
import Loader from "./Loader";
import { convertToMySQLDate } from "../utils/DateTime";

const EditBookingSlot = () => {
  const { state } = useLocation();
  console.log("State in edit booking ", state);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState(null);
  // const [apiValue, setApiValue] = useState(null);
  // const [fromDate, setFromDate] = useState(null);
  // const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setData(state);
      setValue("name", state.user.name);
      setValue("from_datetime", state.from_datetime);
      setValue("to_datetime", state.to_datetime);
      setValue("vehicle_name", "suv");
      setValue("vehicle_number", state.vehicle_number);
      setValue("slot", state.slot);
      setValue("amount_paid", state.amount_paid);
      setValue("booked_on", state.booked_on);
      // Set the initial value for the GooglePlacesAutocomplete component
      setValue("total_hours", state.total_hours);

      //   setFromDate(new Date(state.from_date_time));
      //   setToDate(new Date(state.to_date_time));
    }
  }, [state, setValue]);

  useEffect(() => {
    console.log("Errors", errors);
  }, [errors]);

  const onSubmit = async (formData) => {
    console.log("Edit formdata", formData);
    // Handle form submission logic here
    // try {
    //   setLoading(true);
    //   const response = await AxiosClient.put(
    //     `/api/bookings/${data.id}`,
    //     formData
    //   );
    //   console.log("Updated parking spot:", response.data);
    //   if (response.status === 200) {
    //     setLoading(false);

    //     alert("Booking updated successfully!");
    //     navigate("/my-slot-bookings");
    //   }
    // } catch (error) {
    //   console.error("Error updating parking spot:", error);
    //   alert("Failed to update parking spot. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
    setLoading(true);
    try {
      const response = await AxiosClient.post("/api/cancel-booking", {
        booking_id: state.id,
        cancelled_by: "Owner",
        total_hours: state.total_hours,
        cancelled_date: convertToMySQLDate(new Date()),
        refund_status: "Pending",
        reason_for_cancellation: formData.comments, // Assuming this is defined elsewhere
      });

      console.log("Cancel Booking data", response.data);

      if (response.data) {
        setLoading(false);
        alert("Cancelled Booking  successfully!");
        navigate("/my-slot-bookings");
        // Assuming this function fetches updated data
      }

      // Handle success response
    } catch (error) {
      console.error("Error Cancel booking:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <BreadCrumbs title="Edit Booking" />
      <div className="loginOuter afterownerLogin">
        <div className="container">
          <div className="dashboardList">
            <div className="row tabContentOuter">
              <div className="col-lg-12 col-md-12 mx-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <h3>Booking Slot Details</h3>
                  <NavLink to="/my-slot-bookings">Back</NavLink>
                </div>
                <div className="card mb-4 mt-2">
                  <div className="card-body corporateMenu">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-lg-9 col-md-12 mx-auto mt-3">
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Name
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="name"
                                name="name"
                                className="form-control "
                                defaultValue={data?.user.name}
                                {...register("name", {
                                  required: true,
                                })}
                              />
                              {errors?.name && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              From Date & Time
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="designation"
                                name="designation"
                                className="form-control "
                                defaultValue={data?.from_datetime}
                                {...register("from_datetime", {
                                  required: true,
                                })}
                              />
                              {errors?.from_datetime && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              To Date & Time
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="todate"
                                name="todate"
                                className="form-control "
                                defaultValue={data?.to_datetime}
                                {...register("to_datetime", {
                                  required: true,
                                })}
                              />
                              {errors?.to_datetime && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>

                          {/* <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Vehicle Name
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                type="text"
                                id="email"
                                name="email"
                                className="form-control "
                                defaultValue={data?.vehicle_name}
                                {...register("vehicle_name", {
                                  required: true,
                                })}
                              />
                              {errors?.vehicle_name && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div> */}

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Vehicle Number
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="email"
                                name="email"
                                className="form-control "
                                defaultValue={data?.vehicle_number}
                                {...register("vehicle_number", {
                                  required: true,
                                })}
                              />
                              {errors?.vehicle_number && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Slot
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="email"
                                name="email"
                                className="form-control "
                                defaultValue={data?.slot}
                                {...register("slot", {
                                  required: true,
                                })}
                              />
                              {errors?.slot && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                              Amount Paid
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="email"
                                name="email"
                                className="form-control "
                                defaultValue={data?.amount_paid}
                                {...register("amount_paid", {
                                  required: true,
                                })}
                              />
                              {errors?.amount_paid && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                          {/* From Date */}
                          <div className="form-group row">
                            <label
                              htmlFor="from_date_time"
                              className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            >
                              Bookied On{" "}
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="email"
                                name="email"
                                className="form-control "
                                defaultValue={data?.booked_on}
                                {...register("booked_on", {
                                  required: true,
                                })}
                              />
                              {errors?.booked_on && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>

                          {/* To Date */}
                          <div className="form-group row">
                            <label
                              htmlFor="to_date_time"
                              className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            >
                              Total Hours
                            </label>
                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input
                                readOnly
                                type="text"
                                id="email"
                                name="email"
                                className="form-control "
                                defaultValue={data?.total_hours}
                                {...register("total_hours", {
                                  required: true,
                                })}
                              />
                              {errors?.total_hours && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {!cancelBooking && (
                        <div className="row">
                          {" "}
                          <div className="col-lg-3 col-md-12 mx-auto mt-3">
                            <button
                              onClick={() => setCancelBooking(true)} // You need to wrap setCancelBooking with an arrow function to avoid immediate execution
                              className="btn btn-primary btn-sm"
                            >
                              Cancel Booking
                            </button>
                          </div>
                        </div>
                      )}
                      {cancelBooking && (
                        <div className="row">
                          <div className="col-lg-9 col-md-12 mx-auto mt-3">
                            <div className="form-group row">
                              <label
                                htmlFor="to_date_time"
                                className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              >
                                Reason for cancel
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <textarea
                                  id="comments"
                                  name="comments"
                                  rows={3} // Specify the number of visible text lines
                                  className="form-control"
                                  {...register("comments", {
                                    required: true,
                                  })}
                                ></textarea>
                                {errors?.comments && (
                                  <span className="text-danger">
                                    This field is required
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-12 offset-lg-4">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-sm"
                                >
                                  {loading ? (
                                    <div className="loader">
                                      <Loader />
                                    </div>
                                  ) : (
                                    "Cancel Booking"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                {/* <h3> Vehicle Types &amp; Fees</h3>
                  <div className="card mb-4 mt-2">
                    <div className="card-body corporateMenu">
                      <form name="addUser" id="addUser">
                        <div className="row">
                          <div className="col-lg-9 col-md-12 mx-auto mt-3">
                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Vehicle Types
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <select className="form-control">
                                  <option defaultValue="Hatchback">Hatchback</option>
                                  <option value="Sedan">Sedan</option>
                                  <option value="SUVs">SUVs</option>
                                </select>
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                Parking Fees
                              </label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="row">
                                  <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 col-xs-12 perhourfields">
                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        Per Hour
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        4 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        8 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        12 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>

                                    <div>
                                      
                                      <label className="checkboxField">
                                        
                                        24 Hours
                                        <input
                                          type="checkbox"
                                          checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <span className="perhoursfees">
                                        
                                        $
                                        <input
                                          type="text"
                                          id="email"
                                          name="email"
                                          className="form-control "
                                          value=""
                                          placeholder=""
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"></label>
                              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <span
                                  className="label"
                                  style={{
                                    display: "block",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                  }}
                                >
                                  + Add Vehicle
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
      <Footer />
    </div>
  );
};

export default EditBookingSlot;
