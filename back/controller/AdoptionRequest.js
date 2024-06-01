const reqform = require("../model/AdoptionRequest");
const sendEmail = require("./../Utils/email");

const getrequest = async (req, res) => {
  try {
    const data = await reqform.find();
    res.json(data);
  } catch (err) {
    console.log("internal server error ", err);
    res.status(500).json({ message: "server error" });
  }
};

const postrequest = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      reason,
      experience,
      petsOwned,
      reqpet,
      uid,
    } = req.body;

    const form = new reqform({
      fullName,
      email,
      phone,
      address,
      reason,
      experience,
      petsOwned,
      reqpet,
      uid,
    });

    const savedForm = await form.save();

    // await savedForm.populate("reqpet").execPopulate();

    res.json(savedForm);
  } catch (err) {
    console.log("Internal server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleterequest = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await reqform.findByIdAndDelete(id);
    if (!data) {
      console.log("cannot find the user");
      res.status(404).json({ message: "user not found" });
    }
    res.json(data);
  } catch (err) {
    console.log("internal server error", err);
    res.status(500).json({ message: "internal server error" });
  }
};
const requestsuccess = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await reqform.findById(id);
    if (!data) {
      console.log("cannot find the user");
      res.status(404).json({ message: "user not found" });
    }

    const message = `Your Request as been accepted we will contact you in 2 days`;

    await sendEmail({
      to: data.email,
      subject: "petPals",
      text: message,
    });

    return res
      .status(200)
      .json({ status: "success", message: "Email sent successfully" });
  } catch (err) {
    console.log("internal server error", err);
    res.status(500).json({ message: "internal server error" });
  }
};
const requestreject = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await reqform.findById(id);
    if (!data) {
      console.log("cannot find the user");
      res.status(404).json({ message: "user not found" });
    }

    const message = `Your Request as been rejected sry for the inconvenience`;

    await sendEmail({
      to: data.email,
      subject: "petPals",
      text: message,
    });

    return res
      .status(200)
      .json({ status: "success", message: "Email sent successfully" });
  } catch (err) {
    console.log("internal server error", err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getrequest,
  postrequest,
  deleterequest,
  requestsuccess,
  requestreject,
};
