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
