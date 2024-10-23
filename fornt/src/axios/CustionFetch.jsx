import axios from "axios";
// const url = "http://localhost:5000";
const url = "https://pet-adoption-using-mern-stack-cgq5-backend.vercel.app";
// const URL= "https://getyourstuffbackend.onrender.com"
const CustomFetch = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

export { CustomFetch, url };
