import { Router } from "express";
import {
  getOrderPerClient,
  setClients,
} from "../controllers/clientsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import clientSchema from "../schemas/clientSchema.js";

const clientsRouter = Router();
clientsRouter.post("/clients", validateSchema(clientSchema), setClients);
clientsRouter.get("/clients/:id/orders", getOrderPerClient);

export default clientsRouter;
