import axios from 'axios';

export const nextApi = axios.create({
  baseURL: '/api',
});

export const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(async request => {
  try {
    const response = await nextApi.get('/token');

    if (response.data) {
      request.headers.authorization = `Bearer ${response.data}`;
    }
  } catch (err) {
    console.log(err);
  }

  return request;
});
