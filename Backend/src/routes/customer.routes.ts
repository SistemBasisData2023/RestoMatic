import express, { Router } from "express";

import CustomerController from "../controllers/customer.controller";
import { validateEmailPassUname } from "../middlewares/customer.middleware";

const Customers = new CustomerController();
const CustomerRouter = express.Router();

/* GET ROUTES */
CustomerRouter.get("/customers", Customers.paginate, Customers.getAll);
CustomerRouter.get("/customers/:id", Customers.getById);
// CustomerRouter.get("/customers", Customers.paginateCustomers);

/* POST ROUTES */
CustomerRouter.post("/customers", validateEmailPassUname, Customers.create);
/* PATCH ROUTES */

/* PUT ROUTES */

/* DELETE ROUTES */
CustomerRouter.delete("/customers/:id", Customers.deleteById);

export default CustomerRouter;
