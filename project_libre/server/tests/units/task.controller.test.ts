import { Request, Response } from 'express';
import {
  newTask,
  getTaskById,
  getTask,
  deletedTask,
  updateTask,
} from '../../src/controllers/task.controller';
import {
  createTask,
  getByIdTask,
  getAllTask,
  deleteTask,
  updateTaskById,
} from '../../src/services/task.service';

// Mock des services
jest.mock('../../src/services/task.service', () => ({
  createTask: jest.fn(),
  getByIdTask: jest.fn(),
  getAllTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTaskById: jest.fn(),
}));

describe('Task Controller Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('newTask', () => {
    it('should create a new task and return status 200 with the created task', async () => {
      const createdTask = { id: 1, name: 'New Task' };
      (createTask as jest.Mock).mockResolvedValue(createdTask);

      mockRequest.body = { name: 'New Task' };

      await newTask(mockRequest as Request, mockResponse as Response);

      expect(createTask).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(createdTask);
    });

    it('should return status 500 on error', async () => {
      const error = new Error('Database error');
      (createTask as jest.Mock).mockRejectedValue(error);

      await newTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 'Erreur de requete': error });
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id with status 200', async () => {
      const task = { id: 1, name: 'Task 1' };
      (getByIdTask as jest.Mock).mockResolvedValue(task);

      mockRequest.params = { id: '1' };

      await getTaskById(mockRequest as Request, mockResponse as Response);

      expect(getByIdTask).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(task);
    });

    it('should return status 500 on error', async () => {
      const error = new Error('Database error');
      (getByIdTask as jest.Mock).mockRejectedValue(error);

      await getTaskById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 'erreur de requete': error });
    });
  });

  describe('getTask', () => {
    it('should return all tasks with status 200', async () => {
      const tasks = [
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' },
      ];
      (getAllTask as jest.Mock).mockResolvedValue(tasks);

      await getTask(mockRequest as Request, mockResponse as Response);

      expect(getAllTask).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });

    it('should return status 500 on error', async () => {
      const error = new Error('Database error');
      (getAllTask as jest.Mock).mockRejectedValue(error);

      await getTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 'erreur de requete': error });
    });
  });

  describe('deletedTask', () => {
    it('should delete a task and return status 200', async () => {
      const message = { success: true };
      (deleteTask as jest.Mock).mockResolvedValue(message);

      mockRequest.params = { id: '1' };

      await deletedTask(mockRequest as Request, mockResponse as Response);

      expect(deleteTask).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(message);
    });

    it('should return status 500 on error', async () => {
      const error = new Error('Database error');
      (deleteTask as jest.Mock).mockRejectedValue(error);

      await deletedTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 'erreur de requete': error });
    });
  });

  describe('updateTask', () => {
    it('should update a task and return status 200', async () => {
      const updatedTask = { id: 1, name: 'Updated Task' };
      (updateTaskById as jest.Mock).mockResolvedValue(updatedTask);

      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'Updated Task' };

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(updateTaskById).toHaveBeenCalledWith(mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedTask);
    });

    it('should return status 500 on error', async () => {
      const error = new Error('Database error');
      (updateTaskById as jest.Mock).mockRejectedValue(error);

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 'erreur de requete': error });
    });
  });
});
