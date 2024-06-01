const AdoptionForm = require("../model/Adoptionform");

const formInsert = async (req, res) => {
  try {
    const {
      petType,
      petName,
      breed,
      age,
      description,
      image,
      friendlyWithKids,
      reasonForAdoption,
      anyIllness,
    } = req.body;

    const adoptionForm = new AdoptionForm({
      petType,
      petName,
      breed,
      age,
      description,
      image,
      friendlyWithKids,
      reasonForAdoption,
      anyIllness,
    });

    const formdata = await adoptionForm.save();
    res.json(formdata);
  } catch (err) {
    console.log(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFrom = async (req, res) => {
  try {
    const forms = await AdoptionForm.find();
    res.json(forms);
  } catch (error) {
    console.error("Error fetching adoption forms:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSinglepet = async (req, res) => {
  const { id } = req.params;
  try {
    const deletepet = await AdoptionForm.findByIdAndDelete(id);
    if (!deletepet) {
      // console.log("data not found");
      return res.status(404).json({ error: "data not found" });
    }
    console.log("pet deleted successfully:", deletepet);
    res.status(200).json({ message: "pet deleted successfully", deletepet });
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleFrom = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("hii", id);
    const data = await AdoptionForm.findById(id);
    res.json(data);
    if (!data) {
      // console.log("data not found");
      return res.status(404).json({ error: "data not found" });
    }
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateSinglePet = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      petType,
      petName,
      breed,
      age,
      description,
      image,
      friendlyWithKids,
      reasonForAdoption,
      anyIllness,
    } = req.body;

    const updatedPet = await AdoptionForm.findByIdAndUpdate(
      id,
      {
        petType,
        petName,
        breed,
        age,
        description,
        image,
        friendlyWithKids,
        reasonForAdoption,
        anyIllness,
      },
      { new: true }
    );

    if (!updatedPet) {
      console.log("Pet not found");
      return res.status(404).json({ error: "Pet not found" });
    }

    console.log("Pet updated successfully:", updatedPet);
    res.status(200).json({ message: "Pet updated successfully", updatedPet });
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  formInsert,
  getFrom,
  deleteSinglepet,
  getSingleFrom,
  updateSinglePet,
};
