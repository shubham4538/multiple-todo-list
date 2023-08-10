const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const FolderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      reference: "Users",
      required: true,
    },
    todos: [TodoSchema],
  },
  { timestamps: true }
);

FolderSchema.index(
  { title: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);
const FolderModel = mongoose.model("Folders", FolderSchema);

module.exports = FolderModel;
