import axios from 'axios';
import { signOut } from 'next-auth/client';
import Router from 'next/router';

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

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { status } = error.response;

    if (status === 401) {
      signOut();
      Router.push('/signin');
    }

    return Promise.reject(error);
  },
);
