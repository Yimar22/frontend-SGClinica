import axios from "axios";
const API_URL = "http://localhost:8080/";
const FEATURE_URL = "feature";

const getAllFeatures = () => {
  return axios.get(`${API_URL}${FEATURE_URL}`).then((response) => {
    return response.data;
  });
};

const featureService = { getAllFeatures };
export default featureService;
