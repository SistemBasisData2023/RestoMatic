import express, { Router } from "express";

import MenuItemController from "../controllers/menu_item.controller";

const MenuItems = new MenuItemController();
const MenuItemRouter = express.Router();

/* GET ROUTES */
MenuItemRouter.get(
  "/menu-items",
  MenuItems.getMenuItemsByRestaurantId,
  MenuItems.paginate,
  MenuItems.getAll
);
MenuItemRouter.get("/menu-items/:id", MenuItems.getById);

/* POST ROUTES */

/* PATCH ROUTES */

/* PUT ROUTES */

/* DELETE ROUTES */

export default MenuItemRouter;
