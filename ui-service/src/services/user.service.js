import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/";
const API_USER = "user";
const API_PERSONAL_INFORMATION = "personalinformation";
const API_ROLE = "role";
const API_AUTH = "auth";
const API_PASSWORD = "password";
const API_STATUS = "status";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAllUsers = () => {
  return axios
    .get(API_URL + API_USER, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAllRoles = () => {
  return axios
    .get(API_URL + API_ROLE, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const register = (username, password, rolesIds) => {
  return axios.post(
    API_URL + API_USER,
    { username, password, rolesIds },
    { headers: authHeader() }
  );
};
const registerPersonalInformation = (
  id,
  firstName,
  lastName,
  email,
  birthDate,
  genderId,
  civilStatusId,
  phoneNumber,
  address
) => {
  return axios.post(
    API_URL + API_PERSONAL_INFORMATION,
    {
      id,
      firstName,
      lastName,
      email,
      birthDate,
      genderId,
      civilStatusId,
      phoneNumber,
      address,
    },
    { headers: authHeader() }
  );
};

const getUserByUsername = (username) => {
  return axios
    .get(`${API_URL}${API_USER}/${username}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addRoleToAUser = (roleName, username) => {
  return axios
    .post(
      `${API_URL}${API_ROLE}/${roleName}/${API_USER}/${username}`,
      {},
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
const deleteRoleToAUser = (roleName, username) => {
  return axios
    .delete(`${API_URL}${API_ROLE}/${roleName}/${API_USER}/${username}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
const changePassword = (username, password) => {
  return axios
    .put(
      `${API_URL}public/${API_AUTH}/${API_PASSWORD}`,
      { username, password },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};
const deleteUserByUsername = async (username) => {
  const response = await axios.delete(`${API_URL}${API_USER}/${username}`, {
    headers: authHeader(),
  });
  return response.data;
};

const editUserStatus = (username, isEnabled) => {
  return axios
    .put(
      `${API_URL}${API_USER}/${username}/${API_STATUS}`,
      { isEnabled },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

// const getUserPersonalInformation = async (username) => {
//   const response = await axios.get(
//     `${API_URL}${API_PERSONAL_INFORMATION}/${username}`,
//     {
//       headers: authHeader(),
//     }
//   );
//   return response.data;
// };

const getUserPersonalInformation = (username) => {
  return axios
    .get(`${API_URL}${API_PERSONAL_INFORMATION}/${username}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const updateUserPersonalInformation = async (
  id,
  firstName,
  lastName,
  email,
  birthDate,
  genderId,
  civilStatusId,
  phoneNumber,
  address
) => {
  const response = await axios.put(
    `${API_URL}${API_PERSONAL_INFORMATION}/${id}`,
    {
      id,
      firstName,
      lastName,
      email,
      birthDate,
      genderId,
      civilStatusId,
      phoneNumber,
      address,
    },
    { headers: authHeader() }
  );
  return response.data;
};
const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  register,
  getAllUsers,
  getAllRoles,
  getUserByUsername,
  addRoleToAUser,
  deleteRoleToAUser,
  changePassword,
  editUserStatus,
  deleteUserByUsername,
  registerPersonalInformation,
  getUserPersonalInformation,
  updateUserPersonalInformation,
};
export default userService;
