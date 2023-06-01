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
    const resp = await this.model.getAll();
    if (!resp.data) {
      res.status(404).json(resp);
      return;
    }

    res.status(200).json(resp);
  });

  // @GET /resource/:id: Get resource by id
  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const resp = await this.model.getById(Number(id));
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
      const resp = await this.model.paginate(Number(page), Number(size));
      if (!resp.data) {
        res.status(404).json({
          message: `ERR: No ${this.model.tableName} found for that specific page and size`,
        });
        return;
      }
      res.status(200).json(resp);
    }
  );

  // @DELETE /resource/:id: Delete resource by id
  deleteById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const resp = await this.model.deleteById(Number(id));
    if (!resp.data) {
      res.status(400).json(resp);
      return;
    }
    res.status(200).json(resp);
  });
}

export default BaseController;
