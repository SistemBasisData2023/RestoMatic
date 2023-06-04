import express, { Router } from "express";

import RestaurantController from "../controllers/restaurant.controller";

const Restaurants = new RestaurantController();
const RestaurantRouter = express.Router();

/* GET ROUTES */
RestaurantRouter.get("/restaurants", Restaurants.paginate, Restaurants.getAll);
RestaurantRouter.get("/restaurants/:id", Restaurants.getById);

/* POST ROUTES */
RestaurantRouter.post("/restaurants", Restaurants.create);

/* PATCH ROUTES */

/* PUT ROUTES */

/* DELETE ROUTES */

RestaurantRouter.delete("/restaurants/:id", Restaurants.deleteById);

export default RestaurantRouter;
