const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/Category", require("./Category.routes"));
router.use("/Catalog", require("./Catalog.routes"));
router.use("/Users", require("./Users.routes"));
router.use("/Orders", require("./Orders.routes"));

module.exports = router;
