import { BOOK_REPOSITORY } from '../../contexts/books/domain/book.repository';
import { BookRepositoryTypeOrm } from '../../contexts/books/infrastructure/book.repository.typeorm';

export const BookProviders = [
  {
    provide: BOOK_REPOSITORY,
    useClass: BookRepositoryTypeOrm,
  },
];
