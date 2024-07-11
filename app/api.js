import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
  timeout: 10000,
});
