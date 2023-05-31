import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer.model";
import BaseController from "./base.controller";

const MODEL = new Customer();

class CustomerController extends BaseController {
  constructor() {
    super(MODEL);
  }

  // @POST /customer: Create new customer
  create = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.create(req.body);
    if (!customer) {
      res.status(400).json({ message: "ERR: Failed to create customer" });
      return;
    }
    res.status(201).json(customer);
  });
}

export default CustomerController;
