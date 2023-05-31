import express, { Router } from "express";

import CustomerController from "../controllers/customer.controller";
import { validateEmailPassUname } from "../middlewares/customer.middleware";

const Customers = new CustomerController();
const CustomerRouter = express.Router();

/* GET ROUTES */
CustomerRouter.get(
  "/customers",
  Customers.paginateCustomers,
  Customers.getCustomers
);
CustomerRouter.get("/customers/:id", Customers.getCustomerById);
// CustomerRouter.get("/customers", Customers.paginateCustomers);

/* POST ROUTES */
CustomerRouter.post(
  "/customers",
  validateEmailPassUname,
  Customers.createCustomer
);
/* PATCH ROUTES */

/* PUT ROUTES */

/* DELETE ROUTES */
CustomerRouter.delete("/customers/:id", Customers.deleteCustomer);

export default CustomerRouter;
