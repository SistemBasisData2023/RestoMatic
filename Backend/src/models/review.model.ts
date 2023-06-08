import BaseModel from "./base.model";
import { buildResponse } from "../utils/utils";

const TABLE_NAME = "reviews";

class Review extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }

  public async create(restaurant: any) {
    let { customer_id, restaurant_id, rating } = restaurant;
    const comment = restaurant.comment || "-";

    if (!customer_id || !restaurant_id || !rating) {
      return buildResponse(
        null,
        `[db] Insertion to ${TABLE_NAME} failed: Missing customer_id, restaurant_id or rating`
      );
    }
    rating = Number(rating);
    if (Number(rating) < 0.0 || Number(rating) > 5.0) {
      console.log(
        `[db] Insertion to ${this.tableName} failed: Rating must be between 0.0 and 5.0`
      );
      return buildResponse(
        null,
        `Insertion to ${this.tableName} failed: Rating must be between 0.0 and 5.0`
      );
    }

    const query = `INSERT INTO ${this.tableName} 
                  (customer_id, restaurant_id, rating, comment)
                  VALUES (${customer_id}, ${restaurant_id}, ${rating}, '${comment}')
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

  public async getByRestaurantId(restaurant_id: number) {
    const query = `SELECT *
                    FROM ${this.tableName}
                    WHERE restaurant_id = ${restaurant_id}
                  `;
    try {
      const res = await this.db.query(query);
      console.log(`[db] Query to ${this.tableName} successful`, res.rows[0]);
      return buildResponse(
        res.rows[0],
        `Query to ${this.tableName} successful`
      );
    } catch (err) {
      console.error(`[db] Error querying ${this.tableName}:`, err.message);
      return buildResponse(null, err.message);
    }
  }
}

export default Review;
