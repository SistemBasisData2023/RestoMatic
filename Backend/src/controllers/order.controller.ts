import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/order.model";
import BaseController from "./base.controller";
import { log } from "console";

const MODEL = new Order();

class OrderController extends BaseController {
  constructor() {
    super(MODEL);
  }

  // @POST /orders: Create new order
  create = asyncHandler(async (req: Request, res: Response) => {
    const parsedBody = JSON.parse(req.body);
    console.log(parsedBody);
    const order = await this.model.create(parsedBody);
    if (!order.data) {
      res.status(400).json(order);
      return;
    }
    let orderData = await this.model.getById(order.data.order_id);
    orderData.message = "Order created successfully";
    res.status(201).json(orderData);
  });

  // @GET /orders/
  getByCustomerId = asyncHandler(async (req: Request, res: Response) => {
    const { customerId } = req.query;
    const order = await this.model.getByCustomerId(customerId);
    if (!order.data) {
      res.status(400).json(order);
      return;
    }
    res.status(200).json(order);
  });
}

export default OrderController;
