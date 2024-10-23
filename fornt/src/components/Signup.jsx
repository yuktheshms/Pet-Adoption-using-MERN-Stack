import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Signup.css";
import img from "../img/download.jpeg";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CustomFetch } from "../axios/CustionFetch";
import { toast } from "react-toastify";

function Signup() {
    const [country, setCountry] = useState("");
    const [data, setData] = useState({
        Username: "",
        dob: "",
        image: null,
        email: "",
        country: "",
        password: "",
        repassword: "",
    });
    const [isSignedUp, setIsSignedUp] = useState(false);

    const country_names = [
        "USA",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "Japan",
        "France",
        "Brazil",
        "Italy",
        "India",
    ];

    const handleAddData = (e) => {
        const { name, value } = e.target;
        const newValue = value === "" ? null : value;
        setData({ ...data, [name]: newValue });
        setCountry(newValue);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageDataString = reader.result;
            setData({
                ...data,
                image: imageDataString,
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (Object.keys(data).length === 0) {
            return toast.error(`Please enter all the credentials`);
        }
        if (!country_names.includes(data.country)) {
            return toast.error("Please select a valid country");
        }

        if (Object.keys(data).some((key) => !data[key])) {
            toast.error(`Please enter all the credentials`);
            return;
        }

        const passw = data.password;
        const repassw = data.repassword;
        if (passw.length < 8) {
            return toast.info("Password must be at least 8 characters");
        }

        if (passw !== repassw) {
            return toast.info("Password and re-entered password do not match");
        }

        const { repassword, ...postData } = data;

        CustomFetch.post(`/api/petpals/insert`, postData)
            .then((res) => {
                setIsSignedUp(true);
                toast.success("Sign Up successful");
            })
            .catch((err) => {
                console.error("Error:", err.response);
                const verify = err.response.data;

                if (verify.username === false) {
                    return toast.info("Username already exists");
                }

                if (verify.email === false) {
                    return toast.info("Email already exists");
                }
                toast.error(err.response.data.message);
            });
    };

    if (isSignedUp) {
        return <Navigate to="/Signin" />;
    }

    return (
        <div id="main-container-signin">
            <div id="container1-signin">
                <u>
                    <h2>welcome to PetPals</h2>
                </u>
                <img src={img} alt="error" id="img-signup" />
                <p id="p-signup">
                    "Welcome to PetPals, where love finds a home. Join us in giving pets a new leash on life. Sign up now and be a part of our paw-some community"
                </p>
            </div>
            <div id="container2-signup">
                <h1 className="text-3xl">Sign Up to PetPals</h1>
                <div id="box1-signup">
                    <Box
                        component="form"
                        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="inputfield-signup">
                            <TextField
                                id="standard-basic"
                                label="Enter your name"
                                variant="standard"
                                name="Username"
                                className="input"
                                required
                                onChange={handleAddData}
                                style={{ width: "300px" }}
                            />
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                name="dob"
                                className="input"
                                type="date"
                                required
                                onChange={handleAddData}
                                style={{ width: "300px", marginTop: "30px" }}
                            />
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                name="image"
                                className="input"
                                type="file"
                                required
                                onChange={handlePhotoChange}
                                InputLabelProps={{ shrink: true }}
                                label="Upload your image"
                                InputProps={{
                                    style: { width: "300px", marginTop: "30px" },
                                    accept: "image/*",
                                }}
                            />
                            <TextField
                                id="standard-basic"
                                label="Enter your email"
                                variant="standard"
                                name="email"
                                className="input"
                                onChange={handleAddData}
                                type="email"
                                required
                                style={{ width: "300px", marginTop: "20px", marginBottom: "25px" }}
                            />
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={country}
                                    autoWidth
                                    label="Country"
                                    onChange={handleAddData}
                                    required
                                    name="country"
                                >
                                    {country_names.map((name, index) => (
                                        <MenuItem value={name} key={index}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="outlined-password-input"
                                label="Enter password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                name="password"
                                className="input"
                                onChange={handleAddData}
                                style={{ width: "300px", marginTop: "20px" }}
                                required
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Re-enter password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                name="repassword"
                                onChange={handleAddData}
                                className="input"
                                style={{ width: "300px", marginTop: "20px" }}
                                required
                            />
                        </div>
                    </Box>
                </div>
                <div>
                    <button id="btn1" className="btn" onClick={handleClick}>
                        Sign Up
                    </button>
                    <Link to="/Signin">
                        <button id="btn2" className="btn">
                            Sign in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;




// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import "./Signup.css";
// import img from "../img/download.jpeg";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { CustomFetch } from "../axios/CustionFetch";
// import { toast } from "react-toastify";

// function Signup() {
//   const [country, setCountry] = useState("");
//   const [data, setData] = useState({
//     Username: "",
//     dob: "",
//     image: null,
//     email: "",
//     country: "",
//     password: "",
//     repassword: "",
//   });
//   const [isSignedUp, setIsSignedUp] = useState(false);

//   const country_names = [
//     "USA",
//     "Canada",
//     "United Kingdom",
//     "Australia",
//     "Germany",
//     "Japan",
//     "France",
//     "Brazil",
//     "Italy",
//     "India",
//   ];

//   const handleAddData = (e) => {
//     const { name, value } = e.target;

//     const newValue = value === "" ? null : value;
//     setData({ ...data, [name]: newValue });
//     setCountry(newValue);
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     // const maxSize = 2 * 1024 * 1024;
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const imageDataString = reader.result;
//       setData({
//         ...data,
//         image: imageDataString,
//       });
//     };
//     // console.log(data);
//     reader.readAsDataURL(file);
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();

//     // console.log(data);

//     if (Object.keys(data).length === 0) {
//       return toast.error(`Please enter all the credentials`);
//     }
//     if (!country_names.includes(data.country)) {
//       return toast.error("Please select a valid country");
//     }
//     // console.log(data);

//     if (Object.keys(data).some((key) => !data[key])) {
//       toast.error(`Please enter all the credentials`);
//       return;
//     }

//     const passw = data.password;
//     const repassw = data.repassword;
//     if (passw.length < 8) {
//       return toast.info("password must be atleast 8 charaters");
//     }

//     if (passw !== repassw) {
//       return toast.info("Password and re-entered password do not match");
//     }

//     const { repassword, ...postData } = data;

//     CustomFetch.post(`/api/petpals/insert`, postData)
//       .then((res) => {
//         // console.log(res.data);
//         setIsSignedUp(true);
//         toast.success("signUp successful");
//       })
//       .catch((err) => {
//         console.error("Error:", err.response);

//         const verify = err.response.data;

//         if (verify.username === false) {
//           return toast.info("Username already exit");
//         }

//         if (verify.email === false) {
//           return toast.info("email already exit");
//         }
//         toast.error(err.response.data.message);
//       });
//   };

//   if (isSignedUp) {
//     return <Navigate to="/Signin" />;
//   }

//   return (
//     <div id="main-container-signin">
//       <div id="container1-signin">
//         <u>
//           <h2>welcome to PetPals</h2>
//         </u>
//         <img src={img} alt="error" id="img-signup" />

//         <p id="p-signup">
//           "Welcome to PetPals, where love finds a home. Join us in giving pets a
//           new leash on life. Sign up now and be a part of our paw-some
//           community"
//         </p>
//       </div>
//       <div id="container2-signup">
//         <h1 className="text-3xl" c>
//           Sign Up to PetPals
//         </h1>

//         <div id="box1-signup">
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <div className="inputfield-signup">
//               <TextField
//                 id="standard-basic"
//                 label="Enter your name"
//                 variant="standard"
//                 name="Username"
//                 className="input"
//                 required
//                 onChange={handleAddData}
//                 style={{ width: "300px" }}
//               />
//               <TextField
//                 id="standard-basic"
//                 variant="standard"
//                 name="dob"
//                 className="input"
//                 type="date"
//                 required
//                 onChange={handleAddData}
//                 style={{
//                   width: "300px",
//                   marginTop: "30px",
//                 }}
//               />

//               <TextField
//                 id="standard-basic"
//                 variant="standard"
//                 name="image"
//                 className="input"
//                 type="file"
//                 required
//                 onChange={handlePhotoChange}
//                 InputLabelProps={{ shrink: true }}
//                 label="Upload your image"
//                 InputProps={{
//                   style: { width: "300px", marginTop: "30px" },
//                   accept: "image/*",
//                 }}
//               />

//               <TextField
//                 id="standard-basic"
//                 label="Enter your email"
//                 variant="standard"
//                 name="email"
//                 className="input"
//                 onChange={handleAddData}
//                 type="email"
//                 required
//                 style={{
//                   width: "300px",
//                   marginTop: "20px",
//                   marginBottom: "25px",
//                 }}
//               />
//               <FormControl sx={{ m: 1, minWidth: 300, margin: "0pxs" }}>
//                 <InputLabel id="demo-simple-select-autowidth-label">
//                   Country
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-autowidth-label"
//                   id="demo-simple-select-autowidth"
//                   value={country}
//                   autoWidth
//                   label="Country"
//                   onChange={handleAddData}
//                   required
//                   name="country"
//                 >
//                   {country_names.map((name, index) => (
//                     <MenuItem value={name} key={index}>
//                       {name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <TextField
//                 id="outlined-password-input"
//                 label="enter password"
//                 type="password"
//                 autoComplete="current-password"
//                 variant="standard"
//                 name="password"
//                 className="input"
//                 onChange={handleAddData}
//                 style={{ width: "300px", marginTop: "20px" }}
//                 required
//               />
//               <TextField
//                 id="outlined-password-input"
//                 label="Re-enter password"
//                 type="password"
//                 autoComplete="current-password"
//                 variant="standard"
//                 name="repassword"
//                 onChange={handleAddData}
//                 className="input"
//                 style={{ width: "300px", marginTop: "20px" }}
//                 required
//               />
//             </div>
//           </Box>
//         </div>
//         <div>
//           <button id="btn1" className="btn" onClick={handleClick}>
//             Sign Up
//           </button>

//           <Link to="/Signin">
//             <button id="btn2" className="btn">
//               Sign in
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
