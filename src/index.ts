// express
import express from "express";

// intialize express app
const app = express();

// routes
import incidentsRoute from "./routes/incidents.route";

// port
const serverPort = process.env.PORT || 3000;

// middleware to parse requests with json body
app.use(express.json());

// use routes
app.use("/incidents", incidentsRoute);

// start the Express server
const server = app.listen(serverPort, () =>
  console.log(`🚀 Application is running at: http://localhost:${serverPort}`)
);
