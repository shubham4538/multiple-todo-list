const express = require("express");
const UserModel = require("../models/Users");
const FolderModel = require("../models/Folders");

const accountRouter = express.Router();

// Get account details
accountRouter.get("/details", async (req, res) => {
  const userId = res.locals.userId;
  try {
    const user = await UserModel.findOne({ _id: userId });
    const folderArray = await Promise.all(
      user.folders.map(async (id) => {
        const newFolder = await FolderModel.findById(id);
        return newFolder;
      })
    );
    res.json(folderArray);
  } catch (err) {
    res.json(err);
  }
});

// Add Todo folder
accountRouter.post("/addfolder", async (req, res) => {
  const userId = res.locals.userId;
  const { title, slug, url } = req.body;
  try {
    const folder = FolderModel({ title, slug, userId });
    const newFolder = await folder.save();
    const user = await UserModel.findById(userId);
    user.folders.push(newFolder);
    await user.save();
    res.status(200).json({ message: "Folder created" });
  } catch (err) {
    if (err.keyValue.title) {
      res.status(409).json({ error: "Folder exists" });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// Add Todo Item
accountRouter.post("/addtodo", async (req, res) => {
  const userId = res.locals.userId;
  const { task, isCompleted, folderId } = req.body;
  try {
    const newTodo = { task, completed: isCompleted };
    const folder = await FolderModel.findById(folderId);
    folder.todos.push(newTodo);
    await folder.save();
    res.status(200).json({ message: "Todo created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = accountRouter;
