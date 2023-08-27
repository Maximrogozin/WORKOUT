const express = require("express");
const Orders = require("../models/Orders");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Orders.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrders = await Orders.create(req.body);
    res.status(201).send(newOrders);
  } catch (error) {
    res
      .status(501)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Orders.findByIdAndDelete(id);

    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
