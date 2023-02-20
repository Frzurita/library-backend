import { Test, TestingModule } from '@nestjs/testing';
import {
  BookRepository,
  BOOK_REPOSITORY,
} from '../../../../src/contexts/books/domain/book.repository';
import { BookService } from '../../../../src/contexts/books/application/book.service';
import { BookMother } from '../domain/book.mother';
import { bookRepositoryMock } from '../infrastructure/book.repository.mock';
import { UserIdMother } from '../domain/user.id.mother';

describe('Book Service', () => {
  let bookService: BookService;
  let bookRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: BOOK_REPOSITORY, useFactory: bookRepositoryMock },
      ],
    }).compile();

    bookRepository = app.get<BookRepository>(BOOK_REPOSITORY);
    bookService = app.get<BookService>(BookService);
  });

  describe('create book', () => {
    it('should return "undefined"', async () => {
      const book = BookMother.random();
      expect(await bookService.create(book)).toBe(undefined);
      expect(bookRepository.create).toHaveBeenCalledWith(book);
    });
  });

  describe('update book', () => {
    it('should return "undefined"', async () => {
      const book = BookMother.random();

      expect(await bookService.update(book)).toBe(undefined);
      expect(bookRepository.update).toHaveBeenCalledWith(book);
    });
  });

  describe('get book', () => {
    it('should return a book', async () => {
      const book = BookMother.random();
      bookRepository.get.mockResolvedValue(book);

      expect(
        await bookService.get(book.id, { userId: book.userId.value }),
      ).toBe(book);
      expect(bookRepository.get).toHaveBeenCalledWith(book.id, {
        userId: book.userId.value,
      });
    });
  });

  describe('get all books', () => {
    it('should return an array of books', async () => {
      const userId = UserIdMother.random();
      const books = [BookMother.random(userId), BookMother.random(userId)];
      bookRepository.getAll.mockResolvedValue(books);

      expect(await bookService.getAll({ userId: userId.value })).toBe(books);
      expect(bookRepository.getAll).toHaveBeenCalledWith({
        userId: userId.value,
      });
    });
  });

  describe('delete book', () => {
    it('should return "undefined"', async () => {
      const book = BookMother.random();
      const userId = UserIdMother.random();
      expect(await bookService.delete(book.id, { userId: userId.value })).toBe(
        undefined,
      );
      expect(bookRepository.delete).toHaveBeenCalledWith(book.id, {
        userId: userId.value,
      });
    });
  });
});
