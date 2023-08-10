const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.userId = _id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;
