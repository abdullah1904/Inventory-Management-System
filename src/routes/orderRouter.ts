import { Router } from "express";
import { createOrder, getOrder, getOrders } from "../controllers/orderControllers";

const orderRouter = Router();

orderRouter.get('/getOrders',getOrders);
orderRouter.get('/getOrder/:id',getOrder);
orderRouter.post('/createOrder',createOrder);

export {orderRouter};