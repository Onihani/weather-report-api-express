// express
import { Request, Response, NextFunction } from "express";
// imports
import { validationResult } from "express-validator"; // express-validator: middleware for validating data

export const validateCreateIncident = (req: Request, res: Response, next: NextFunction) => {
  // check for validation errors
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Invalid request body",
      data: errors.array(),
    });
  }

  next();
}