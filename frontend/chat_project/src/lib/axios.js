// here to create an instance that we use throughout our application

import axios from "axios";

//making a variable  

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});
