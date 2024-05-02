import BreadCrumbs from "../../components/BreadCrumbs";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

import AxiosClient from "../../../axios/AxiosClient";
import Loader from "../../components/Loader";
import {
  getYesterdayFormatted,
  isToday,
  isYesterday,
  separateDateAndTime,
} from "../../utils/DateTime";

const Earnings = () => {
  const [bookingLists, setBookingLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yesterdayDate, setYesterdayDate] = useState();
  const [todayDate, setTodayDate] = useState();
  const [yesterdayTotal, setYesterdayTotal] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosClient.get("/api/owner-bookings");
      console.log("Earnings response data", response.data);
      if (response.data) {
        setLoading(false);
        setBookingLists(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    setTodayDate(currentDate.toISOString().split("T")[0]);
    setYesterdayDate(getYesterdayFormatted());

    let totalYesterdayAmount = 0.0;
    let totalTotalAmount = 0.0;

    bookingLists.forEach((booking) => {
      const createdAt = new Date(booking.created_at);
      if (isYesterday(createdAt)) {
        totalYesterdayAmount += parseFloat(booking.amount_paid);
      }
      if (isToday(createdAt)) {
        totalTotalAmount += parseFloat(booking.amount_paid); // Accumulate amount_paid for bookings made today
      }
    });

    // Set the total amount for yesterday and today after looping through all bookings
    setYesterdayTotal(totalYesterdayAmount);
    setTodayTotal(totalTotalAmount);
  }, [bookingLists]); // Ensure that this effect runs whenever bookingLists changes

  return (
    <div>
      <Header />
      <BreadCrumbs title="Earnings" />
      <div className="loginOuter afterownerLogin">
        <div className="container">
          <div className="dashboardList">
            {/* Today Date */}

            <div className="earningHeader">
              <span>Date : {todayDate}</span>

              <span> Total: ${todayTotal}</span>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                {loading ? (
                  <div className="loader row">
                    <div
                      className="col-lg-12 col-xs-12 "
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "500px",
                      }}
                    >
                      <Loader />
                    </div>
                  </div>
                ) : (
                  <div className="tableListing table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Sl no</th>
                          <th>Name</th>
                          <th>From Date & Time</th>
                          <th>To Date & Time </th>

                          <th>Vehicle Number</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookingLists.map((booking) => {
                          const createdAt = new Date(booking.created_at);

                          // Filter bookings made yesterday
                          if (isToday(createdAt)) {
                            return (
                              <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.user.name}</td>
                                <td>{booking.from_datetime}</td>
                                <td>{booking.to_datetime}</td>

                                <td>{booking.vehicle_number}</td>
                                <td>{booking.amount_paid}</td>
                              </tr>
                            );
                          } else {
                            return null; // Skip if not from yesterday
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <div> </div>
              </div>
            </div>

            {/* Yesterday Date */}
            <div className="earningHeader">
              <span>Date : {yesterdayDate}</span>

              <span> Total: ${yesterdayTotal}</span>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                {loading ? (
                  <div className="loader row">
                    <div
                      className="col-lg-12 col-xs-12 "
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "500px",
                      }}
                    >
                      <Loader />
                    </div>
                  </div>
                ) : (
                  <div className="tableListing table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Sl no</th>
                          <th> Name</th>
                          <th>From Date & Time</th>
                          <th>To Date & Time </th>

                          <th>Vehicle Number</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookingLists.map((booking) => {
                          const createdAt = new Date(booking.created_at);

                          // Filter bookings made yesterday
                          if (isYesterday(createdAt)) {
                            return (
                              <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.user.name}</td>
                                <td>{booking.from_datetime}</td>
                                <td>{booking.to_datetime}</td>

                                <td>{booking.vehicle_number}</td>
                                <td>{booking.amount_paid}</td>
                              </tr>
                            );
                          } else {
                            return null; // Skip if not from yesterday
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <div> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Earnings;
