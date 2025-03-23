const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ingredients", require("./routes/ingredientRoutes"));
app.use("/api/rhums", require("./routes/rhumRoutes"));
app.use("/api/recettes", require("./routes/recetteRoutes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
);
