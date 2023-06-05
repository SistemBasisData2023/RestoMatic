import { db, dbConfig } from "./config/db.config";
//import packages
import express from "express";
import bodyParser from "body-parser";
// import router
import CustomerRouter from "./routes/customer.routes";
import RestaurantRouter from "./routes/restaurant.routes";
import MenuItemRouter from "./routes/menu_item.routes";
import ReviewRouter from "./routes/review.routes";
import OrderRouter from "./routes/order.routes";
import OrderMenuItemRouter from "./routes/order_menu_item.routes";

import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import expressSession, { Cookie } from "express-session";
declare module "express-session" {
  interface SessionData {
    userId: string;
    isAuth: boolean;
    customData: string;
  }
}

//initialize the app as an express app
const app = express();
dotenv.config();

const { COOKIE_SECRET } = process.env;

app.use(bodyParser.json());
// app.use(express.raw({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));

const pgSession = require("connect-pg-simple")(expressSession);
const pgStore = new pgSession({
  pool: db,
  createTableIfMissing: true,
});

app.use(
  expressSession({
    genid: () => {
      return uuidv4();
    },
    store: pgStore,
    secret: String(COOKIE_SECRET),
    saveUninitialized: false,
    resave: false,
    cookie: {
      // maxAge: 1000 * 60,
      maxAge: 1000 * 60 * 60 * 24 * 1,
    },
  })
);

// Melakukan koneksi dan menunjukkan indikasi database terhubung
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("[server] Database connected");
});

app.get("/", (req, res) => {
  res.send("Restomatic Backend");
});

app.use("/api", CustomerRouter);
app.use("/api", RestaurantRouter);
app.use("/api", MenuItemRouter);
app.use("/api", OrderMenuItemRouter);
app.use("/api", OrderRouter);
app.use("/api", ReviewRouter);

export default app;
