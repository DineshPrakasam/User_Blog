import axios from "axios";

const API_URL = 'http://localhost:3005/';

export default axios.create({
  baseURL: API_URL,
});