import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer.model";

class CustomerController {
  model: Customer = new Customer();

  // @GET /customer: Get all customers
  getCustomers = asyncHandler(async (req: Request, res: Response) => {
    const customers = await this.model.getCustomers();
    res.status(200).json(customers);
  });

  // @GET /customer/:id: Get customer by id
  getCustomerById = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.getCustomerById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "ERR: Customer not found" });
      return;
    }
    res.status(200).json(customer);
  });

  // @POST /customer: Create new customer
  createCustomer = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.createCustomer(req.body);

    if (!customer) {
      res.status(400).json({ message: "ERR: Failed to create customer" });
      return;
    }
    res.status(201).json(customer);
  });
}

export default CustomerController;
