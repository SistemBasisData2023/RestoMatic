import BaseModel from "./base.model";
import { buildResponse } from "../utils/utils";

const TABLE_NAME = "reviews";

class Review extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }

  public async create(restaurant: any) {
    const { customer_id, restaurant_id, rating } = restaurant;
    const comment = restaurant.comment || "-";

    if (!customer_id || !restaurant_id || !rating) {
      return buildResponse(
        null,
        `[db] Insertion to ${this.tableName} failed: Missing customer_id, restaurant_id or rating`
      );
    }

    const query = `INSERT INTO ${this.tableName} 
                  (customer_id, restaurant_id, rating, comment)
                  VALUES (${customer_id}, ${restaurant_id}, ${rating}, '${comment}')`;

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

export default Review;
