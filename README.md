# WEATHER REPORT API (WITH EXPRESS)

This project implements a **REST API with TypeScript** using [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). The project uses a Postgres database initial data for seeding a new database which you can find at [`./prisma/seed.ts`](./prisma/seed.ts).

## Getting started

### 1. Clone or Download project and install dependencies

Download this example:

```
git clone https://github.com/Onihani/weather-report-api-express.git
```

Navigate into the project's directory and install npm dependencies:

```
cd weather-report-api-express
npm install
```

### 2. Adding Environment Variables
Create a `.env` file in the project's roots directory
In the ```.env``` file add your `DATABASE_URL` and `OPEN_WEATHER_MAPS_API_KEY` variables
An example of how the env `.env` file should look like can be found in the [`.env.example`](./.env.example) file in the projects root

### 3. Create/Initialize the Database with Tables/Models

Run the following command to initialize your database. This also creates the `Incidents` table/model that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 4. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now run the API requests, e.g. [`http://localhost:3000/incidents`](http://localhost:3000/incidents).

### 5. API Documentation (Open API/Swagger Docs)
Visit [`http://localhost:3000/swagger`](http://localhost:3000/swagger) to interact with applications endpoints via the swagger ui.

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/`: Returns string `Hello World` to indicate the app running or working fine
- `/incidents?take={take}&skip={skip}`: Fetch all _reported incidents_ from the `incidents` table
  - Query Parameters (for pagination)
    - `take` (optional): This specifies how many objects should be returned in the list. (returns 10 items by default)
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped (skips 0 items by defualt)
### `POST`

- `/incident`: Add a new incident to the `incidents` table
  - Body:
    - `client_id: Number` (required): The id of the client reporting the incident
    - `incident_desc: String` (required): The description of the incident
    - `city: String` (required): The city where the incident occured. **Eg**: Accra
    - `country: String` (required): The ISO31661Alpha2 code of the country where the incident occured. **Eg**: GH for Ghana
