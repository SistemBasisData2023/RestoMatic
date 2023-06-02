import BaseModel from "./base.model";
import { buildResponse } from "../utils/utils";

const TABLE_NAME = "restaurants";

class Restaurant extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }

  public async create(restaurant: any) {
    const { name, description } = restaurant;
    const image = restaurant.image || "/images/default-restaurant.png";

    if (!name || !description) {
      return buildResponse(
        null,
        `[db] Insertion to ${this.tableName} failed: Missing name or description`
      );
    }

    const query = `INSERT INTO ${this.tableName} (name, description, image)
                  VALUES ('${name}', '${description}', '${image}') 
                  RETURNING *`;

    try {
      const res = await this.db.query(query);
      console.log(
        `[db] Insertion to ${this.tableName} successful`,
        res.rows[0]
      );

      // If insertion is successful, return true
      return buildResponse(
        res.rows[0],
        `[db] Insertion to ${this.tableName} successful`
      );
    } catch (err) {
      console.error(`[db] Error inserting to ${this.tableName}:`, err.message);
      // If insertion is not successful, return false
      return buildResponse(null, err.message);
    }
  }
}

export default Restaurant;
