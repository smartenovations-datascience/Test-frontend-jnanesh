import axios from "axios";

export default class CustomerPoService {
getCustomerPoOptions = () => {
    return axios.options("http://127.0.0.1:8000/api/poapp/pd/").then((response) => {
      return {
        options: response.data.actions.POST,
        default: response.data.default,
      };
    });
  }
};