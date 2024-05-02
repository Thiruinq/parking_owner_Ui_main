import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";

import { NavLink, useNavigate } from "react-router-dom";
import AxiosClient from "../../../axios/AxiosClient";
import { confirmAlert } from "react-confirm-alert";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [trimmedText, setTrimmedText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosClient.get("/api/owner-parking-spots");
      console.log("response owner data", response.data);
      if (response.data) {
        setLoading(false);
        setParkingSpots(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (data) => {
    navigate("/view-parking-spot", { state: data });
  };

  const handleEdit = (data) => {
    navigate("/edit-parking-spot", { state: data });
  };

  const handleDelete = async (id) => {
    // Display confirmation dialog before deleting
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this parking spot?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              // Send a DELETE request to the server to delete the parking spot with the given ID
              await AxiosClient.delete(`/api/parking-spots/${id}`);
              // Remove the deleted parking spot from the local state
              setParkingSpots(
                parkingSpots.filter((parkingSpot) => parkingSpot.id !== id)
              );
              console.log("Parking spot deleted successfully");
            } catch (error) {
              console.error("Error deleting parking spot:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <Header />
      <BreadCrumbs title="My Parking Slots" />
      <div className="loginOuter afterownerLogin">
        <div className="container">
          <div className="dashboardList">
            <div className="addslotBtn">
              <div className="float-end">
                <NavLink to="/add-parking-spots" className="btn btn-primary">
                  Add Parking Slot
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mx-auto">
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
                          <th>Slot Name</th>
                          <th>Available Time</th>
                          <th>Place</th>
                          {/* <th style={{ width: "10%" }}>Latitude</th>
                          <th style={{ width: "10%" }}>Longitude</th> */}
                          <th>Photos</th>
                          {/* <th style={{ width: "20%" }}>Nearby Place</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {parkingSpots.length ? (
                          parkingSpots.map((parkingSpot, index) => (
                            <tr key={parkingSpot.id}>
                              <td>{index + 1}</td>
                              <td>{parkingSpot.slot_name}</td>
                              <td>{parkingSpot.available_time}</td>
                              <td style={{ textWrap: "balance" }}>
                                {parkingSpot.google_map}
                              </td>
                              {/* <td>{parkingSpot.latitude}</td>
                            <td>{parkingSpot.longitude}</td> */}

                              <td>
                                <div style={{ display: "flex" }}>
                                  {parkingSpot.photos.map((photo) => (
                                    <div key={photo.id}>
                                      <img
                                        style={{
                                          height: "20px",
                                          width: "25px",
                                        }}
                                        src={`${
                                          import.meta.env.VITE_APP_BASE_URL
                                        }/storage/${photo.photo_path.slice(6)}`}
                                        alt="Parking Spot"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </td>
                              {/* <td>{parkingSpot.nearby_places}</td> */}

                              <td>
                                <i
                                  className="fa fa-eye"
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleClick(parkingSpot)}
                                ></i>
                                {/* 
                              <NavLink
                                to="/edit-parking-spot"
                                className="viewLink"
                              >
                                <i className="fa fa-pencil"></i>
                              </NavLink> */}
                                <i
                                  style={{
                                    marginRight: "5px",
                                    cursor: "pointer",
                                  }}
                                  className="fa fa-pencil text-success "
                                  onClick={() => handleEdit(parkingSpot)}
                                ></i>
                                <i
                                  className="fa fa-trash text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(parkingSpot.id)}
                                ></i>
                                <NavLink
                                  to="/my-slot-bookings"
                                  style={{
                                    marginLeft: "13px",
                                    color: "#ff7902",
                                    fontSize: "14px",
                                  }}
                                >
                                  View Booking
                                </NavLink>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                              {" "}
                              Data not found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ParkingSpots;
