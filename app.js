require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/db");
const app = express();
app.use(express.static("public"));

const PORT = 5000 || process.env.PORT;

connectDB();
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
