import { removeUserFromChannel } from '../../src/services/users.service';
import Channels from '../../src/database/models/Channels';
import { getAllUsers } from '../../src/services/users.service';
import { getAllChannels, getByIdChannels, createChannels, sendMessageChannel, deleteChannelById } from '../../src/services/channels.service';

jest.mock('../../src/services/users.service', () => ({
    getAllUsers: jest.fn(),
    removeUserFromChannel: jest.fn(),
  }));
  
  jest.mock('../../src/database/models/Channels', () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }));
  
  describe('Channel Service Tests', () => {
  
    describe('getAllChannels', () => {
      it('should return all channels', async () => {
        Channels.findAll.mockResolvedValue([{ id: 1, name: 'Channel 1' }, { id: 2, name: 'Channel 2' }]);
        const result = await getAllChannels();
        expect(result).toEqual([{ id: 1, name: 'Channel 1' }, { id: 2, name: 'Channel 2' }]);
      });
    });
  
    describe('getByIdChannels', () => {
      it('should return a channel by id', async () => {
        Channels.findOne.mockResolvedValue({ id: 1, name: 'Channel 1' });
        const result = await getByIdChannels(1);
        expect(result).toEqual({ id: 1, name: 'Channel 1' });
      });
  
      it('should return null if channel not found', async () => {
        Channels.findOne.mockResolvedValue(null);
        const result = await getByIdChannels(999);
        expect(result).toBeNull();
      });
    });
  
    describe('createChannels', () => {
      it('should create a new channel', async () => {
        const body = { name: 'New Channel' };
        Channels.create.mockResolvedValue({ id: 1, ...body });
        const result = await createChannels(body);
        expect(result).toEqual({ id: 1, name: 'New Channel' });
      });
    });
  
    describe('sendMessageChannel', () => {
      it('should send a message to a channel', async () => {
        const body = { type: 'text', value: 'Hello', authorId: 1, authorName: 'User 1' };
        const channel = { id: 1, messages: [] };
        Channels.findOne.mockResolvedValue(channel);
        Channels.update.mockResolvedValue([1]);
        const result = await sendMessageChannel(1, body);
        expect(result).toEqual({ err: false, data: 'Message sent' });
        expect(channel.messages.length).toBe(1);
      });
    });
  
    describe('deleteChannelById', () => {
      it('should delete a channel and remove users from it', async () => {
        const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
        (getAllUsers as jest.Mock).mockResolvedValue({ data: users });
        (removeUserFromChannel as jest.Mock).mockResolvedValue(true);
        Channels.destroy.mockResolvedValue(1);
  
        const result = await deleteChannelById(1);
  
        expect(result).toEqual({ err: false, data: 'Deleted successfully' });
        expect(removeUserFromChannel).toHaveBeenCalledTimes(2);
        expect(Channels.destroy).toHaveBeenCalledWith({
          where: { id: 1 },
        });
      });
    });
  
  });