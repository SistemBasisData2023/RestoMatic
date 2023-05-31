import { Client } from "pg";
import db from "../config/db.config";

class BaseModel {
  public tableName: string;
  public db: Client;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.db = db;
  }

  async getAll(): Promise<any> | undefined {
    const query = `SELECT * FROM ${this.tableName};`;
    const res = await this.db.query(query);
    console.log("HElLo!");
    if (res.rowCount < 1) {
      console.error(`[db] ${this.tableName} table is empty!`);
      return;
    }
    `[db] Succesfully retrieved from table ${this.tableName}`;
    return res.rows;
  }

  async getById(id: number): Promise<any> | undefined {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ${id};`;
    const res = await this.db.query(query);

    if (res.rowCount < 1) {
      console.error(`[db] ${this.tableName} with id ${id} not found!`);
      return;
    }
    console.log(`[db] ${this.tableName} found with id`, id);
    return res.rows[0];
  }

  async deleteById(id: number): Promise<any> | undefined {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id} RETURNING *;`;
    try {
      const res = await this.db.query(query);
      console.log(`[db] Deletion successful from ${this.tableName}`);
      return res.rows[0];
    } catch (err) {
      console.error(
        `[db] Error deleting from ${this.tableName}: `,
        err.message
      );
      return;
    }
  }

  async paginate(page: number, size: number): Promise<any> | undefined {
    const offset = size * (page - 1);
    const query = `SELECT * FROM ${this.tableName} 
                    LIMIT ${size} OFFSET ${offset};`;
    try {
      const res = await this.db.query(query);
      console.log(`[db] ${this.tableName} agination successful`, res.rows);
      return res.rows;
    } catch (err) {
      console.error(`[db] Error paginating ${this.tableName}`, err.message);
      return;
    }
  }
}

export default BaseModel;
