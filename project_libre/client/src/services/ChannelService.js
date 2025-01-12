import { api } from "./ServiceHelper"

export const getChannel = async (channelId) => {
  return await api.get(`/channel/${channelId}`)
    .then((res) => res)
    .catch((err) => err.response);
}

export const getUserChannels = async (channelsId) => {
  const channels = [];

  for (const chanId of channelsId) {
    const res = await getChannel(chanId);
    if (res.status === 200) {
      channels.push(res.data);
    }
  }

  return channels;
}

export const addMessage = async (message, chanId) => {
  return await api.post(`/channel/${chanId}/send_message`, message)
    .then((res) => res)
    .catch((err) => err.response);
}
