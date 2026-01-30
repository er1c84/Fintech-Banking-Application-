import axios from "axios";

// http request
export const http = (accessToken=null) => {
  axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
  if (accessToken){
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  return axios;
}

//trim data
export const trimData = (obj) => {
  const newObj = {};
  for (let key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      newObj[key] = typeof obj[key] === "string" ? obj[key].trim() : obj[key];
    }
  }
  return newObj;
};