import express from "express";

import ReviewController from "../controllers/review.controller";

const Reviews = new ReviewController();
const ReviewRouter = express.Router();

/* GET ROUTES */
ReviewRouter.get("/reviews", Reviews.paginate, Reviews.getAll);

/* POST ROUTES */
ReviewRouter.post("/reviews", Reviews.create);

/* PATCH ROUTES */
// ReviewRouter.get("/reviews", Reviews.update);

/* PUT ROUTES */

/* DELETE ROUTES */

export default ReviewRouter;
