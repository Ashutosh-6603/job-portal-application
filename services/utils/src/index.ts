import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/utils", routes);

app.listen(PORT, () => {
  console.log(`Utils Service is running on port ${PORT}`);
});
