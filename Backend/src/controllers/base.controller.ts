import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer.model";
import BaseModel from "../models/base.model";

class BaseController {
  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  // @GET /resource: Get all resources
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.model.getAll();
    if (!data) {
      res
        .status(404)
        .json({ message: `ERR: ${this.model.tableName} table empty` });
      return;
    }

    res.status(200).json(data);
  });

  // @GET /resource/:id: Get resource by id
  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.model.getById(Number(id));
    if (!data) {
      res.status(404).json({
        message: `ERR: ${this.model.tableName} with id ${id} not found`,
      });
      return;
    }
    res.status(200).json(data);
  });

  // @GET /resource?page=page&size=size: Get paginated resources
  paginate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.query.page || !req.query.size) {
        next();
        return;
      }

      const { page, size } = req.query;
      const data = await this.model.paginate(Number(page), Number(size));
      if (!data) {
        res.status(404).json({
          message: `ERR: No ${this.model.tableName} found for that specific page and size`,
        });
        return;
      }
      res.status(200).json(data);
    }
  );

  // @DELETE /resource/:id: Delete resource by id
  deleteById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.model.deleteById(Number(id));
    if (!data) {
      res.status(400);
      return;
    }
    res.status(200).json(data);
  });
}

export default BaseController;
