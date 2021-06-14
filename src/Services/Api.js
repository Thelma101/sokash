import axios from "axios";
import { getToken } from "./UserToken";

// var apiUrl = "https://softkash-api.herokuapp.com/api"
// var apiUrl = "https://backend.api.sokash.co/public/api"
var apiUrl = "https://sokash-backend-api.sokash.co/api"

const Api = () => {
  const token = getToken();
  return axios.create({
    baseURL: apiUrl,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


const ApiForImage = () => {
  const token = getToken();
  return axios.create({
    baseURL: apiUrl,
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export { Api as default, ApiForImage };