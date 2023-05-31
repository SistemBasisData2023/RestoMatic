import express, { Router } from "express";

import RestaurantController from "../controllers/restaurant.controller";

const Restaurants = new RestaurantController();
const RestaurantRouter = express.Router();

/* GET ROUTES */
RestaurantRouter.get("/restaurants", Restaurants.paginate, Restaurants.getAll);

/* POST ROUTES */

/* PATCH ROUTES */

/* PUT ROUTES */

/* DELETE ROUTES */

export default RestaurantRouter;
