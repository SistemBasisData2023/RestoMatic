import BaseController from "./base.controller";
import Restaurant from "../models/restaurant.model";

const MODEL = new Restaurant();

class RestaurantController extends BaseController {
  constructor() {
    super(MODEL);
  }
}

export default RestaurantController;
