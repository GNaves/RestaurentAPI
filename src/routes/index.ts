import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";
import { tableSessionsRoutes } from "./tables-sessions-routes";
import { ordersRoutes } from "./order-routes";

const routes = Router();

routes.use("/products", productsRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/table-sessions", tableSessionsRoutes);
routes.use("/orders", ordersRoutes);

export { routes };
