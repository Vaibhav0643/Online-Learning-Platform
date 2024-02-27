import { app } from "./app.js";
import { PORT } from "./configs/index.js";
import { pool } from "./db/index.js";

const runApp = () => {
  pool
    .connect()
    .then(() => {
      console.log("Connected to the database");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => console.error("Error connecting to the database", error));
};

export { runApp };
