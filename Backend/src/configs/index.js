import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;

export { PORT, DB_USER_NAME, DB_USER_PASSWORD, DB_NAME, DB_PORT, DB_HOST };
