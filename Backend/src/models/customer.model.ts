import db from "../config/db.config";
import BaseModel from "./base.model";

const TABLE_NAME = "customers";

class Customer extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }

  public async create(customer: any) {
    const { username, email, password, balance } = customer;
    const DEFAULT_BALANCE: Number = balance || 0.0;

    const query = `INSERT INTO ${this.tableName} (username, email, password, balance) 
                  VALUES ('${username}', '${email}', 
                  '${password}', ${DEFAULT_BALANCE})
                  RETURNING *;`;

    try {
      const res = await db.query(query);
      // console.log(res.rows[0]);
      console.log(
        `[db] Insertion to ${this.tableName} successful:`,
        res.rows[0]
      );
      // If insertion is successful, return true
      return res.rows[0];
    } catch (err) {
      console.error(`[db] Error inserting to ${this.tableName}:`, err.message);
      // If insertion is not successful, return false
      return;
    }
  }
}

export default Customer;
