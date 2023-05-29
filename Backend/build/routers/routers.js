"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers/controllers"));
const router = (0, express_1.Router)();
const todosController = new controllers_1.default();
router.get("/todos", todosController.get);
exports.default = router;
