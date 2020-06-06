const { Router } = require("express");

const router = Router();
router.get("/ping", (req, res) =>
  res.status(200).json({
    status: "OK",
    message: "PONG",
  })
);

module.exports = router;
