import Header from "../../components/Header";
import BreadCrumbs from "../../components/BreadCrumbs";
import Footer from "../../components/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AxiosClient from "../../../axios/AxiosClient";
import Loader from "../../components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    // password_confirmation: "",
    // mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true); // Set loading state to true when API call sta
      await AxiosClient.get("/sanctum/csrf-cookie");
      const { username, email, password, password_confirmation, mobile } =
        formData;
      const { data, statusText, message, status } = await AxiosClient.post(
        "/api/auth/adminregister",
        {
          username,
          email,
          password,
          //   password_confirmation,
          //   mobile,
        }
      );

      if (status === 201) {
        console.log("message", message);
        console.log("message data", data);
        setIsRegistered(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          //   password_confirmation: "",
          //   mobile: "",
        });
        localStorage.setItem("isOwnerAuthenticated", true);
        localStorage.setItem("ACCESS_TOKEN", data.access_token);
        navigate("/dashboard");
      }
      if (status !== 201) {
        console.log("message", message);
        setError(message);
      }
    } catch (err) {
      console.error("catching error", err);
      setError("Interval server error");
    } finally {
      setLoading(false); // Set loading state to false when API call completes
    }
  };

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = (formData) => {
    let errors = {};
    if (!formData.username) {
      errors.username = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    // if (!formData.mobile) {
    //   errors.mobile = "Mobile number is required";
    // } else if (!/^\d{10}$/.test(formData.mobile)) {
    //   errors.mobile = "Mobile number must be 10 digits";
    // }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    // if (!formData.password_confirmation) {
    //   errors.password_confirmation = "Confirm Password is required";
    // } else if (formData.password_confirmation !== formData.password) {
    //   errors.password_confirmation = "Passwords do not match";
    // }
    return errors;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="row mb-2">
              <label
                htmlFor="inputEmail3"
                className="col-xl-5 col-lg-12 col-sm-5 col-md-12 col-form-label"
              >
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-lg-12 col-sm-12 col-md-12">
                <input
                  type="text"
                  className="form-control"
                  value={formData.username}
                  name="username"
                  onChange={handleInput}
                />
                {errors.username && (
                  <div className="text-danger small">{errors.username}</div>
                )}
              </div>
            </div>

            <div className="row mb-2">
              <label
                htmlFor="inputEmail3"
                className="col-xl-5 col-lg-12 col-sm-5 col-md-12 col-form-label"
              >
                Email Id<span style={{ color: "red" }}>*</span>
              </label>
              <div className=" col-lg-12 col-sm-12 col-md-12">
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  name="email"
                  onChange={handleInput}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>
            </div>

            {/* <div className="row mb-2">
                        <label
                          htmlFor="inputEmail3"
                          className="col-xl-5 col-lg-5 col-sm-5 col-md-12 col-form-label"
                        >
                          Mobile{" "}
                        </label>
                        <div className="col-lg-6 col-lg-6 col-sm-12 col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder=""
                          />
                        </div>
                      </div> */}

            <div className="row mb-2">
              <label
                htmlFor="inputEmail3"
                className="col-xl-5 col-lg-12 col-sm-5 col-md-12 col-form-label"
              >
                Password<span style={{ color: "red" }}>*</span>
              </label>
              <div className="col-lg-12 col-sm-12 col-md-12">
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  name="password"
                  onChange={handleInput}
                />
                {errors.password && (
                  <div className="text-danger small">{errors.password}</div>
                )}
              </div>
            </div>

            {/* <div className="row mb-2">
                        <label
                          htmlFor="inputEmail3"
                          className="col-xl-5 col-lg-5 col-sm-5 col-md-12 col-form-label"
                        >
                          Confirm Password{" "}
                        </label>
                        <div className="col-lg-6 col-lg-6 col-sm-12 col-md-12">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder=""
                          />
                        </div>
                      </div> */}

            <div className="row mb-2">
              <div className="col-lg-8 col-lg-12 col-sm-12 col-md-12 offset-lg-5">
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <div className="loader">
                      <Loader />
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
