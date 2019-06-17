import axios from 'axios';

let api = 'https://triple7-eating-house.herokuapp.com/api/v1';

export default axios.create({
  baseURL: api,
});