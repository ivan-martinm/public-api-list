import axios from 'axios';
const categoriesUrl = process.env.REACT_APP_BASE_URI + 'categories';

const getAll = () => {
  return axios.get(categoriesUrl);
};

export default { getAll };
