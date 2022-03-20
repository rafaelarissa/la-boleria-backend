import { Router } from "express";
import { getOrders, setOrders } from "../controllers/ordersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import orderSchema from "../schemas/orderSchema.js";

const ordersRouter = Router();
ordersRouter.post("/orders", validateSchema(orderSchema), setOrders);
ordersRouter.get("/orders", getOrders);

export default ordersRouter;
