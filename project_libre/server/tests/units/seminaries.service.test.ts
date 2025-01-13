import { createSeminary, getByIdSeminary, getAllSeminaries, deleteSeminary, updateSeminaryById } from '../../src/services/seminaries.service';
import Seminary from '../../src/database/models/Seminary';

jest.mock('../../src/database/models/Seminary', () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('Seminary Service Tests', () => {

  describe('getAllSeminaries', () => {
    it('should return all seminaries', async () => {
      const seminaries = [
        { id: 1, title: 'Seminary 1', description: 'Description 1' },
        { id: 2, title: 'Seminary 2', description: 'Description 2' },
      ];
      Seminary.findAll.mockResolvedValue(seminaries);

      const result = await getAllSeminaries({} as any);
      expect(result).toEqual({ err: false, data: seminaries });
    });
  });

  describe('getByIdSeminary', () => {
    it('should return a seminary by id', async () => {
      const seminary = { id: 1, title: 'Seminary 1', description: 'Description 1' };
      Seminary.findAll.mockResolvedValue([seminary]);

      const result = await getByIdSeminary({ params: { id: '1' } } as any);
      expect(Seminary.findAll).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual({ err: false, data: [seminary] });
    });

    it('should return an empty array if seminary not found', async () => {
      Seminary.findAll.mockResolvedValue([]);

      const result = await getByIdSeminary({ params: { id: '999' } } as any);
      expect(Seminary.findAll).toHaveBeenCalledWith({
        where: { id: '999' },
      });
      expect(result).toEqual({ err: false, data: [] });
    });
  });

  describe('createSeminary', () => {
    it('should create a new seminary', async () => {
      const body = { title: 'New Seminary', description: 'A new seminary' };
      const createdSeminary = { id: 1, ...body };
      Seminary.create.mockResolvedValue(createdSeminary);

      const result = await createSeminary({ body } as any);
      expect(Seminary.create).toHaveBeenCalledWith(body);
      expect(result).toEqual({ err: false, data: createdSeminary });
    });
  });

  describe('deleteSeminary', () => {
    it('should delete a seminary by id', async () => {
      Seminary.destroy.mockResolvedValue(1);

      const result = await deleteSeminary({ params: { id: '1' } } as any);
      expect(Seminary.destroy).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual({ err: false, data: 1 });
    });

    it('should return 0 if no seminary is deleted', async () => {
      Seminary.destroy.mockResolvedValue(0);

      const result = await deleteSeminary({ params: { id: '999' } } as any);
      expect(Seminary.destroy).toHaveBeenCalledWith({
        where: { id: '999' },
      });
      expect(result).toEqual({ err: false, data: 0 });
    });
  });

  describe('updateSeminaryById', () => {
    it('should update a seminary by id', async () => {
      Seminary.update.mockResolvedValue([1]);

      const result = await updateSeminaryById({ params: { id: '1' }, body: { title: 'Updated Seminary' } } as any);
      expect(Seminary.update).toHaveBeenCalledWith(
        { title: 'Updated Seminary' },
        { where: { id: '1' } }
      );
      expect(result).toEqual({ err: false, data: [1] });
    });

    it('should return 0 if no seminary was updated', async () => {
      Seminary.update.mockResolvedValue([0]);

      const result = await updateSeminaryById({ params: { id: '999' }, body: { title: 'Updated Seminary' } } as any);
      expect(Seminary.update).toHaveBeenCalledWith(
        { title: 'Updated Seminary' },
        { where: { id: '999' } }
      );
      expect(result).toEqual({ err: false, data: [0] });
    });
  });

});
