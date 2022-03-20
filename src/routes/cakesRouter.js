import { Router } from "express";
import { setCakes } from "../controllers/cakesController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import cakeSchema from "../schemas/cakeSchema.js";

const cakesRouter = Router();
cakesRouter.post('/cakes', validateSchema(cakeSchema), setCakes);

export default cakesRouter;