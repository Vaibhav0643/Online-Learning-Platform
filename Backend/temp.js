import { pool } from "./src/db/index.js";

const fn = async () => {
  let q = `DELETE FROM users_courses`;
  await pool.query(q);
  q = `SELECT * FROM users_courses`;
  let result = await pool.query(q);
  console.log("users_courses  :  ", result.rows);

  q = `DELETE FROM course_videos`;
  await pool.query(q);
  q = `SELECT * FROM course_videos`;
  result = await pool.query(q);
  console.log("course_videos  :  ", result.rows);

  q = `DELETE FROM courses`;
  await pool.query(q);
  q = `SELECT * FROM courses`;
  result = await pool.query(q);
  console.log("courses  :  ", result.rows);

  q = `DELETE FROM users`;
  await pool.query(q);
  q = `SELECT * FROM users`;
  result = await pool.query(q);
  console.log("users   :   ", result.rows);
};

fn();

const getTableSchema = async (tableName) => {
  const query = `
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = $1;
  `;

  const result = await pool.query(query, [tableName]);

  const schema = result.rows.map((row) => ({
    columnName: row.column_name,
    dataType: row.data_type,
  }));

  console.log(`Schema for table ${tableName}:`, schema);
};

// Call this function for each table
(async () => {
  try {
    await getTableSchema("users");
    await getTableSchema("courses");
    await getTableSchema("course_videos");
    await getTableSchema("users_courses");
  } catch (error) {
    console.error("Error fetching table schemas:", error);
  } finally {
    pool.end(); // Close the pool when done
  }
})();
