import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/order.model";
import BaseController from "./base.controller";
import { buildResponse } from "../utils/utils";
import Customer from "../models/customer.model";

const CUSTOMER_MODEL = new Customer();
const MODEL = new Order();

class OrderController extends BaseController {
  constructor() {
    super(MODEL);
  }

  // @POST /orders: Create new order
  create = asyncHandler(async (req: Request, res: Response) => {
    //const parsedBody = JSON.parse(req.body);

    const result = await this.model.__validateBalance(req.body);
    
    if (
      result == -1 ||
      Number(result.total_price) > Number(result.user_balance)
    ) {
      console.error("Invalid balance!", result);
      res.status(400).json(buildResponse(null, "Erorr, invalid balance!"));
      return;
    }

    const order = await this.model.create(req.body);
    if (!order.data) {
      res.status(400).json(order);
      return;
    }
    const { error, data } = await CUSTOMER_MODEL.charge(
      req.body.customer_id,
      Number(result.total_price)
    );
    const charged_data = data;

    console.log(error, data);
    if (error) {
      res.status(400).json(buildResponse(null, "Error, cannot charge!"));
      return;
    }

    let orderData = await this.model.getById(order.data.order_id);
    orderData.message = "Order created successfully";
    orderData.data.customer_balance = charged_data.balance;
    res.status(201).json(orderData);
  });

  // @GET /orders/
  getByCustomerId = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { customerId } = req.query;
      if (!customerId) {
        next();
        return;
      }

      const order = await this.model.getByCustomerId(customerId);
      if (!order.data) {
        res.status(400).json(order);
        return;
      }
      res.status(200).json(order);
    }
  );
}

export default OrderController;
