import React, { useState } from "react";
import "./Putadoption.css";
import petData from "./data.json";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/CustionFetch";
import MainCard from "./MainCard";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Putaadoption = () => {
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

  const category = ["dog", "cat"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    if (
      formData.petType === "" ||
      formData.petName === "" ||
      formData.breed === "" ||
      formData.age === "" ||
      formData.description === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    CustomFetch.post("/api/form/insert", formData)
      .then((res) => {
        // console.log(res.data);
        setFormData({
          petType: "None",
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
        // console.error("Error submitting form data:", err);
        toast.success("unsuccessfully");
      });
  };

  return (
    <div>
      <Box style={{ padding: 20 }}>
        <Box>{/* <Category /> */}</Box>
        <MainCard title="Add Pet Details" style={{ marginTop: "10px" }}>
          <FormControl sx={{ m: 1, width: "110ch", mt: 3 }}>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              value={formData.petType}
              onChange={handleChange}
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="petType"
              label="Tax Percentage"
            >
              {category.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: "110ch", mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Select Breed</InputLabel>
            <Select
              value={formData.breed}
              onChange={handleChange}
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="breed"
              label="Tax Percentage"
            >
              <h2> Cats</h2>

              {cats.map((cat, index) => (
                <MenuItem key={index} value={cat.breed}>
                  {" "}
                  {cat.breed}
                </MenuItem>
              ))}
              <h2> Dogs</h2>

              {dogs.map((dog, index) => (
                <MenuItem key={index} value={dog.breed}>
                  {" "}
                  {dog.breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "54ch" },
              }}
            >
              <TextField
                id="outlined-basic"
                onChange={handleChange}
                label="pet Name  "
                name="petName"
                variant="outlined"
                value={formData.petName}
              />
              <TextField
                id="outlined-basic"
                onChange={handleChange}
                label="Any disease"
                name="anyIllness"
                variant="outlined"
                value={formData.anyIllness}
              />
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "54ch" },
              }}
            >
              <TextField
                id="outlined-basic"
                onChange={handleChange}
                label="Age in years"
                name="age"
                variant="outlined"
                value={formData.age}
              />
              <TextField
                id="outlined-basic"
                onChange={handleChange}
                label="Reason For Adoption"
                name="reasonForAdoption"
                variant="outlined"
                value={formData.reasonForAdoption}
              />
            </Box>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Friendly With Kids"
                name="friendlyWithKids"
                onChange={handleCheckboxChange}
                checked={formData.friendlyWithKids}
              />
            </FormGroup>
          </FormControl>

          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "110ch" },
            }}
          >
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                onChange={handlePhotoChange}
                type="file"
                name="photo"
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "110ch" },
            }}
          >
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-static"
                onChange={handleChange}
                value={formData.description}
                name="description"
                label="Pet Description....."
                multiline
                rows={4}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              "& .MuiButton-root": { m: 1, width: "122ch" },
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              put for adoption
            </Button>
          </Box>
        </MainCard>
      </Box>
    </div>
  );
};
export default Putaadoption;
