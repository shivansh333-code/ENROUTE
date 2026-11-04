
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://enroute-backend-jb6g.onrender.com/api"
    : "http://localhost:5000/api",
  withCredentials: true,
});

export default API;
