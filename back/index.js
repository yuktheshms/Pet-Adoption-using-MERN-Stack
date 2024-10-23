const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")("sk_test_51OnZUpSB5YEoLiYMqfnKyHDTQrSbH5A5A15q1EcXq3VCxYXyI16zRG8ytvy2RURZtO895m8awFAPAtDpUuopFjzp00jSUZOeLt");

app.use(cookieParser());
app.use(
  cors({
    origin: "https://pet-adoption-using-mern-stack-ucg3.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

const dburl = "mongodb+srv://yuktheshms00:fg5BcyEikcy7nCUt@petpals.vtx86.mongodb.net/?retryWrites=true&w=majority&appName=Petpals";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//const dburl = "mongodb://localhost:27017/petpals";

app.use("/api/petpals", require("./router/Registrationroute"));
app.use("/api/artical", require("./router/articalroute"));
app.use("/api/form", require("./router/adoptionform"));
app.use("/api/request", require("./router/adoptionreq"));
app.use("/api/payment", require("./router/payment"));

const port = 5000;

mongoose
  .connect(dburl)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });

app.listen(port, () => console.log(`Server is running on port ${port}`));

    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// const dburl =
//   "mongodb+srv://petpals:iiHCvsqGaautYeZf@cluster0.hhki8kd.mongodb.net/petpals?retryWrites=true&w=majority";

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
const dburl = "mongodb://localhost:27017/petpals";

app.use("/api/petpals", require("./router/Registrationroute"));
app.use("/api/artical", require("./router/articalroute"));
app.use("/api/form", require("./router/adoptionform"));
app.use("/api/request", require("./router/adoptionreq"));
app.use("/api/payment", require("./router/payment"));

const port = 5000;

mongoose
  .connect(dburl)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });

app.listen(port, () => console.log(`Server is running on port ${port}`));
