import { db } from "../config/db.config";
import { buildResponse } from "../utils/utils";
import BaseModel from "./base.model";
import bcrypt from "bcrypt";

const TABLE_NAME = "customers";

class Customer extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }

  public async register(customer: any) {
    const { username, email, password, balance } = customer;
    const DEFAULT_BALANCE: Number = balance || 0.0;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `INSERT INTO ${this.tableName} (username, email, password, balance) 
                  VALUES ('${username}', '${email}', 
                  '${hashedPassword}', ${DEFAULT_BALANCE})
                  RETURNING *;`;

    try {
      const res = await db.query(query);
      console.log(
        `[db] Insertion to ${this.tableName} successful:`,
        res.rows[0]
      );

      // If insertion is successful, return true
      return buildResponse(
        res.rows[0],
        `[db] Insertion to ${this.tableName} successful:`
      );
    } catch (err) {
      console.error(`[db] Error inserting to ${this.tableName}:`, err.message);
      // If insertion is not successful, return false
      return buildResponse([], err.message);
    }
  }

  //TODO: Edit log and message details
  public async login(customer: any) {
    const { email, password } = customer;
    const query = `SELECT * FROM ${this.tableName} WHERE email = '${email}';`;

    try {
      const res = await db.query(query);
      // If email is not found, return false
      if (res.rowCount < 1) {
        console.error(`[db] ${this.tableName} with email ${email} not found!`);
        return buildResponse(
          { login: false },
          `No ${this.tableName} with email ${email} found!`
        );
      }
      // If email is found, compare password
      const hashedPassword = res.rows[0].password;
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
      // If password does not match, return false
      if (!isPasswordMatch) {
        console.error(`[db] Password does not match!`);
        return buildResponse({ login: false }, `Password does not match!`);
      }
      // If password matches, return true
      console.log(`[db] ${this.tableName} found with matching details`);
      return buildResponse(
        {
          login: true,
          accountDetails: { id: res.rows[0].id, email: res.rows[0].email },
        },
        `Succesfully logged in`
      );
    } catch (err) {
      console.error(`[db] Error logging in ${this.tableName}`, err.message);
      return buildResponse({ login: false }, err.message);
    }
  }
}

export default Customer;
