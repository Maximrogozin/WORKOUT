const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const tokens = req.headers.authorization.split(" ")[1];
    if (!tokens) {
      return res.status(401).json({ message: "Unautorized" });
    }

    const data = tokenService.validateAccess(tokens);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unautorized" });
  }
};
