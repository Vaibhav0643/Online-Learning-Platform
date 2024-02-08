import pkg from "pg";
const { Pool } = pkg;

import { DB_URL } from "../configs/index.js";

const pool = new Pool({
  connectionString: DB_URL,
  ssl: false,
});

export { pool };
