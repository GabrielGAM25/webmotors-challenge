import axios from 'axios';
import axiosRetry from 'axios-retry';

import config from 'shared/utils/config';

const defaultOptions = {
  baseURL: `${config.api.baseUrl}/api/OnlineChallenge`,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
};

const client = axios.create(defaultOptions);

axiosRetry(client, { retries: 3 });

export default client;
