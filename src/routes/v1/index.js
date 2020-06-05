const { Router } = require("express");
const logbookRouter = require("./logbook");

const router = Router();
router.use("/logbook", logbookRouter);

module.exports = router;
