import axios from 'axios';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api';

export const addNewShelf = async (authorization, list_name) =>
  await axios({
    url: `${BASE_URL}/accounts/list/create/`,
    method: 'PUT',
    data: {
      list_name,
    },
    headers: {
      Authorization: `Token ${authorization}`,
    },
  });

export const addBookToShelf = async (authorization, list_id, isbn) =>
  await axios({
    url: `${BASE_URL}/accounts/list/edit/`,
    method: 'PUT',
    data: {
      type: 'ADD',
      list_id,
      booklist: [isbn],
    },
    headers: {
      Authorization: `Token ${authorization}`,
    },
  });

export const removeBookFromShelf = async (authorization, list_id, isbn) =>
  await axios({
    url: `${BASE_URL}/accounts/list/edit/`,
    method: 'PUT',
    data: {
      type: 'SUB',
      list_id,
      booklist: [isbn],
    },
    headers: {
      Authorization: `Token ${authorization}`,
    },
  });

export const removeShelf = async (authorization, list_id) =>
  await axios({
    url: `${BASE_URL}/accounts/list/delete/`,
    method: 'DELETE',
    data: {
      authorization,
      list_id,
    },
    headers: {
      Authorization: `Token ${authorization}`,
    },
  });
