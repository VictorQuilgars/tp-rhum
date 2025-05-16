const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const path = require("path");
const helmet = require('helmet')

dotenv.config();
connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use(helmet())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ingredients", require("./routes/ingredientRoutes"));
app.use("/api/rhums", require("./routes/rhumRoutes"));
app.use("/api/recettes", require("./routes/recetteRoutes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
);
