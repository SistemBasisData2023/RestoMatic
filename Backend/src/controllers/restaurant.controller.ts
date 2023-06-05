import BaseController from "./base.controller";
import Restaurant from "../models/restaurant.model";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

const MODEL = new Restaurant();

class RestaurantController extends BaseController {
  constructor() {
    super(MODEL);
  }

  create = asyncHandler(async (req: Request, res: Response) => {
    const restaurant = await this.model.create(req.body);
    if (!restaurant.data) {
      res.status(400).json(restaurant);
      return;
    }
    res.status(201).json(restaurant);
  });

  // @GET /resource: Get all resources
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const q = `SELECT
                r.id,
                r.image,
                r.name,
                r.description,
                ROUND(AVG(rv.rating)::numeric, 2) AS average_rating
              FROM
                restaurants AS r
                LEFT JOIN reviews AS rv ON r.id = rv.restaurant_id
              GROUP BY
                r.id,
                r.image,
                r.name,
                r.description;
              `;
    const resp = await this.model.getAll(q);

    if (!resp.data) {
      res.status(404).json(resp);
      return;
    }

    res.status(200).json(resp);
  });

  // @GET /resource/:id: Get resource by id
  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const q = `SELECT
                r.id,
                r.image,
                r.name,
                r.description,
                ROUND(AVG(rv.rating)::numeric, 2) AS average_rating
              FROM
                restaurants AS r
                LEFT JOIN reviews AS rv ON r.id = rv.restaurant_id
              WHERE 
                r.id = ${id}
              GROUP BY
                r.id,
                r.image,
                r.name,
                r.description;
              `;
    const resp = await this.model.getById(Number(id), q);
    if (!resp.data) {
      res.status(404).json(resp);
      return;
    }
    res.status(200).json(resp);
  });

  // @GET /resource?page=page&size=size: Get paginated resources
  paginate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.query.page || !req.query.size) {
        next();
        return;
      }

      const { page, size } = req.query;

      const q = `SELECT
                r.id,
                r.image,
                r.name,
                r.description,
                ROUND(AVG(rv.rating)::numeric, 2) AS average_rating
              FROM
                restaurants AS r
                LEFT JOIN reviews AS rv ON r.id = rv.restaurant_id
              GROUP BY
                r.id,
                r.image,
                r.name,
                r.description
              ORDER BY
                r.id
              LIMIT ${size} OFFSET ${(Number(page) - 1) * Number(size)};
              `;

      const resp = await this.model.paginate(Number(page), Number(size), q);
      if (!resp.data) {
        res.status(404).json({
          message: `ERR: No ${this.model.tableName} found for that specific page and size`,
        });
        return;
      }
      res.status(200).json(resp);
    }
  );
}

export default RestaurantController;
