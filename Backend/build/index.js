"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnector_1 = __importDefault(require("./dbconfig/dbconnector"));
const routers_1 = __importDefault(require("./routers/routers"));
//import packages
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
//initialize the app as an express app
const app = express();
const bcrypt = require("bcrypt");
//Melakukan koneksi dan menunjukkan indikasi database terhubung
dbconnector_1.default.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Database berhasil terkoneksi");
});
app.use(session({
    secret: "ini contoh secret",
    saveUninitialized: false,
    resave: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/todos", routers_1.default);
app.listen(4000, () => {
    console.log(`[server]: Server is running at http://localhost:${4000}`);
});
