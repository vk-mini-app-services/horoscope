import axios from 'axios';
import { IGroups } from '../stores/types/UserStoreType';
import { NAME_PROJECT } from '../utils/constants';
import { BASE_URL } from './constants';
import { IAddUserInSubscriptionPayload, ISetAllHoroscopesPayload } from './types';

export const addApp = async (appName: string) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/app/add-app`,
    data: { name: appName }
  });
};

export const addUserInSubscription = async (payload: IAddUserInSubscriptionPayload) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/noty/add-user`,
    data: payload
  });
};

export const getHoroscopeToday = async () => {
  return await axios({
    url: `${BASE_URL}/horoscope/get-horoscope?appName=${NAME_PROJECT}`
  });
};

export const getAllHoroscopes = async () => {
  return await axios({
    url: `${BASE_URL}/horoscope/get-horoscopes?appName=${NAME_PROJECT}`
  });
};

export const setAllHoroscopes = async (payload: ISetAllHoroscopesPayload) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/horoscope/set-horoscope`,
    data: { ...payload, appName: NAME_PROJECT }
  });
};

export const setPayload = async (payload: IGroups) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/payload/set-payload`,
    data: { payload, appName: NAME_PROJECT }
  });
};

export const getPayload = async () => {
  return await axios({
    url: `${BASE_URL}/payload/get-payload?appName=${NAME_PROJECT}`
  });
};
