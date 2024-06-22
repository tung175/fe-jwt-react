import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 1000,
});

instance.defaults.withCredentials = true;

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    const status = error?.response?.status || 500;
    switch (status) {
      case 401:
        toast.error("Unauthorized the user, please login");
        return error.response.data;

      case 403:
        toast.error("you don't permission to access this resource ");
        return Promise.reject(error);

      case 400:
        toast.error("");
        return Promise.reject(error);

      case 404:
        toast.error();
        return Promise.reject(error);

      case 422:
        toast.error();
        return Promise.reject(error);

      default:
        return Promise.reject(error);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  }
);

export default instance;
