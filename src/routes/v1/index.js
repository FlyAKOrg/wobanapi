import { Router } from "express";
import logbookRouter from "./logbook";

const router = Router();
router.use("/logbook", logbookRouter);

export default router;
