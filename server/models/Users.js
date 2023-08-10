const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        reference: "Folders",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
