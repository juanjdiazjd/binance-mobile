import {create} from 'apisauce';
import apiConfig from './services/config';

const buildApi = (config = apiConfig) => {
  const api = create({
    ...apiConfig,
    ...config,
    headers: {...apiConfig.headers, ...config.headers},
  });
  const {get, delete: del, head, post, put, patch, link, unlink} = api;

  api.get = (...args) => get(...args);
  api.delete = (...args) => del(...args);
  api.head = (...args) => head(...args);
  api.post = (...args) => post(...args);
  api.put = (...args) => put(...args);
  api.patch = (...args) => patch(...args);
  api.link = (...args) => link(...args);
  api.unlink = (...args) => unlink(...args);
  return api;
};

export default buildApi;
