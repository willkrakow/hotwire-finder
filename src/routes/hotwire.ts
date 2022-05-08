import { Router } from "express";
import { getRecordLocation } from "../controllers/hotwire";

const hotwireRouter = Router();

hotwireRouter.get("/:recordId", getRecordLocation);

export { hotwireRouter };
