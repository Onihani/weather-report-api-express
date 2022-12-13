// express
import express from "express";
// imports
import SwaggerUi from 'swagger-ui-express';

// intialize express app
const app = express();

// swagger
import swaggerDocument from './swagger/swagger.json';

// routes
import incidentsRoute from "./routes/incidents.route";

// port
const serverPort = process.env.PORT || 3000;

// middleware to parse requests with json body
app.use(express.json());

// use routes
app.use("/incidents", incidentsRoute);

// use swagger
app.use('/swagger', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

// default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start the Express server
const server = app.listen(serverPort, () =>
  console.log(`🚀 Application is running at: http://localhost:${serverPort}`)
);
