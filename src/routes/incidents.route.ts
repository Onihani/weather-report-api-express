// express
import express from "express";
// imports
import { body } from "express-validator"; // express-validator: middleware for validating data

// controllers
import {
  createIncident,
  getAllIncidents,
} from "../controllers/incidents.controller";

// middlewares
import { validateCreateIncident } from "../middlewares/incidents.middleware";

// intialize express router
const router = express.Router();

// create a new incident route
router.post(
  "/",
  // client id must be a number
  body("client_id").isNumeric(),
  // incident description must be a string
  body("incident_desc").isString(),
  // city must be a string
  body("city").isString(),
  // country must be a string
  body("country").isISO31661Alpha2(),
  validateCreateIncident,
  createIncident
);

// get all incidents route
router.get("/", getAllIncidents);

// export router
export default router;
