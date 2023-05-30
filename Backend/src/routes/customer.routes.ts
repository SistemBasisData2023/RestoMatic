import express from "express";

import CustomerController from "../controllers/customer.controller";

const Customers = new CustomerController();
const CustomersRouter = express.Router();

CustomersRouter.get("/customer", Customers.getCustomers);

export default CustomersRouter;
