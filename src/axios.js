import axios from "axios";

const instance = axios.create({
  // development
  //baseURL: 'http://127.0.0.1:8000',
  // production
  baseURL: 'https://homebuilder.herokuapp.com',
  timeout: 30000,
});



export default instance