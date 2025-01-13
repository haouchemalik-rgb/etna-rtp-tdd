import { Request, Response } from 'express';
import {
  getById,
  getAll,
  register,
  deleteById,
  updateById,
  login,
  logout,
  checkPass,
  jwtData,
  addToChannel,
  removeFromChannel,
} from '../../src/controllers/users.controller';

import {
  getByIdUsers,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  checkPassUser,
  addUserToChannel,
  removeUserFromChannel,
} from '../../src/services/users.service';

const jwt = require('jsonwebtoken');

// Mock des services
jest.mock('../../src/services/users.service', () => ({
  getByIdUsers: jest.fn(),
  getAllUsers: jest.fn(),
  registerUser: jest.fn(),
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
  loginUser: jest.fn(),
  checkPassUser: jest.fn(),
  addUserToChannel: jest.fn(),
  removeUserFromChannel: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

describe('User Controller Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
  });

  describe('getById', () => {
    it('should return user data by ID with status 200', async () => {
      const user = { id: 1, name: 'John Doe' };
      (getByIdUsers as jest.Mock).mockResolvedValue({ data: user });

      await getById(mockRequest as Request, mockResponse as Response);

      expect(getByIdUsers).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    it('should return status 500 if retrieval fails', async () => {
      const error = new Error('Retrieval error');
      (getByIdUsers as jest.Mock).mockRejectedValue(error);

      await getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
  });

  describe('getAll', () => {
    it('should return all users with status 200', async () => {
      const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      (getAllUsers as jest.Mock).mockResolvedValue({ data: users });

      await getAll(mockRequest as Request, mockResponse as Response);

      expect(getAllUsers).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(users);
    });

    it('should return status 500 if retrieval fails', async () => {
      const error = new Error('Error retrieving users');
      (getAllUsers as jest.Mock).mockRejectedValue(error);

      await getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
  });

  describe('register', () => {
    it('should register a new user and return status 201', async () => {
      const user = { id: 1, name: 'John' };
      (registerUser as jest.Mock).mockResolvedValue({ err: false, data: user });

      await register(mockRequest as Request, mockResponse as Response);

      expect(registerUser).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: user });
    });

    it('should return status 400 if registration fails', async () => {
      const error = { err: true, data: 'User already exists' };
      (registerUser as jest.Mock).mockResolvedValue(error);

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: error.data });
    });

    it('should return status 500 if registration throws an error', async () => {
      const error = new Error('Registration error');
      (registerUser as jest.Mock).mockRejectedValue(error);

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
  });

  describe('login', () => {
    it('should log in a user and return a cookie with status 200', async () => {
      const token = 'jwt_token';
      (loginUser as jest.Mock).mockResolvedValue({ err: false, data: token });

      await login(mockRequest as Request, mockResponse as Response);

      expect(loginUser).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.cookie).toHaveBeenCalledWith('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 3600 * 24,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Logged in successfully',
      });
    });

    it('should return status 403 if login fails', async () => {
      const error = { err: true, data: 'Invalid credentials' };
      (loginUser as jest.Mock).mockResolvedValue(error);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: error.data });
    });

    it('should return status 500 if login throws an error', async () => {
      const error = new Error('Login error');
      (loginUser as jest.Mock).mockRejectedValue(error);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Request error' });
    });
  });

  describe('logout', () => {
    it('should clear the access_token cookie and return status 200', () => {
      logout(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('access_token');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Logged out successfully',
      });
    });
  });

  describe('jwtData', () => {
    it('should decode the JWT and return the user ID', () => {
      const token = 'jwt_token';
      const decodedToken = { id: 1 };
      (jwt.decode as jest.Mock).mockReturnValue(decodedToken);

      mockRequest.cookies = { access_token: token };

      jwtData(mockRequest as Request, mockResponse as Response);

      expect(jwt.decode).toHaveBeenCalledWith(token);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ id: decodedToken.id });
    });
  });

  describe('addToChannel', () => {
    it('should add a user to a channel and return status 200', async () => {
      const user = { id: 1, channelId: 2 };
      (addUserToChannel as jest.Mock).mockResolvedValue(user);

      mockRequest.params = { id: '1', channelId: '2' };

      await addToChannel(mockRequest as Request, mockResponse as Response);

      expect(addUserToChannel).toHaveBeenCalledWith('1', '2');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });
  });

  describe('removeFromChannel', () => {
    it('should remove a user from a channel and return status 200', async () => {
      const response = { id: 1, message: 'Removed successfully' };
      (removeUserFromChannel as jest.Mock).mockResolvedValue({ err: false, data: response });

      mockRequest.params = { id: '1', channelId: '2' };

      await removeFromChannel(mockRequest as Request, mockResponse as Response);

      expect(removeUserFromChannel).toHaveBeenCalledWith('1', '2');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: response.message });
    });
  });
});
