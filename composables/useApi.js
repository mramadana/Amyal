import axios from "axios";

export const useApi = () => {
  const baseURL = "https://amyalcar.com/api/";

  if(process.client){
    axios.defaults.headers.lang = localStorage.getItem("lang") || "ar";
  }

  return axios.create({
    baseURL,
  });
};