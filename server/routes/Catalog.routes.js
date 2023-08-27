const express = require("express");
const router = express.Router({ mergeParams: true });

const auth = require("../middleware/auth.middleware");
const Catalog = require("../models/Catalogs");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Catalog.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newProduct = await Catalog.create({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).send(newProduct);
    } catch (error) {
      res
        .status(501)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  });

router
  .delete("/:productId", auth, async (req, res) => {
    try {
      const { productId } = req.params;
      await Catalog.findByIdAndDelete(productId);

      return res.send(null);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .patch("/:productId", auth, async (req, res) => {
    try {
      const { productId } = req.params;
      const updatedCatalog = await Catalog.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      console.log(updatedCatalog);
      res.status(200).send(updatedCatalog);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
