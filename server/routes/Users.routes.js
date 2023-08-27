const express = require("express");
const router = express.Router({ mergeParams: true });

const auth = require("../middleware/auth.middleware");
const Users = require("../models/User");

router
  .get("/", async (req, res) => {
    try {
      const list = await Users.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post("/", async (req, res) => {
    try {
      const newUsers = await Users.create({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).send(newUsers);
    } catch (error) {
      res
        .status(501)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  });

router
  .delete("/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      await Users.findByIdAndDelete(id);

      return res.send(null);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .patch("/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req);
      const updatedUsers = await Users.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).send(updatedUsers);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
