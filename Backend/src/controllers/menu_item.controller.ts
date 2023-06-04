import BaseController from "./base.controller";
import MenuItem from "../models/menu_item.model";

const MODEL = new MenuItem();

class MenuItemController extends BaseController {
  constructor() {
    super(MODEL);
  }
}

export default MenuItemController;
