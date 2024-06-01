import React, { useState } from "react";
import "./resetPassword2.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/CustionFetch";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    repassword: "",
  });

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const passw = data.password;
    const repassw = data.repassword;
    if (passw !== repassw) {
      toast.success("Password and re-entered password do not match");
      return;
    }

    if (data.password.length < 8) {
      toast.success("password should contain at least 8 characters");
      return;
    }
    CustomFetch.put(`/api/petpals/resetPassword/${token}`, data)
      .then((response) => {
        // console.log(response.data);
        toast.success("Password reset successful");

        navigate("/signin");
      })
      .catch((error) => {
        toast.success("Password reset unsuccessful");

        console.error("Error resetting password:", error);
      });
  };

  return (
    <div id="resetpassw">
      <h1 className="text-3xl pt-10">Reset Your Password</h1>
      <label htmlFor="password">Enter your new password :</label>
      <input
        type="password"
        required
        name="password"
        value={data.password}
        onChange={handleChange}
      />
      <label htmlFor="repassword">Re-enter your new password :</label>
      <input
        type="password"
        required
        name="repassword"
        value={data.repassword}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} className="btn">
        Change Password
      </button>
    </div>
  );
};

export default ResetPassword;
