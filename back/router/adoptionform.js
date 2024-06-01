const express = require("express");
const router = express.Router();
const adoptionFrom = require("../controller/adoptionform");

router.get("/get", adoptionFrom.getFrom);
router.get("/getSingle/:id", adoptionFrom.getSingleFrom);
router.post("/insert", adoptionFrom.formInsert);
router.delete("/deleteSingle/:id", adoptionFrom.deleteSinglepet);
router.put("/updatePet/:id", adoptionFrom.updateSinglePet);

module.exports = router;
