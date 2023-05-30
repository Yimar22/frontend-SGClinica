import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/";
const API_PATIENT = "patient";

const registerPatient = (
  id,
  personalInformation,
  diseaseHistorial,
  nationalityState
) => {
  return axios.post(
    API_URL + API_PATIENT,
    {
      id,
      personalInformation,
      diseaseHistorial,
      nationalityState,
    },
    { headers: authHeader() }
  );
};

const getAllPatients = () => {
  return axios
    .get(API_URL + API_PATIENT, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getPatientById = async (id) => {
  const response = await axios.get(`${API_URL}${API_PATIENT}/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

const patientService = {
  registerPatient,
  getAllPatients,
  getPatientById,
};
export default patientService;
