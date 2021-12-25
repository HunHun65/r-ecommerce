/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("fristLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="register-page">
      <form
        className="mx-auto my-4"
        style={{ maxWidth: "600px", padding: "30px", paddingTop: "100px" }}
        onSubmit={registerSubmit}
      >
        <h3
          style={{
            textTransform: "uppercase",
            color: "#363636",
            fontSize: "30px",
          }}
        >
          REGISTER
        </h3>
        <div className="form-group" style={{ marginTop: "20px" }}>
          <label style={{ letterSpacing: "0.5px", color: "#555" }}>Name</label>
          <input
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "5px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            type="text"
            className="form-control"
            name="name"
            required
            value={user.name}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group" style={{ marginTop: "5px" }}>
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
            style={{
              letterSpacing: "1px",
              color: "#555",
              fontSize: "14px",
              marginBottom: "5px",
            }}
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
            Register
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
          Already an account!!!!
          <Link
            to="/login"
            style={{
              marginTop: "5px",
              letterSpacing: "1px",
              color: "red",
              fontSize: "14px",
            }}
          >
            Login Now
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

export default Register;
