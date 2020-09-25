import axios from 'axios';
const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api';

export const signIn = async data =>
  await axios({
    url: `${BASE_URL}/accounts/auth/login/`,
    data,
    method: 'POST',
  });

export const getUserInfo = async authorization =>
  await axios({
    url: `${BASE_URL}/accounts/auth/account/get/`,
    method: 'GET',
    headers: {
      Authorization: `Token ${authorization}`,
    },
  });
