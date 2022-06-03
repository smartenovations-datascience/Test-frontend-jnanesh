import axios from "../../axiosInstance";

export default class CustomerPoService {
  getCustomerPoList = (params) => {
    return axios.get(`${params}`).then((res) => res.data);
  };

  getCustomerPoOptions = () => {
    return axios.options('http://localhost:8000/api/poapp/pd/').then((response) => {
      return {
        options: response.data.actions.POST,
        default: response.data.default,
      };
    });
  };

  addCustomerPo = (data) => {
    return axios.post('http://localhost:8000/api/poapp/pd/', data).then((res) => res.data);
  };

  updateCustomerPo = (id, data) => {
    return axios
      .put(`http://localhost:8000/api/poapp/pd/ ${id}/`, data)
      .then((res) => res.data);
  };

  getCustomerPoDetail = (id) => {
    return axios.get(`http://localhost:8000/api/poapp/pd/ ${id}`).then((res) => res.data);
  };
}