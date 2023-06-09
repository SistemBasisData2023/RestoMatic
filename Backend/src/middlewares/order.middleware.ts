import { Request, Response, NextFunction } from "express";
import Order from "../models/order.model";
import { buildResponse } from "../utils/utils";

const ORDER_MODEL = new Order();

export const validateBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const parsedBody = JSON.parse(req.body);
  // const result = await ORDER_MODEL.__validateBalance(req.body);

  // if (
  //   result == -1 ||
  //   Number(result.total_price) > Number(result.user_balance)
  // ) {
  //   console.error("Invalid balance!", result);
  //   res.status(400).json(buildResponse(null, "Erorr, invalid balance!"));
  //   return;
  // }

  next();
  return;
};
