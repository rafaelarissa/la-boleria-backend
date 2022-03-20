import { Router } from "express";
import { setClients } from "../controllers/clientsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import clientSchema from "../schemas/clientSchema.js";

const clientsRouter = Router();
clientsRouter.post('/clients', validateSchema(clientSchema), setClients)

export default clientsRouter;