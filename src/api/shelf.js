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
