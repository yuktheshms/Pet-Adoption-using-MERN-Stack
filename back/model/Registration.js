const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
var validator = require("email-validator");
const crypto = require("crypto");

const userSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.validate,
      message: "Email address is not valid",
    },
  },
  image: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    // select: false,
  },
  repassword: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpried: Date,
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.repassword = undefined;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isPasswordChanged = async function (jwttime) {
  if (this.passwordChangedAt) {
    const passwordchangetime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwttime < passwordchangetime;
  }
  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpried = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  return { passwordResetToken, resetToken };
};

module.exports = mongoose.model("Registration", userSchema);
