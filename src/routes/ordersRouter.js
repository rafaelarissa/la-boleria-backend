import { Router } from "express";
import { setOrders } from "../controllers/ordersController.js";

const ordersRouter = Router();
ordersRouter.post('/orders', setOrders);

export default ordersRouter;