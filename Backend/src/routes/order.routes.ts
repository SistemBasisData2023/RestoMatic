import express from "express";

import OrderController from "../controllers/order.controller";

const Orders = new OrderController();
const OrderRouter = express.Router();

/* GET ROUTES */
OrderRouter.get(
  "/orders",
  Orders.paginate,
  Orders.getByCustomerId,
  Orders.getAll
);
// OrderRouter.get("/orders/:id", Orders.getById);
// OrderRouter.get("/orders/:customer_id", Orders.getByCustomerId);
OrderRouter.get("/orders/:id", Orders.getById);

/* POST ROUTES */
OrderRouter.post("/orders", express.raw({ type: "*/*" }), Orders.create);

/* PATCH ROUTES */
// ReviewRouter.get("/reviews", Reviews.update);

/* PUT ROUTES */

/* DELETE ROUTES */
OrderRouter.delete("/orders/:id", Orders.deleteById);

export default OrderRouter;
