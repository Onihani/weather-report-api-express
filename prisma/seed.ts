import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const incidentsData: Prisma.IncidentsCreateInput[] = [
  {
    id: "d4c7342e-7db3-415f-9d56-1024db590c6d",
    client_id: 1,
    incident_desc: "Test Description",
    city: "London",
    country: "GB",
    weather_report: {
      dt: 1670947260,
      id: 2643743,
      cod: 200,
      sys: {
        id: 2075535,
        type: 2,
        sunset: 1670946689,
        country: "GB",
        sunrise: 1670918277,
      },
      base: "stations",
      main: {
        temp: 273.59,
        humidity: 88,
        pressure: 1004,
        temp_max: 274.84,
        temp_min: 272.22,
        feels_like: 271.32,
      },
      name: "London",
      wind: {
        deg: 68,
        gust: 5.35,
        speed: 1.91,
      },
      coord: {
        lat: 51.5074,
        lon: -0.1278,
      },
      clouds: {
        all: 100,
      },
      weather: [
        {
          id: 804,
          icon: "04n",
          main: "Clouds",
          description: "overcast clouds",
        },
      ],
      timezone: 0,
      visibility: 10000,
    },
    date: "2022-12-13T16:04:31.217Z",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const incident of incidentsData) {
    const newIncident = await prisma.incidents.create({
      data: incident,
    });
    console.log(`Added incident with id: ${newIncident.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
