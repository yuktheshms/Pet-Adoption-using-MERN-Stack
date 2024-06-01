const express = require("express");
const router = express.Router();
const payment = require("../controller/payment");

router.post("/insert", payment.paymentInsert);
router.get("/get", payment.getPayment);

module.exports = router;
