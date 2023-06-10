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

  async getAll(q: string = null): Promise<any> | undefined {
    const query =
      q ||
      `
                  SELECT 
                    R.id,
                    R.customer_id,
                    C.username as customer_username,
                    R.restaurant_id,
                    RES.name AS restaurant_name,
                    RES.image as restaurant_image,
                    R.comment,
                    R.rating,
                    R.created_at
                  FROM reviews as R
                    INNER JOIN customers as C ON R.customer_id = C.id
                    INNER JOIN restaurants as RES ON R.restaurant_id = RES.id;         
                  `;
    const res = await this.db.query(query);
    if (res.rowCount < 1) {
      console.error(`[db] ${this.tableName} table is empty!`);
      return buildResponse(res.rows, `This ${this.tableName} table empty`);
    }

    console.log(`[db] Succesfully retrieved from table ${this.tableName}`);
    return buildResponse(res.rows);
  }

  async getById(id: number, q: string = null): Promise<any> | undefined {
    const query =
      q ||
      `
    SELECT 
                    R.id,
                    R.customer_id,
                    C.username as customer_username,
                    R.restaurant_id,
                    RES.name AS restaurant_name,
                    RES.image as restaurant_image,
                    R.comment,
                    R.rating,
                    R.created_at
                  FROM reviews as R
                    INNER JOIN customers as C ON R.customer_id = C.id
                    INNER JOIN restaurants as RES ON R.restaurant_id = RES.id
                  WHERE R.id = ${id};  
                    `;
    const res = await this.db.query(query);

    if (res.rowCount < 1) {
      console.error(`[db] ${this.tableName} with id ${id} not found!`);
      return buildResponse(
        res.rows[0],
        `No ${this.tableName} with id ${id} found!`
      );
    }
    console.log(`[db] ${this.tableName} found with id`, id);

    return buildResponse(res.rows[0]);
  }

  public async getByRestaurantId(restaurant_id: number) {
    const query = `
                  SELECT 
                    R.id,
                    R.customer_id,
                    C.username as customer_username,
                    R.restaurant_id,
                    RES.name AS restaurant_name,
                    RES.image as restaurant_image,
                    R.comment,
                    R.rating,
                    R.created_at
                  FROM reviews as R
                    INNER JOIN customers as C ON R.customer_id = C.id
                    INNER JOIN restaurants as RES ON R.restaurant_id = RES.id
                  WHERE restaurant_id = ${restaurant_id}
                  ORDER BY R.created_at DESC;`;
    try {
      const res = await this.db.query(query);
      console.log(`[db] Query to ${this.tableName} successful`, res.rows);
      return buildResponse(res.rows, `Query to ${this.tableName} successful`);
    } catch (err) {
      console.error(`[db] Error querying ${this.tableName}:`, err.message);
      return buildResponse(null, err.message);
    }
  }
}

export default Review;
