import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer.model";

class CustomerController {
  getCustomers = asyncHandler(async (req: Request, res: Response) => {
    const customerModel = new Customer();
    const customers = await customerModel.getCustomers();
    res.status(200).json(customers);
  });
}

export default CustomerController;
