import {
    getByIdUsers, getAllUsers,
    registerUser, deleteUser,
    updateUser, loginUser,
    checkPassUser, addUserToChannel, removeUserFromChannel
  } from '../../src/services/users.service';
  import Users from '../../src/database/models/Users';
  import Channels from '../../src/database/models/Channels';
  
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  
  // Mock des modèles Sequelize
  jest.mock('../../src/database/models/Users', () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }));
  jest.mock('../../src/database/models/Channels', () => ({
    findOne: jest.fn(),
  }));
  
  // Mock des bibliothèques externes
  jest.mock('bcrypt', () => ({
    compareSync: jest.fn(),
    hash: jest.fn(),
  }));
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));
  
  describe('Users Service Tests', () => {
  
    describe('getAllUsers', () => {
      it('should return all users', async () => {
        const users = [
          { id: 1, userName: 'User1', email: 'user1@example.com' },
          { id: 2, userName: 'User2', email: 'user2@example.com' },
        ];
        Users.findAll.mockResolvedValue(users);
  
        const result = await getAllUsers();
        expect(result).toEqual({ err: false, data: users });
      });
    });
  
    describe('getByIdUsers', () => {
      it('should return a user by id', async () => {
        const user = { id: 1, userName: 'User1', email: 'user1@example.com' };
        Users.findAll.mockResolvedValue([user]);
  
        const result = await getByIdUsers({ params: { id: '1' } } as any);
        expect(Users.findAll).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(result).toEqual({ err: false, data: [user] });
      });
  
      it('should return an empty array if user not found', async () => {
        Users.findAll.mockResolvedValue([]);
  
        const result = await getByIdUsers({ params: { id: '999' } } as any);
        expect(result).toEqual({ err: false, data: [] });
      });
    });
  
    describe('registerUser', () => {
      it('should create a new user if username and email are unique', async () => {
        Users.findOne.mockResolvedValueOnce(null); // For username
        Users.findOne.mockResolvedValueOnce(null); // For email
        bcrypt.hash.mockResolvedValue('hashedPassword');
        Users.create.mockResolvedValue({ id: 1 });
  
        const req = { body: { userName: 'NewUser', email: 'new@example.com', password: 'password' } };
        const result = await registerUser(req as any);
  
        expect(result).toEqual({ err: false, data: 'User created succesfully' });
      });
  
      it('should return an error if username already exists', async () => {
        Users.findOne.mockResolvedValueOnce({ id: 1 });
  
        const req = { body: { userName: 'ExistingUser', email: 'new@example.com', password: 'password' } };
        const result = await registerUser(req as any);
  
        expect(result).toEqual({ err: true, data: 'This userName already exists' });
      });
  
      it('should return an error if email already exists', async () => {
        Users.findOne.mockResolvedValueOnce(null); // For username
        Users.findOne.mockResolvedValueOnce({ id: 1 }); // For email
  
        const req = { body: { userName: 'NewUser', email: 'existing@example.com', password: 'password' } };
        const result = await registerUser(req as any);
  
        expect(result).toEqual({ err: true, data: 'This email is already linked to an account' });
      });
    });
  
    describe('loginUser', () => {
      it('should return a token for valid credentials', async () => {
        const user = { id: 1, userName: 'User1', password: 'hashedPassword' };
        Users.findOne.mockResolvedValueOnce(user);
        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue('token');
  
        const req = { body: { identifier: 'User1', password: 'password' } };
        const result = await loginUser(req as any);
  
        expect(result).toEqual({ err: false, data: 'token' });
      });
  
      it('should return an error for invalid credentials', async () => {
        Users.findOne.mockResolvedValueOnce(null);
  
        const req = { body: { identifier: 'NonExistentUser', password: 'password' } };
        const result = await loginUser(req as any);
  
        expect(result).toEqual({ err: true, data: 'This account doesn\'t exist' });
      });
    });
  
    describe('deleteUser', () => {
      it('should delete a user', async () => {
        Users.destroy.mockResolvedValue(1);
  
        const req = { params: { id: '1' } };
        const result = await deleteUser(req as any);
  
        expect(Users.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(result).toEqual({ err: false, data: 'Resource deleted successfully' });
      });
    });
  
    describe('updateUser', () => {
      it('should update a user if username and email are unique', async () => {
        Users.findOne.mockResolvedValueOnce(null); // No username conflict
        Users.findOne.mockResolvedValueOnce(null); // No email conflict
        bcrypt.hash.mockResolvedValue('newHashedPassword');
        Users.update.mockResolvedValue([1]);
  
        const req = {
          params: { id: '1' },
          body: { userName: 'UpdatedUser', email: 'updated@example.com', password: 'newPassword' },
        };
        const result = await updateUser(req as any);
  
        expect(result).toEqual({ err: false, data: 'Resource updated' });
      });
  
      it('should return an error if username already exists', async () => {
        Users.findOne.mockResolvedValueOnce({ id: 2 }); // Username conflict
  
        const req = {
          params: { id: '1' },
          body: { userName: 'ExistingUser', email: 'updated@example.com' },
        };
        const result = await updateUser(req as any);
  
        expect(result).toEqual({ err: true, data: 'This userName is already used' });
      });
    });
  
    describe('addUserToChannel', () => {
      it('should add a user to a channel if not already added', async () => {
        const user = { id: 1, channels: [] };
        const channel = { id: 1 };
  
        Users.findOne.mockResolvedValueOnce(user);
        Channels.findOne.mockResolvedValueOnce(channel);
        Users.update.mockResolvedValue([1]);
  
        const result = await addUserToChannel(1, 1);
        expect(result).toEqual(user);
      });
  
      it('should return an error if user is already in the channel', async () => {
        const user = { id: 1, channels: [1] };
  
        Users.findOne.mockResolvedValueOnce(user);
  
        const result = await addUserToChannel(1, 1);
        expect(result).toEqual({ err: true, data: 'already add to this channel' });
      });
    });
  
    describe('removeUserFromChannel', () => {
      it('should remove a user from a channel', async () => {
        const user = { id: 1, channels: [1, 2] };
        Users.findOne.mockResolvedValueOnce(user);
        Users.update.mockResolvedValue([1]);
  
        const result = await removeUserFromChannel(1, 1);
        expect(result).toEqual({ err: false, data: 'Channel removed' });
      });
    });
  
  });
  