import React, { useState } from "react";
import "./AdoptionForm.css";
import { Link } from "react-router-dom";
import { CustomFetch } from "../axios/CustionFetch";
import { toast } from "react-toastify";

const AdoptionForm = (props) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    experience: "",
    petsOwned: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    document.querySelector(".adpotion-form-submitted").style.display = "flex";
    document.querySelector(".adoption-form-container").style.display = "none";
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      reqpet: props.reqpet,
      uid: props.uid,
    };

    CustomFetch.post("/api/request/insert", updatedFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      reason: "",
      experience: "",
      petsOwned: "",
    });
    toast.success("successfully submitted");
  };

  return (
    <>
      <div className="adpotion-form-submitted">
        <h1 className="text-3xl pt-60">Thank You</h1>
        <p>we will contact you soon</p>
        <Link to="/Find_a_pet">
          <button className="btn">Back</button>
        </Link>
      </div>
      <div className="adoption-form-container">
        <h2>Adoption Application Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Reason for Adoption:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Experience with Pets:</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Number of Pets Currently Owned:</label>
            <input
              type="number"
              name="petsOwned"
              value={formData.petsOwned}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit Application</button>
        </form>
      </div>
    </>
  );
};

export default AdoptionForm;
