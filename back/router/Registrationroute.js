const express = require("express");
const router = express.Router();
const user = require("../controller/registration");

router.post("/insert", user.userInsert);
router.get("/get", user.getUser);
router.post("/login", user.login);
router.post("/getSingle", user.getSingleUser);
router.delete("/deletesingle/:id", user.deleteSingleUser);
router.post("/forgetPassword", user.forgetPassword);
router.put("/resetPassword/:token", user.passwordReset);

module.exports = router;
