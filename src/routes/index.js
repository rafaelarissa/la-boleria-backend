import { Router } from "express";
import cakesRouter from "./cakesRouter.js";
import clientsRouter from "./clientsRouter.js";

const router = Router();
router.use(cakesRouter);
router.use(clientsRouter);

export default router;