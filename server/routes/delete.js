const express = require("express");
const mongoose = require("mongoose");

const FolderModel = require("../models/Folders");
const UserModel = require("../models/Users");
const deleteRouter = express.Router();

deleteRouter.delete("/folder/:id", async (req, res) => {
  try {
    const userId = res.locals.userId;
    const folderId = req.params.id;
    await FolderModel.findOneAndDelete({ _id: folderId });
    await UserModel.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $pull: { folders: new mongoose.Types.ObjectId(folderId) } }
    );
    res.json({ message: "Folder Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

deleteRouter.delete("/todo", async (req, res) => {
  try {
    const userId = res.locals.userId;
    const { todoId, folderId } = req.query;
    const result = await FolderModel.updateOne(
      { _id: folderId },
      { $pull: { todos: { _id: todoId } } }
    );
    res.json({ message: "Todo Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = deleteRouter;
