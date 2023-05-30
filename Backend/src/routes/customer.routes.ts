import express from "express";

import CustomerController from "../controllers/customer.controller";
import Customer from "../models/customer.model";
import { validateEmailPass } from "../middlewares/customer.middleware";

const Customers = new CustomerController();
const CustomerRouter = express.Router();

CustomerRouter.get("/customer", Customers.getCustomers);
CustomerRouter.get("/customer/:id", Customers.getCustomerById);
CustomerRouter.post("/customer", validateEmailPass, Customers.createCustomer);

export default CustomerRouter;
