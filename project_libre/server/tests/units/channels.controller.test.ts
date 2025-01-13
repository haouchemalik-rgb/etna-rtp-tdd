import { Request, Response } from 'express';
import {
  getAll,
  getById,
  create,
  sendMessage,
  deleteChannel,
} from '../../src/controllers/channels.controller';
import {
  getAllChannels,
  getByIdChannels,
  createChannels,
  sendMessageChannel,
  deleteChannelById,
} from '../../src/services/channels.service';

// Mock des services
jest.mock('../../src/services/channels.service', () => ({
  getAllChannels: jest.fn(),
  getByIdChannels: jest.fn(),
  createChannels: jest.fn(),
  sendMessageChannel: jest.fn(),
  deleteChannelById: jest.fn(),
}));

describe('Channels Controller Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe('getAll', () => {
    it('should return all channels with status 200', async () => {
      const channels = [
        { id: 1, name: 'Channel 1' },
        { id: 2, name: 'Channel 2' },
      ];
      (getAllChannels as jest.Mock).mockResolvedValue(channels);

      await getAll(mockRequest as Request, mockResponse as Response);

      expect(getAllChannels).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(channels);
    });
  });

  describe('getById', () => {
    it('should return a channel by id with status 200', async () => {
      const channel = { id: 1, name: 'Channel 1' };
      (getByIdChannels as jest.Mock).mockResolvedValue(channel);

      mockRequest.params = { id: '1' };

      await getById(mockRequest as Request, mockResponse as Response);

      expect(getByIdChannels).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(channel);
    });

    it('should return status 404 if channel is not found', async () => {
      (getByIdChannels as jest.Mock).mockResolvedValue(null);

      mockRequest.params = { id: '1' };

      await getById(mockRequest as Request, mockResponse as Response);

      expect(getByIdChannels).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a channel and return status 200', async () => {
      const createdChannel = { id: 1, name: 'New Channel' };
      (createChannels as jest.Mock).mockResolvedValue(createdChannel);

      mockRequest.body = { name: 'New Channel' };

      await create(mockRequest as Request, mockResponse as Response);

      expect(createChannels).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(createdChannel);
    });

    it('should return status 500 if required attributes are missing', async () => {
      mockRequest.body = {}; // Missing required attributes

      await create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe('sendMessage', () => {
    it('should send a message to a channel and return status 200', async () => {
      const messageResponse = { data: 'Message sent successfully' };
      (sendMessageChannel as jest.Mock).mockResolvedValue(messageResponse);

      mockRequest.params = { id: '1' };
      mockRequest.body = { type: 'text', value: 'Hello!' };

      await sendMessage(mockRequest as Request, mockResponse as Response);

      expect(sendMessageChannel).toHaveBeenCalledWith('1', mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: messageResponse.data });
    });

    it('should return status 500 if type or value is missing', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = {}; // Missing type and value

      await sendMessage(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Message not sended' });
    });
  });

  describe('deleteChannel', () => {
    it('should delete a channel and return status 200', async () => {
      const deleteResponse = { err: false, data: 'Channel deleted successfully' };
      (deleteChannelById as jest.Mock).mockResolvedValue(deleteResponse);

      mockRequest.params = { id: '1' };

      await deleteChannel(mockRequest as Request, mockResponse as Response);

      expect(deleteChannelById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: deleteResponse.data });
    });

    it('should return status 500 on error', async () => {
      const error = new Error('Delete failed');
      (deleteChannelById as jest.Mock).mockRejectedValue(error);

      mockRequest.params = { id: '1' };

      await deleteChannel(mockRequest as Request, mockResponse as Response);

      expect(deleteChannelById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Request Error' });
    });
  });
});
