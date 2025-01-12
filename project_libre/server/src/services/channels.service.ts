import { removeUserFromChannel } from '../services/users.service';
import Channels from '../database/models/Channels';
import { getAllUsers } from './users.service';

async function getAllChannels() {
  const channels = await Channels.findAll();
  return channels;
}

async function getByIdChannels(id: any) {
  const channel = await Channels.findOne({
    where: {
      id: id
    }
  });
  return channel;
}

async function deleteChannelById(id: any) {
  let users: any;
  await getAllUsers()
    .then((data) => users = data.data)
    .catch(() => users = null);

  for (const user of users) {
    await removeUserFromChannel(user.id, id)
      .catch((res) => {
        return {
          err: true,
          data: res,
        }
      })
  }
  await Channels.destroy({
    where: {
      id,
    },
  });
  return {
    err: false,
    data: 'Deleted successfully',
  }
}

async function createChannels(body: any) {
  const object = await Channels.create(body);
  return object;
}

async function sendMessageChannel(id: any, body: any) {
  const channel = await Channels.findOne({
    where: {
      id: id
    }
  });

  channel.messages.push({'type': body.type, 'value': body.value, 'authorId': body.authorId, 'authorName' : body.authorName});

  await Channels.update({
    "messages": channel.messages
  }, { where: { id } });

  return {
    err: false,
    data: 'Message sent',
  };
}


export {
  getAllChannels, getByIdChannels,
  createChannels, sendMessageChannel,
  deleteChannelById,
}
