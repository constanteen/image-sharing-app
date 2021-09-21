import axios from "axios";

export const client = axios.create({
  baseURL: `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}`,
});