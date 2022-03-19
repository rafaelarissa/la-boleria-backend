import { Router } from "express";
import { setClients } from "../controllers/clientsController.js";

const clientsRouter = Router();
clientsRouter.post('/clients', setClients)

export default clientsRouter;