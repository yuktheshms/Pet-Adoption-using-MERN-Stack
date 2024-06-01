import React, { useState } from "react";
import "./resetpassword.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/CustionFetch";

const Resetpassword = () => {
  const [submit, isSubmit] = useState(false);
  const [email, setEmail] = useState(null);
  const handleSubmit = () => {
    CustomFetch.post("/api/petpals/forgetPassword", {
      email: email,
    })
      .then((res) => {
        console.log(res.data);
        isSubmit(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      {submit ? (
        <div id="reset-pass">
          <h1 className="text-3xl pt-8">Thank you</h1>
          <p>please check your email</p>
          <Link to="/signin">
            <button className="btn">Back</button>
          </Link>
        </div>
      ) : (
        <div id="reset-pass">
          <h1 className="text-3xl font-bold pt-10"> your will get a Email</h1>
          <label for="resetpassword">enter your Email</label>
          <input
            type="email"
            naem="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <button className="btn" onClick={handleSubmit}>
            Send Email
          </button>
        </div>
      )}
    </>
  );
};

export default Resetpassword;
