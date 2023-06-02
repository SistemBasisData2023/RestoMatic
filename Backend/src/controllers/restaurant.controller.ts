import BaseController from "./base.controller";
import Restaurant from "../models/restaurant.model";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

const MODEL = new Restaurant();

class RestaurantController extends BaseController {
  constructor() {
    super(MODEL);
  }

  create = asyncHandler(async (req: Request, res: Response) => {
    const restaurant = await this.model.create(req.body);
    if (!restaurant.data) {
      res.status(400).json(restaurant);
      return;
    }
    res.status(201).json(restaurant);
  });
}

export default RestaurantController;
