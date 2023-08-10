const express = require("express");
const changeRouter = express.Router();

const FolderModel = require("../models/Folders");

changeRouter.post("/status", async (req, res) => {
  const { status, id, folderId } = req.body;
  try {
    const result = await FolderModel.findOneAndUpdate(
      { _id: folderId, "todos._id": id },
      { $set: { "todos.$.completed": status } },
      { new: true }
    );
    if (result) {
      res.json({ message: "Updated" });
    } else {
      res.status(401).json({ error: "Unable to update" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = changeRouter;
