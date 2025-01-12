import { api } from './ServiceHelper';

export const getAllUsers = async () => {
  return await api.get('/user/')
    .then((res) => res)
    .catch((err) => err.response);
}

export const loginUser = async (identifiant) => {
  return await api.post('/user/login', identifiant)
    .then((res) => res)
    .catch((err) => err.response);
}

export const getJtwData = async () => {
  return await api.get('/user/jwtData')
  .then((res) => res)
  .catch((err) => err.response);
}

export const getUser = async () => {
  const res = await getJtwData();
  if (res.status === 200) {
    return await api.get(`/user/${res.data.id}`)
      .then((res) => res)
      .catch((err) => err.response);
  } else {
    return res.response;
  }
}

export const logout = async () => {
  return await api.get('/user/logout/')
    .then((res) => res)
    .catch((err) => err.response);
}

export const deleteUser = async (userId) => {
  return await api.delete(`/user/${userId}`)
    .then((res) => res)
    .catch((err) => err.response);
}

export const addUser = async (user) => {
  return await api.post(`/user/register`, user)
    .then((res) => res)
    .catch((err) => err.response);
}

export const editUser = async (user) => {
  const userId = user.id;
  return await api.patch(`/user/${userId}`, user)
    .then((res) => res)
    .catch((err) => err.response);
}
