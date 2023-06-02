import BaseModel from "./base.model";

const TABLE_NAME = "order_menu_item";

class OrderMenuItem extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }
}

export default OrderMenuItem;
