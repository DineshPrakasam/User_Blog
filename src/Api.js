import axios from "axios";

// const API_URL = 'http://localhost:3005/';
 const API_URL = 'https://user-blog-backend.herokuapp.com/'

export default axios.create({
  baseURL: API_URL,
});
