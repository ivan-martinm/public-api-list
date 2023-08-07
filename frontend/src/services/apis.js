import axios from 'axios';
const apiUrl = process.env.REACT_APP_BASE_URI;

const getAll = (filter, skip) => {
  const params = {
    auth: filter.auth,
    https: filter.https,
    cors: filter.cors,
    category: filter.category,
    text: filter.text,
    limit: filter.limit,
    skip
  };
  return axios.get(apiUrl, { params: params });
};

export default { getAll };
