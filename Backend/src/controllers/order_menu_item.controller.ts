import BaseController from "./base.controller";
import OrderMenuItem from "../models/order_menu_item.model";

const MODEL = new OrderMenuItem();

class OrderMenuItemController extends BaseController {
  constructor() {
    super(MODEL);
  }
}

export default OrderMenuItemController;
