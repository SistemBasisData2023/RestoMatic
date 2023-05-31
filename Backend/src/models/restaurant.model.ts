import BaseModel from "./base.model";

const TABLE_NAME = "restaurants";

class Restaurant extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }
}

export default Restaurant;
