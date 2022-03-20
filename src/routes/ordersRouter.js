import { Router } from "express";
import { setOrders } from "../controllers/ordersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import orderSchema from "../schemas/orderSchema.js";

const ordersRouter = Router();
ordersRouter.post('/orders', validateSchema(orderSchema), setOrders);

export default ordersRouter;