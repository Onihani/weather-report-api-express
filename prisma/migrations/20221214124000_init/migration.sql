-- CreateTable
CREATE TABLE "Incidents" (
    "id" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,
    "incident_desc" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "weather_report" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incidents_pkey" PRIMARY KEY ("id")
);
