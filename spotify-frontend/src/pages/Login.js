import React, { useState } from "react";
import "../login.css"; // Ensure your CSS file is properly linked
import axios from "axios"; // Axios for HTTP requests

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isSignup) {
        // Validate confirm password
        console.log("pass",formData.password );
        console.log("conpass",formData.confirmPassword);
        if (formData.password !== formData.confirmPassword) {
          setMessage("Passwords do not!");
          return;
        }

        // Send registration request
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          email: formData.email,
          password: formData.password,
        });
        setMessage(res.data.message || "Registration successful!");
      } else {
        // Send login request
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // Handle login success
        setMessage(res.data.message || "Login successful!");
        localStorage.setItem("token", res.data.token); // Save JWT token
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="message">{message && <p>{message}</p>}</div>
      {isSignup ? (
        <div className="signup-container">
          <div className="logo">
            <img src="/images/Spotify-logo.png" alt="Spotify Logo" />
          </div>
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address or Mobile number</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-signup">
              SIGN UP
            </button>
          </form>
          <div className="login">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Log in
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <div className="logo">
            <img src="/images/Spotify-logo.png" alt="Spotify Logo" />
          </div>
          <h2>LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address or username or Mobile.no</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="options">
              <div>
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" className="btn-login">
              LOG IN
            </button>
          </form>
          <div className="divider">OR</div>
          <button className="btn-social btn-facebook">Continue with Facebook</button>
          <button className="btn-social btn-google">Continue with Google</button>
          <button className="btn-social btn-apple">Continue with Apple</button>
          <div className="signup">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Sign up for Spotify
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
