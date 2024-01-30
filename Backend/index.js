import express from "express";
import cors from "cors";

import { PORT } from "./src/configs/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});
