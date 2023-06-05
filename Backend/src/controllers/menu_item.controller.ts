import BaseController from "./base.controller";
import MenuItem from "../models/menu_item.model";
import { NextFunction, Request, Response } from "express";

const MODEL = new MenuItem();

class MenuItemController extends BaseController {
  constructor() {
    super(MODEL);
  }

  // @GET /menu-items/restaurant/:id: Get menu items by restaurant id
  getMenuItemsByRestaurantId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { restaurantId } = req.query;
    if (!restaurantId) {
      next();
      return;
    }

    const resp = await MODEL.getMenuItemsByRestaurantId(Number(restaurantId));
    if (!resp.data) {
      res.status(404).json(resp);
      return;
    }
    res.status(200).json(resp);
  };
}

export default MenuItemController;
