// express
import express, { Request, Response } from "express";
// imports
import { Prisma, PrismaClient } from "@prisma/client";
import { AxiosError } from "axios";

// libraries
import {
  geocodingApiAxios,
  weatherApiAxios,
} from "../common/lib/axios-instances";

// types
import { CreateIncidentBody, GetAllIncidentsQuery } from "../common/types";

// initialize prisma client
const prisma = new PrismaClient();

// create a new incident
export const createIncident = async (req: Request, res: Response) => {
  // get the data from the request body
  const { client_id, incident_desc, city, country } = req.body as CreateIncidentBody;

  try {
    // get lat and lon from city and country
    const { data: geocodeData } = await geocodingApiAxios.get(
      `/direct?q=${city},${country}&limit=1&appid=${process.env.OPEN_WEATHER_MAPS_API_KEY}`
    );

    const { lat, lon } = geocodeData[0];

    // get weather report from lat and lon
    const { data: weatherData } = await weatherApiAxios.get(
      `/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAPS_API_KEY}`
    );

    const newIncident = await prisma.incidents.create({
      data: {
        client_id,
        incident_desc,
        city,
        country,
        weather_report: weatherData,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Incident created successfully",
      data: newIncident,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof AxiosError
    ) {
      res.status(500).json({
        status: "error",
        message: error.message,
        data: null,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
        data: null,
      });
    }
  }
};

// get all incidents
export const getAllIncidents = async (req: Request, res: Response) => {
  // get pagination query params
  const { take = 10, skip = 0 } = req.query as GetAllIncidentsQuery;

  try {
    const incidents = await prisma.incidents.findMany({
      take: Number(take),
      skip: Number(skip),
    });

    res.status(200).json({
      status: "success",
      message: "Incidents fetched successfully",
      data: incidents,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({
        status: "error",
        message: error.message,
        data: null,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
        data: null,
      });
    }
  }
}