import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let beforeCreateLength: number;
  let afterCreateLength: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    beforeCreateLength = service.getAll().length;

    service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });

    afterCreateLength = service.getAll().length;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      const id = 999;

      try {
        service.getOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: ${id} not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.deleteOne(1);
      const afterDeleteLength = service.getAll().length;

      expect(afterDeleteLength).toBeLessThan(afterCreateLength);
    });

    it('should throw a NotFoundException', () => {
      const id = 1;

      try {
        service.getOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: ${id} not found.`);
      }
    });
  });

  describe('create', () => {
    it('create a movie', () => {
      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const updatedTitle = 'Updated Test';
      service.update(1, { title: updatedTitle });
      const movie = service.getOne(1);
      expect(movie.title).toEqual(updatedTitle);
    });

    it('should throw a NotFoundException', () => {
      const id = 999;

      try {
        service.update(id, { title: 'Updated Test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: ${id} not found.`);
      }
    });
  });
});
