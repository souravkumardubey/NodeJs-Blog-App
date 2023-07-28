require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");

const connectDB = require("./server/config/db");
const app = express();
app.use(express.static("public"));

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secretkey1234",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use(expressLayout);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
