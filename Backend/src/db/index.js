import pkg from "pg";
const { Pool } = pkg;

import {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER_NAME,
  DB_USER_PASSWORD,
} from "../configs/index.js";

const pool = new Pool({
  user: DB_USER_NAME,
  password: DB_USER_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  host: DB_HOST,
});

export { pool };
