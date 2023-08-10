const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account");
const requireAuth = require("./middleware/requireAuth");
const changeRouter = require("./routes/change");
const deleteRouter = require("./routes/delete");

const port = process.env.PORT || 3001;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/change", changeRouter);
app.use(requireAuth);
app.use("/delete", deleteRouter);
app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
