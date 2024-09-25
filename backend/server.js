// import express from "express";
// import { connectDB } from "./config/db.js";
// import productRouter from "./routes/products.routes.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());


// // Use product routes
// app.use("/api/products", productRouter);

// // Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve frontend static assets in production
// if (process.env.NODE_ENV === "production") {
//   console.log(
//     "Serving static files from",
//     path.join(__dirname, "/frontend/dist")
//   );
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     console.log("Serving index.html for", req.url);
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }


// // Connect to the database and start the server
// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server running on port http://localhost:${PORT}`);
// });
import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";

import productRouter from "./routes/products.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});