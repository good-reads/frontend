import axios from 'axios';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api';

export const addNewBook = async (authorization, formData) =>
  await axios({
    url: `${BASE_URL}/books/register/`,
    method: 'PUT',
    data: formData,
    headers: {
      Authorization: `Token ${authorization}`,
      'Content-Type': 'multipart/form-data',
    },
  });
