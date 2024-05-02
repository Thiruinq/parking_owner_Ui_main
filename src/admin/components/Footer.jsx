import React from "react";
import FooterLogo from "../../assets/images/footerlogo.jpg";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <img src={FooterLogo} className="footerlogo img-fluid" />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="quickLinks">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">About us</a>
                </li>
                <li>
                  <a href="">Parking </a>
                </li>
                <li>
                  <a href="">Contact us </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Connect with us</h3>
            <address>
              <p>L: Florida, South America</p>
              <p>T: +91 9876543210</p>
              <p>
                E:{" "}
                <a href="mailto:info@parkinmydriveway.com">
                  info@parkinmydriveway.com
                </a>
              </p>
            </address>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Follow with us</h3>
            <div className="socialMedia">
              <a href="">
                <i className="fa fa-phone"></i>
              </a>{" "}
              <a href="">
                <i className="fa fa-facebook-f"></i>
              </a>{" "}
              <a href="">
                <i className="fa fa-instagram"></i>
              </a>{" "}
              <a href="">
                <i className="fa fa-youtube"></i>
              </a>{" "}
              <a href="">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="copyrights">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              © 2024 Park in my driveway. All rights reserved.
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="copyrighttext">
                <a
                  href="https://inqtechnologies.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Powered by InQ Technologies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
