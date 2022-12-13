// create a new incident 
export type CreateIncidentBody = {
  client_id: number;
  incident_desc: string;
  city: string;
  country: string;
}

// get all incidents
export type GetAllIncidentsQuery = {
  take?: number;
  skip?: number;
}