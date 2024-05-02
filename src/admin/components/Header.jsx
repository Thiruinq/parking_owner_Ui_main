import Logo from "../../assets/images/logo.png";
import MobileLogo from "../../assets/images/mobile-logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isOwnerAuthenticated");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <section className="main-header">
      <div className="container">
        <nav className="navbar navbar-default navbar-expand-lg ">
          <div className="navbar-header">
            <a className="navbar-brand">
              <NavLink to="/dashboard">
                <img src={Logo} className="logo" />
              </NavLink>
              <NavLink to="/dashboard">
                <img src={MobileLogo} className="mobile-logo" />
              </NavLink>
            </a>
            <button
              type="button"
              className="navbar-toggle collapsed navbar-toggler"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {isLoggedIn && (
            <div
              className="collapse navbar-collapse lateral-left"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="navbar-nav">
                <NavLink
                  exact
                  to="/parking-spots"
                  className="nav-item"
                  activeClassName="active"
                >
                  <a className="nav-link anchor-link">My Parking Spots</a>
                </NavLink>
                {/* <NavLink
                to="/parking-spots"
                className="nav-item"
                activeClassName="active"
              >
                <a className="nav-link anchor-link">My Parking spots</a>
              </NavLink> */}

                <NavLink
                  to="/my-slot-bookings"
                  className="nav-item"
                  activeClassName="active"
                >
                  <a className="nav-link anchor-link">My Slot booking</a>
                </NavLink>

                <NavLink
                  to="/earnings"
                  className="nav-item"
                  activeClassName="active"
                >
                  <a className="nav-link anchor-link">Earnings</a>
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline"
                >
                  Logout
                </button>
              </ul>
              <div className="menu-btn-group">
                {/* <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline"
              >
                Logout
              </button> */}
                {/* <button type="button" className="btn btn-primary">
                List your Driveway
              </button>
              <button type="button" className="btn btn-secondary">
                Parking Owners Logins
              </button> */}
              </div>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
}

export default Header;
