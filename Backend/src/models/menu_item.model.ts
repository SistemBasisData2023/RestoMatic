import BaseModel from "./base.model";
import { buildResponse } from "../utils/utils";

const TABLE_NAME = "menu_items";

class MenuItem extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }

  public async create(data: any) {
    const { restaurant_id, image, type, price, name, description } = data;
    if (
      !restaurant_id ||
      !image ||
      !type ||
      !price ||
      !name ||
      !description ||
      price < 0
    ) {
      console.error(`[db] Invalid data to insert to ${this.tableName}!`);
      return buildResponse(
        null,
        `Invalid data to insert to ${this.tableName}!`
      );
    }
    const insertQuery = `
          INSERT INTO ${this.tableName} 
          (restaurant_id, image, type, price, name, description)
          VALUES 
          ($1, $2, $3::item_type, $4, $5, $6)
          RETURNING *;
        `;

    const values = [restaurant_id, image, type, price, name, description];
    try {
      const res = await this.db.query(insertQuery, values);
      if (res.rowCount < 1) {
        console.error(`[db] Error inserting to ${this.tableName}!`);
        return buildResponse(null, `Error inserting to ${this.tableName}!`);
      }

      console.log(
        `[db] Insertion to ${this.tableName} successful:`,
        res.rows[0]
      );

      return buildResponse(
        res.rows[0],
        `Insertion to ${this.tableName} successful:`
      );
    } catch (err) {
      console.error(`[db] Error inserting to ${this.tableName}:`, err.message);
      return buildResponse([], err.message);
    }
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
