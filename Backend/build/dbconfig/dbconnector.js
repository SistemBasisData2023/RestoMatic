"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db = new pg_1.Client({
    user: "seno.pamungkas",
    host: "ep-dawn-lake-736428.ap-southeast-1.aws.neon.tech",
    database: "database",
    ssl: {
        rejectUnauthorized: false,
    },
    password: "passs",
    port: 4000,
});
exports.default = db;
