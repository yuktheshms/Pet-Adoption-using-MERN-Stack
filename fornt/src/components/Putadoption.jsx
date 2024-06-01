import React, { useState, useEffect } from "react";
import "./Putadoption.css";
import petData from "./data.json";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/CustionFetch";

const PutAdoption = () => {
  const [formData, setFormData] = useState({
    petType: "",
    petName: "",
    breed: "",
    age: "",
    description: "",
    image: "",
    friendlyWithKids: false,
    reasonForAdoption: "",
    anyIllness: "",
  });

  const { cats, dogs } = petData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    // console.log(formData);
  }, [formData]);
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataString = reader.result;
      setFormData({
        ...formData,
        image: imageDataString,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    CustomFetch.post("/api/form/insert", formData)
      .then((res) => {
        // console.log(res.data);
        setFormData({
          petType: "",
          petName: "",
          breed: "",
          age: "",
          description: "",
          image: "",
          friendlyWithKids: false,
          reasonForAdoption: "",
          anyIllness: "",
        });
        toast.success("successfully submitted");
      })
      .catch((err) => {
        console.error("Error submitting form data:", err);
        toast.success("unsuccessfully submitted");
      });
  };

  return (
    <div id="putAdoption">
      <h1 className="font-bold text-2xl">Put Adoption</h1>
      <h2>Please fill correct information</h2>
      <form onSubmit={handleSubmit} id="adoptionfrom">
        <label htmlFor="petType">Pet Type:</label>
        <select
          id="petType"
          name="petType"
          onChange={handleChange}
          required
          value={formData.petType}
        >
          <option value="">Select Pet Type</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>

        <label htmlFor="petName">Pet Name:</label>
        <input
          type="text"
          id="petName"
          name="petName"
          onChange={handleChange}
          required
          value={formData.petName}
        />

        <label htmlFor="breed">Breed:</label>
        <select
          id="breed"
          name="breed"
          onChange={handleChange}
          required
          value={formData.breed}
        >
          <option value="">Select a Pet</option>
          <optgroup label="Cats">
            {cats.map((cat, index) => (
              <option key={index} value={cat.breed}>
                {cat.breed}
              </option>
            ))}
          </optgroup>
          <optgroup label="Dogs">
            {dogs.map((dog, index) => (
              <option key={index} value={dog.breed}>
                {dog.breed}
              </option>
            ))}
          </optgroup>
        </select>

        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          onChange={handleChange}
          required
          value={formData.age}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
        ></textarea>

        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handlePhotoChange}
          required
        />

        <label htmlFor="friendlyWithKids">Friendly With Kids:</label>
        <input
          type="checkbox"
          id="friendlyWithKids"
          name="friendlyWithKids"
          onChange={handleCheckboxChange}
          checked={formData.friendlyWithKids}
        />

        <label htmlFor="reasonForAdoption">Reason For Adoption:</label>
        <textarea
          id="reasonForAdoption"
          name="reasonForAdoption"
          onChange={handleChange}
          required
          value={formData.reasonForAdoption}
        ></textarea>

        <label htmlFor="anyIllness">Any Illness:</label>
        <input
          type="text"
          id="anyIllness"
          name="anyIllness"
          onChange={handleChange}
          required
          value={formData.anyIllness}
        />

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PutAdoption;
