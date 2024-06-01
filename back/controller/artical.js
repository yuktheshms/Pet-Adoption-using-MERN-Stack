const userSchema = require("../model/Artical");

const articalInsert = async (req, res) => {
  try {
    const { title, author, content, uid } = req.body;
    const userData = new userSchema({
      title: title,
      author: author,
      content: content,
      uid: uid,
    });
    const storeartical = await userData.save();
    res.json(storeartical);
  } catch (err) {
    console.log(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getArtical = async (req, res) => {
  try {
    const getData = await userSchema.find();
    if (!getData || getData.length === 0) {
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
const deleteOneArtical = async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedArticle = await userSchema.findByIdAndDelete(_id);

    if (!deletedArticle) {
      // console.log("Article not found");
      return res.status(404).json({ error: "Article not found" });
    }

    // console.log("Article deleted successfully:", deletedArticle);
    res
      .status(200)
      .json({ message: "Article deleted successfully", deletedArticle });
  } catch (err) {
    console.error(`Internal server error: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  articalInsert,
  getArtical,
  deleteOneArtical,
};
