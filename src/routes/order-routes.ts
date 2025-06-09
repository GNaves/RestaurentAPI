import { Router } from "express";
import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router();
const ordersRoutesController = new OrdersController();

ordersRoutes.get(
  "/sessions-table/:table_session_id",
  ordersRoutesController.index
);
ordersRoutes.post("/", ordersRoutesController.create);
ordersRoutes.get("/sessions-table/:table_session_id/total", ordersRoutesController.show);

export { ordersRoutes };
