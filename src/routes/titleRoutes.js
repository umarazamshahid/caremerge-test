const express = require("express");
const router = express.Router();
const titleController = require("../controllers/titleController");

router.get("/", (req, res) => {
  const IMPLEMENTATION = process.env.IMPLEMENTATION || "callbacks";
  titleController.handleGetTitle(req, res, IMPLEMENTATION);
});

module.exports = router;
