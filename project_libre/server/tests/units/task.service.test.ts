import { createTask, getByIdTask, getAllTask, deleteTask, updateTaskById } from '../../src/services/task.service';
import Task from '../../src/database/models/Task';

jest.mock('../../src/database/models/Task', () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('Task Service Tests', () => {

  describe('getAllTask', () => {
    it('should return all tasks', async () => {
      const tasks = [
        { id: 1, title: 'Task 1', description: 'Description 1' },
        { id: 2, title: 'Task 2', description: 'Description 2' },
      ];
      Task.findAll.mockResolvedValue(tasks);

      const result = await getAllTask({} as any); // Simuler une requête
      expect(result).toEqual({ err: false, data: tasks });
    });
  });

  describe('getByIdTask', () => {
    it('should return a task by id', async () => {
      const task = { id: 1, title: 'Task 1', description: 'Description 1' };
      Task.findAll.mockResolvedValue([task]);

      const result = await getByIdTask({ params: { id: '1' } } as any);
      expect(Task.findAll).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual({ err: false, data: [task] });
    });

    it('should return an empty array if task not found', async () => {
      Task.findAll.mockResolvedValue([]);

      const result = await getByIdTask({ params: { id: '999' } } as any);
      expect(Task.findAll).toHaveBeenCalledWith({
        where: { id: '999' },
      });
      expect(result).toEqual({ err: false, data: [] });
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const body = { title: 'New Task', description: 'A new task' };
      const createdTask = { id: 1, ...body };
      Task.create.mockResolvedValue(createdTask);

      const result = await createTask({ body } as any);
      expect(Task.create).toHaveBeenCalledWith(body);
      expect(result).toEqual({ err: false, data: createdTask });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by id', async () => {
      Task.destroy.mockResolvedValue(1);

      const result = await deleteTask({ params: { id: '1' } } as any);
      expect(Task.destroy).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual({ err: false, data: 1 });
    });

    it('should return 0 if no task is deleted', async () => {
      Task.destroy.mockResolvedValue(0);

      const result = await deleteTask({ params: { id: '999' } } as any);
      expect(Task.destroy).toHaveBeenCalledWith({
        where: { id: '999' },
      });
      expect(result).toEqual({ err: false, data: 0 });
    });
  });

  describe('updateTaskById', () => {
    it('should update a task by id', async () => {
      Task.update.mockResolvedValue([1]); // Sequelize retourne un tableau avec le nombre de lignes mises à jour

      const result = await updateTaskById({ params: { id: '1' }, body: { title: 'Updated Task' } } as any);
      expect(Task.update).toHaveBeenCalledWith(
        { title: 'Updated Task' },
        { where: { id: '1' } }
      );
      expect(result).toEqual({ err: false, data: [1] });
    });

    it('should return 0 if no task was updated', async () => {
      Task.update.mockResolvedValue([0]);

      const result = await updateTaskById({ params: { id: '999' }, body: { title: 'Updated Task' } } as any);
      expect(Task.update).toHaveBeenCalledWith(
        { title: 'Updated Task' },
        { where: { id: '999' } }
      );
      expect(result).toEqual({ err: false, data: [0] });
    });
  });

});
