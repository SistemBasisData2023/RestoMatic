import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer.model";

class CustomerController {
  model: Customer = new Customer();

  // @GET /customer: Get all customers
  getCustomers = asyncHandler(async (req: Request, res: Response) => {
    const customers = await this.model.getCustomers();
    if (!customers) {
      res.status(404).json({ message: "ERR: Customers table empty" });
      return;
    }

    res.status(200).json(customers);
  });

  // @GET /customer/:id: Get customer by id
  getCustomerById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await this.model.getCustomerById(id);
    if (!customer) {
      res.status(404).json({ message: "ERR: Customer not found" });
      return;
    }
    res.status(200).json(customer);
  });
  // @GET /customer?page=page&size=size: Get paginated customers
  paginateCustomers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.query.page || !req.query.size) {
        next();
        return;
      }

      const { page, size } = req.query;
      const customers = await this.model.paginateCustomers(
        Number(page),
        Number(size)
      );
      if (!customers) {
        res.status(404).json({
          message: "ERR: No customers found for that specific page and size",
        });
        return;
      }

      res.status(200).json(customers);
    }
  );

  // @POST /customer: Create new customer
  createCustomer = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.createCustomer(req.body);
    if (!customer) {
      res.status(400).json({ message: "ERR: Failed to create customer" });
      return;
    }
    res.status(201).json(customer);
  });

  // @DELETE /customer/:id: Delete customer by id
  deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.deleteCustomer(req.params.id);
    if (!customer) {
      res.status(400).json({ message: "ERR: Failed to delete customer" });
      return;
    }
    res.status(200).json(customer);
  });
}

export default CustomerController;
