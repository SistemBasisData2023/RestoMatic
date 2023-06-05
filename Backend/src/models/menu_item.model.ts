import BaseModel from "./base.model";
import { buildResponse } from "../utils/utils";

const TABLE_NAME = "menu_items";

class MenuItem extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }

  public async getMenuItemsByRestaurantId(restaurant_id: any) {
    const query = `SELECT * FROM ${this.tableName} 
                    WHERE restaurant_id = ${restaurant_id};`;
    try {
      const res = await this.db.query(query);
      if (res.rowCount < 1) {
        console.error(
          `[db] ${this.tableName} with restaurant_id ${restaurant_id} not found!`
        );
        return buildResponse(
          [],
          `No ${this.tableName} with restaurant_id ${restaurant_id} found!`
        );
      }

      console.log("[db] Menu Items found!");
      return buildResponse(
        res.rows,
        `${this.tableName} with restaurant id: ${restaurant_id} found!`
      );
    } catch (err) {
      console.log(
        `[db] Error getting ${this.tableName} with restaurant id: ${restaurant_id}:`,
        err.message
      );
      return buildResponse([], err.message);
    }
  }
}

export default MenuItem;
