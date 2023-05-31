import db from "./config/db.config";
//import packages
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
// import router
import CustomerRouter from "./routes/customer.routes";
import RestaurantRouter from "./routes/restaurant.routes";
import MenuItemRouter from "./routes/menu_item.routes";

//initialize the app as an express app
const app = express();
import bcrypt from "bcrypt";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Melakukan koneksi dan menunjukkan indikasi database terhubung
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("[server] Database connected");
});

app.use(
  session({
    secret: "ini contoh secret",
    saveUninitialized: false,
    resave: false,
  })
);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", CustomerRouter);
app.use("/api", RestaurantRouter);
app.use("/api", MenuItemRouter);
// app.use("/api", OrderMenuItemRouter);
// app.use("/api", OrderRouter);
// app.use("/api", ReviewRouter);

export default app;
