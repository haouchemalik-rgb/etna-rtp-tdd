import { api } from './ServiceHelper';

export const getAllseminary = async () => {
    return await api.get('/seminary')
      .then((res) => res)
      .catch((err) => err.response);
}

export const addSeminary = async (seminary) => {
  return await api.post(`/seminary/`,seminary)
    .then((res) => res)
    .catch((err) => err.response)
} 

export const updatedSeminary = async (seminaryId, changes) => {
  return await api.patch(`/seminary/${seminaryId}`,changes)
    .then((res) => res)
    .catch((err) => err.response)
}

export const deleteSeminary= async (seminaryId) => {
  return await api.delete(`/seminary/${seminaryId}`)
    .then((res) => res)
    .catch((err) => err.response)
}
