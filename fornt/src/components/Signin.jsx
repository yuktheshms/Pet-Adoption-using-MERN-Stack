import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Signin.css";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/CustionFetch";

function Signin(props) {
  const nav = useNavigate();
  const [data, setData] = React.useState({});
  const [admin, isadmin] = React.useState(false);

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if 'data' is empty or undefined
    if (Object.keys(data).length === 0) {
      return toast.error(`Please enter all the credentials`);
    }

    // Check if any field in 'data' is empty
    for (const key in data) {
      if (!data[key]) {
        toast.error(`Please enter all the credentials`);
        return;
      }
    }

    try {
      const res = await CustomFetch.post("/api/petpals/login", data);
      const checkrole = document.querySelector("#Admin").textContent;

      // Check if the response contains the expected data structure
      if (res && res.data) {
        if (checkrole !== res.data.role) {
          if (res.data.success) {
            props.setUid(res.data.uid);
            nav("/");

            localStorage.setItem("Role", res.data.role);
            localStorage.setItem("Login", true);
            localStorage.setItem("userId", res.data.uid);

            props.setRole(localStorage.getItem("Role"));
            props.isLogin(localStorage.getItem("Login"));

            toast.success("Successfully logged in");

            // Reset 'data' to empty object after successful login
            setData({});
          } else {
            // Handle unsuccessful login
          }
        } else {
          toast.error("Wrong username or password");
        }
      } else {
        // Handle unexpected response structure
      }
    } catch (error) {
      console.error(error);

      // Check if error.response exists before accessing its properties
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login");
      }
    }
  };

  const handleAdmin = () => {
    document.querySelector("#goSignup").style.display = "none";
    document.querySelector(".btn-resetpassword").style.display = "none";

    if (!admin) {
      document.querySelector("#Admin").textContent = "user";
      return isadmin(true);
    }
    document.querySelector("#goSignup").style.display = "block";
    document.querySelector(".btn-resetpassword").style.display = "block";
    document.querySelector("#Admin").textContent = "admin";
    isadmin(false);
  };
  return (
    <div id="main-container-signin">
      <div>
        <button
          id="Admin"
          style={{
            position: "absolute",
            top: "15px",
            right: "40px",
            border: "2px solid black",
            backgroundColor: "aqua",
          }}
          onClick={handleAdmin}
        >
          admin
        </button>
      </div>
      <div id="container-signin">
        <div className="box1"></div>
        <div className="box2">
          <h1 style={{ marginBottom: "30px" }} className="text-3xl">
            welcome to PetPals
          </h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div id="inputfield">
              <TextField
                id="standard-basic"
                label={admin ? "admin id" : "Username or E-mail"}
                variant="standard"
                name="UsernameOrEmail"
                className="input  admin"
                required
                onChange={handleData}
              />
              <TextField
                id="outlined-password-input"
                label={admin ? "admin password" : "Password"}
                type="password"
                autoComplete="current-password"
                variant="standard"
                name="password"
                className="input"
                required
                onChange={handleData}
              />
              <button id="btn" onClick={handleLogin}>
                Sign In
              </button>
            </div>
          </Box>
          <Link to="/forgetpassword">
            <p className="btn-resetpassword">Reset Password</p>
          </Link>
          <span id="span-signin">
            <Link to="/Signup" id="goSignup">
              I don't have an account <b>(Signup)</b>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signin;
