import BaseController from "./base.controller";
import Review from "../models/review.model";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

const MODEL = new Review();

class ReviewController extends BaseController {
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

export default ReviewController;
