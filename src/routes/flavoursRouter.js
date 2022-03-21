import { Router } from "express";
import { setFlavours } from "../controllers/flavoursController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import flavourSchema from "../schemas/flavourSchema.js";

const flavoursRouter = Router();
flavoursRouter.post("/flavours", validateSchema(flavourSchema), setFlavours);

export default flavoursRouter;
