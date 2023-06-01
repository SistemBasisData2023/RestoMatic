import { Pool } from "pg";
import dotenv from "dotenv";

// dotenv
dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

export const dbConfig = {
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  port: Number(PGPORT),
  password: PGPASSWORD,
  ssl: true,
};

export const db = new Pool(dbConfig);
