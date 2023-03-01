import axios, { AxiosRequestConfig } from 'axios';

export async function sendRequestWithRetry(
  retryCount = 3,
  retryDelay = 1000,
  config: AxiosRequestConfig
) {
  let currentRetry = 0;
  let response = null;

  while (currentRetry < retryCount) {
    try {
      response = await axios.request({ ...config, timeout: 30000 });
      break;
    } catch (error) {
      if ((error as any).code === 'ECONNABORTED') {
        currentRetry++;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        throw error;
      }
    }
  }

  if (!response) {
    throw new Error(`Failed to fetch ${config.url}`);
  }

  return response;
}
