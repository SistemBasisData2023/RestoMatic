import { Pool } from "pg";
import { db } from "../config/db.config";
import { buildResponse } from "../utils/utils";

class BaseModel {
  public tableName: string;
  public db: Pool;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.db = db;
  }

  async getAll(q: string = null): Promise<any> | undefined {
    const query = q || `SELECT * FROM ${this.tableName};`;
    const res = await this.db.query(query);
    if (res.rowCount < 1) {
      console.error(`[db] ${this.tableName} table is empty!`);
      return buildResponse(res.rows, `This ${this.tableName} table empty`);
    }

    console.log(`[db] Succesfully retrieved from table ${this.tableName}`);
    return buildResponse(res.rows);
  }

  async getById(id: number, q: string = null): Promise<any> | undefined {
    const query = q || `SELECT * FROM ${this.tableName} WHERE id = ${id};`;
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

  async paginate(
    page: number,
    size: number,
    q: string = null
  ): Promise<any> | undefined {
    const offset = size * (page - 1);
    const query =
      q ||
      `SELECT * FROM ${this.tableName} 
                    LIMIT ${size} OFFSET ${offset};`;
    try {
      const res = await this.db.query(query);
      if (res.rowCount < 1) {
        const err_msg = `No ${this.tableName} found for that specific page and size`;
        console.error(err_msg);
        return buildResponse(res.rows, err_msg);
      }
      console.log(`[db] ${this.tableName} pagination successful`, res.rows);
      return buildResponse(res.rows);
    } catch (err) {
      console.error(`[db] Error paginating ${this.tableName}`, err.message);
      return buildResponse([], err.message);
    }
  }

  async deleteById(id: number): Promise<any> | undefined {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id} RETURNING *;`;
    try {
      const res = await this.db.query(query);
      if (res.rowCount < 1) {
        const err_msg: string = `No ${this.tableName} with id ${id} found!`;
        console.error(err_msg);
        return buildResponse(res.rows[0], err_msg);
      }

      console.log(`[db] Deletion successful from ${this.tableName}`);
      return buildResponse(res.rows[0]);
    } catch (err) {
      console.error(
        `[db] Error deleting from ${this.tableName}: `,
        err.message
      );
      return buildResponse([], err.message);
    }
  }
}

export default BaseModel;
