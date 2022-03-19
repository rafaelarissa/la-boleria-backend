import { Router } from "express";
import { setCakes } from "../controllers/cakesController.js";

const cakesRouter = Router();
cakesRouter.post('/cakes', setCakes);

export default cakesRouter;