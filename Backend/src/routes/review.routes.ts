import express from "express";

import ReviewController from "../controllers/review.controller";

const Reviews = new ReviewController();
const ReviewRouter = express.Router();

/* GET ROUTES */
ReviewRouter.get(
  "/reviews",
  Reviews.paginate,
  Reviews.getByRestaurantId,
  Reviews.getAll
);

ReviewRouter.get("/reviews/:id", Reviews.getById);

/* POST ROUTES */
ReviewRouter.post("/reviews", Reviews.create);

/* PATCH ROUTES */
// ReviewRouter.get("/reviews", Reviews.update);

/* PUT ROUTES */

/* DELETE ROUTES */
ReviewRouter.delete("/reviews/:id", Reviews.deleteById);
export default ReviewRouter;
