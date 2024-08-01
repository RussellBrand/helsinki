import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const clearToken = () => {
  token = null;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const put = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const url_including_id = `${baseUrl}/${newObject.id}`;

  const response = await axios.put(url_including_id, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const url_including_id = `${baseUrl}/${id}`;

  const response = await axios.delete(url_including_id, config);
  return response.data;
};

export default { getAll, setToken, clearToken, create, put, remove };
