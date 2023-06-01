import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer.model";
import BaseController from "./base.controller";

const MODEL = new Customer();

class CustomerController extends BaseController {
  constructor() {
    super(MODEL);
  }

  // @POST /customers/register: Create new customer
  register = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.register(req.body);
    console.log("customer", customer);
    if (!customer) {
      res.status(400).json({ message: "ERR: Failed to create customer" });
      return;
    }
    res.status(201).json(customer);
  });

  // @POST /customers/login: Login customer
  login = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.login(req.body);
    if (!customer) {
      res.status(400).json({ message: "ERR: Failed to login customer" });
      return;
    }
    req.session.user = customer.data.accountDetails.email;
    res.status(200).json(customer);
  });
}

export default CustomerController;
