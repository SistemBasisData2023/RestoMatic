import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer.model";
import BaseController from "./base.controller";
import { v4 as uuidv4 } from "uuid";

const MODEL = new Customer();

class CustomerController extends BaseController {
  constructor() {
    super(MODEL);
  }

  // @POST /customers/register: Create new customer
  register = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const customer = await this.model.register(req.body);
    if (!customer.data) {
      res.status(400).json(customer);
      return;
    }
    res.status(201).json(customer);
  });

  // @POST /customers/login: Login customer
  login = asyncHandler(async (req: Request, res: Response) => {
    const customer = await this.model.login(req.body);
    if (!customer.data) {
      res.status(400).json(customer);
      return;
    }
    req.session.userId = customer.id;
    req.session.isAuth = true;
    // res.set("Set-Cookie", `sessionId=${req.session.sessionId}`);
    res.status(200).json(customer);
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: "Erorr logging out",
          data: {},
        });
        return;
      }

      res.status(200).json({
        status: "success",
        message: "Successfully logged out",
        data: {},
      });
    });
  });

  // @GET /customers/:id/topup Topup customer balance
  topup = asyncHandler(async (req: Request, res: Response) => {
    const customer_id = req.params.id;
    const { amount } = req.query;
    const customer = await this.model.topup(
      Number(customer_id),
      Number(amount)
    );
    if (!customer.data) {
      res.status(400).json(customer);
      return;
    }
    res.status(200).json(customer);
  });
}

export default CustomerController;
