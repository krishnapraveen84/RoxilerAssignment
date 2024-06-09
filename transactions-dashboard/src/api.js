import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000';

export const getTransactions = (search = '', page = 1, perPage = 10) => {
  return axios.get(`${API_BASE_URL}/transactions`, {
    params: {search, page, perPage },
  });
};

export const getStatistics = (month) => {
  return axios.get(`${API_BASE_URL}/statistics`, { params: { month } })
};

export const getBarChartData = (month) => {
  return axios.get(`${API_BASE_URL}/bar-chart?month=${month}`);
};

export const getPieChartData = (month) => {
  return axios.get(`${API_BASE_URL}/pie-chart`, { params: { month } })
};

export const getCombinedData = (month) => {
  return axios.get(`${API_BASE_URL}/combined`, { params: { month } });
};
