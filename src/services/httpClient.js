import axios from "axios";

const httpClient = axios.create({
  // baseURL: "http://localhost:5000/api/v1/",
  baseURL: "http://hrpro.aplusdev.tech/api/v1/",
  withCredentials: true,
});


export default httpClient;
