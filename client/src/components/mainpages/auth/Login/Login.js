/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("fristLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form
        className="mx-auto my-4"
        style={{ maxWidth: "600px", padding: "30px", paddingTop: "100px" }}
        onSubmit={loginSubmit}
      >
        <h3
          style={{
            textTransform: "uppercase",
            color: "#363636",
            fontSize: "30px",
          }}
        >
          login now
        </h3>
        <div className="form-group" style={{ marginTop: "20px" }}>
          <label style={{ letterSpacing: "0.5px", color: "#555" }}>
            Email address
          </label>
          <input
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            required
            value={user.email}
            onChange={onChangeInput}
          />
          <div
            style={{ letterSpacing: "1px", color: "#555", fontSize: "14px" }}
          >
            We will never share your email with anyone else.
          </div>
        </div>
        <div className="form-group" style={{ marginTop: "5px" }}>
          <label style={{ letterSpacing: "0.5px", color: "#555" }}>
            Password
          </label>
          <input
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
            autoComplete="on"
            name="password"
            alue={user.password}
            onChange={onChangeInput}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            height: "45px",
            backgroundColor: "#333",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <a
            style={{
              color: "white",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Login
          </a>
        </button>
        <p
          className="my-2"
          style={{
            marginTop: "5px",
            letterSpacing: "1px",
            color: "#555",
            fontSize: "14px",
          }}
        >
          You dont have an account?
          <Link
            to="/register"
            style={{
              marginTop: "5px",
              letterSpacing: "1px",
              color: "red",
              fontSize: "14px",
            }}
          >
            Register Now
          </Link>
        </p>
      </form>
      <div className="img">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
          alt="login form"
          className="img-fluid"
        />
      </div>
    </div>
  );
}

export default Login;
