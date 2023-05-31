import express, { Router } from "express";

import MenuItemController from "../controllers/menu_item.controller";

const MenuItems = new MenuItemController();
const MenuItemRouter = express.Router();

/* GET ROUTES */
MenuItemRouter.get("/menuItems", MenuItems.paginate, MenuItems.getAll);

/* POST ROUTES */

/* PATCH ROUTES */

/* PUT ROUTES */

/* DELETE ROUTES */

export default MenuItemRouter;
