import { create, TIMEOUT_ERROR } from 'apisauce';


import apiConfig from './services/config';



const requestTimeout = (promise:any, axiosConfig:any, reqConfig:any) => {
  const { timeout } = apiConfig;
  const config = { ...axiosConfig, ...(reqConfig || {}) };
  const duration = (parseInt(config.timeout, 10) || timeout) + 1e3;
  const result = {
    ok: false,
    problem: TIMEOUT_ERROR,
    originalError: 'Request Timeout Error',
    data: null,
    status: null,
    headers: null,
    config,
    duration
  };
  const timeoutPromise = new Promise(resolve =>
    setTimeout(resolve, duration, result)
  );

  return Promise.race([timeoutPromise, promise]);
};

const buildApi = (config = apiConfig) => {
  const api = create({
    ...apiConfig,
    ...config,
    headers: { ...apiConfig.headers, ...config.headers },
    //httpsAgent:{ ...apiConfig.httpsAgent }
    
    
  });
  const {
    axiosInstance: { defaults },
    get,
    delete: del,
    head,
    post,
    put,
    patch,
    link,
    unlink
  } = api;

  api.addAsyncRequestTransform(request => async () => {
    {
   
    }
  });
  
  api.get = (...args) => get(...args);
  api.delete = (...args) => requestTimeout(del(...args), defaults, args[2]);
  api.head = (...args) => requestTimeout(head(...args), defaults, args[2]);
  api.post = (...args) => post(...args);
  api.put = (...args) => requestTimeout(put(...args), defaults, args[2]);
  api.patch = (...args) => requestTimeout(patch(...args), defaults, args[2]);
  api.link = (...args) => requestTimeout(link(...args), defaults, args[2]);
  api.unlink = (...args) => requestTimeout(unlink(...args), defaults, args[2]);
  return api;
};

export default buildApi;
