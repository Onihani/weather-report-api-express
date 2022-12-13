import axios from 'axios';

export const weatherApiAxios = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const geocodingApiAxios = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0',
  headers: {
    'Content-Type': 'application/json',
  },
});
