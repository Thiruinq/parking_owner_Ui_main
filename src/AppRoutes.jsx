import { Navigate, Route, Routes } from "react-router-dom";

import ParkingSpots from "./admin/pages/ParkingSpots";
import AddParkingSpots from "./admin/components/AddParkingSpots";
import ViewParkingSpots from "./admin/components/ViewParkingSpots";
import EditParkingSpot from "./admin/components/EditParkingSpot";
import MyBookingSlots from "./admin/pages/MyBookingSlots";
import ViewBookingSlot from "./admin/components/ViewBookingSlot";
import EditBookingSlot from "./admin/components/EditBookingSlot";
import Earnings from "./admin/pages/Earnings";

import Register from "./admin/pages/Register/index.jsx";
import NotFound from "./admin/pages/Notfound/index.jsx";
import Home from "./admin/pages/Home/index.jsx";
import AdminLogin from "./admin/pages/AdminLogin/index.jsx";
import Dashboard from "./admin/pages/Dashboard/index.jsx";
import ViewCancelledBooking from "./admin/components/ViewCancelledBooking.jsx";

const AuthenticatedRoute = ({ children }) => {
  // const auth = useAuthContext();

  return localStorage.getItem("isOwnerAuthenticated") === "true" ? (
    <>{children}</>
  ) : (
    // <Navigate to="/login" />
    <Navigate to="/" />
  );
  // return <>{children}</>;
};

const UnAuthenticatedRoute = ({ children }) => {
  // const auth = useAuthContext();
  return localStorage.getItem("isOwnerAuthenticated") === "true" ? (
    <Navigate to="/" />
  ) : (
    <>{children}</>
  );
  // return <>{children}</>;
};

const PublicRoutes = ({ children }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <UnAuthenticatedRoute>
            <AdminLogin />
          </UnAuthenticatedRoute>
        }
      ></Route>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/register"
        element={
          <UnAuthenticatedRoute>
            <Register />
          </UnAuthenticatedRoute>
        }
      ></Route>
      <Route
        path="*"
        element={
          <UnAuthenticatedRoute>
            <NotFound />
          </UnAuthenticatedRoute>
        }
      ></Route>
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <AuthenticatedRoute>
            <Dashboard />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/parking-spots"
        element={
          <AuthenticatedRoute>
            <ParkingSpots />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/add-parking-spots"
        element={
          <AuthenticatedRoute>
            <AddParkingSpots />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/view-parking-spot"
        element={
          <AuthenticatedRoute>
            <ViewParkingSpots />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/edit-parking-spot"
        element={
          <AuthenticatedRoute>
            <EditParkingSpot />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/my-slot-bookings"
        element={
          <AuthenticatedRoute>
            <MyBookingSlots />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/view-booking-slot"
        element={
          <AuthenticatedRoute>
            <ViewBookingSlot />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/edit-booking-slot"
        element={
          <AuthenticatedRoute>
            <EditBookingSlot />
          </AuthenticatedRoute>
        }
      />

      <Route
        path="/earnings"
        element={
          <AuthenticatedRoute>
            <Earnings />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/view-cancelled-booking"
        element={
          <AuthenticatedRoute>
            <ViewCancelledBooking />
          </AuthenticatedRoute>
        }
      />

      {/* <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <ParkingSpots />
          </AuthenticatedRoute>
        }
      /> */}
      <Route path="*" element={<PublicRoutes />} />
    </Routes>
  );
};
export default AppRoutes;
