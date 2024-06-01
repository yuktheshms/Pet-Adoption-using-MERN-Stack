const userSchema = require("../model/Registration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendEmail = require("./../Utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
const login = async (req, res) => {
  const { UsernameOrEmail, password } = req.body;
  try {
    const isEmail = UsernameOrEmail.includes("@");

    let user;

    if (isEmail) {
      user = await userSchema.findOne({ email: UsernameOrEmail });
    } else {
      user = await userSchema.findOne({ Username: UsernameOrEmail });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User or email not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = signToken(user._id);

    const options = {
      maxAge: process.env.LOGIN_EXPIRES,
      // secure: true,
      // httpOnly: true,
    };

    res.cookie("jwt", token, options);
    res.status(200).json({
      success: true,
      message: "Login successful",
      uid: user._id,
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const userInsert = async (req, res) => {
  try {
    const { Username, dob, email, image, country, password } = req.body;
    const userData = new userSchema({
      Username: Username,
      dob: dob,
      email: email,
      image: image,
      country: country,
      password: password,
    });

    const uname = await userSchema.find({ Username: Username });
    if (uname.length > 0) {
      return res.status(409).json({
        username: false,
        message: "Username already exists in the database",
      });
    }

    const uemail = await userSchema.find({ email: email });
    if (uemail.length > 0) {
      return res.status(409).json({
        email: false,
        message: "Email already exists in the database",
      });
    }

    const storeUser = await userData.save();
    storeUser.password = undefined;
    res.json(storeUser);
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ message: "internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const getData = await userSchema.find();
    if (!getData) {
      // console.log("Data not found");
      res.status(404).json({ error: "Data not found" });
    } else {
      res.json(getData);
    }
  } catch (err) {
    console.log(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getSingleUser = async (req, res) => {
  const { _id } = req.body;

  try {
    const getData = await userSchema.findById(_id);
    if (!getData || getData.length === 0) {
      // console.log("Data not found", _id);
      res.status(404).json({ error: "Data not found" });
    } else {
      res.json(getData);
    }
  } catch (err) {
    console.log(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userSchema.findByIdAndDelete(id);
    if (!deletedUser) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User deleted successfully:", deletedUser);
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const protect = async (req, res, next) => {
  const testToken = req.headers.authorization;
  let token1;
  try {
    if (testToken && testToken.startsWith("bearer")) {
      token1 = testToken.split(" ")[1];
    }
    if (!token1) {
      return res.status(401).json({ message: " you are unauthozie" });
    }

    const decodedtoken = jwt.verify(token1, process.env.ACCESS_TOKEN_SECRET);

    const user = await userSchema.findById(decodedtoken.id);
    if (!user) {
      console.log("user does not exits");
      return res
        .status(401)
        .json({ message: " you are Unauthorized user does not exits" });
    }
    const passwordChanged = await user.isPasswordChanged(decodedtoken.iat);

    if (passwordChanged) {
      return res
        .status(401)
        .json({ message: " password changed recently so please login again" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized, token is invalid" });
  }
};

const restrict = (...role) => {
  // console.log(...role);
  return (req, res, next) => {
    // console.log(...role);
    // console.log(req.user.role);
    if (role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "user do not permmission this action forbidden" });
    }
    console.log("sucess");
    next();
  };
};

const forgetPassword = async (req, res, next) => {
  try {
    const foundUser = await userSchema.findOne({ email: req.body.email });

    if (!foundUser) {
      console.log("User does not exist");
      return res
        .status(404)
        .json({ message: "User not found with the given email" });
    }

    const token = foundUser.createResetPasswordToken();
    console.log(token);
    foundUser.passwordResetTokenExpried = Date.now() + 10 * 60 * 1000;
    foundUser.passwordResetToken = token.passwordResetToken;
    await foundUser.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.hostname}:3000/resetPassword/${token.resetToken}`;

    const message = `Please reset your password using the link below:\n${resetUrl}\nThis reset link is valid for 10 minutes.`;

    await sendEmail({
      to: foundUser.email,
      subject: "Password Change Request Received",
      text: message,
    });

    return res
      .status(200)
      .json({ status: "success", message: "Email sent successfully", token });
  } catch (err) {
    console.error("Error while sending email:", err);
    return res.status(500).json({ message: "Error while sending email" });
  }
};

const passwordReset = async (req, res, next) => {
  try {
    const token = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await userSchema.findOne({
      passwordResetToken: token,
      passwordResetTokenExpried: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Token is invalid or expired");
      return res.status(400).json({ message: "Token is invalid or expired" });
    }

    user.password = req.body.password;
    user.repassword = req.body.repassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpried = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();

    console.log("Password reset successful");
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ message: "An error occurred during password reset" });
  }
};

module.exports = {
  userInsert,
  getUser,
  login,
  getSingleUser,
  deleteSingleUser,
  protect,
  restrict,
  forgetPassword,
  passwordReset,
};
