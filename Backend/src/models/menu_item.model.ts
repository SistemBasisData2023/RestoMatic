import BaseModel from "./base.model";

const TABLE_NAME = "menu_items";

class MenuItem extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }
}

export default MenuItem;
