import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Book } from '../../../contexts/books/domain/book.aggregate';
import { BookService } from '../../../contexts/books/application/book.service';
import { BookCreateValidator } from './validators/book.create.validator';
import { BookUpdateValidator } from './validators/book.update.validator';
import { BookId } from '../../../contexts/books/domain/object_values/book.id.value_object';
import { Nullable } from '../../../shared/domain/utility_types/nullable.utility_type';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../shared/decorators/get-user.decorator';
import { User } from '../../../shared/domain/user/user.aggregate';

@ApiTags('Book')
@Controller('/book')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class BookController {
  constructor(private readonly service: BookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() body: BookCreateValidator,
    @GetUser() user: User,
  ): Promise<void> {
    const book = Book.fromPrimitives({ ...body, userId: user.id.value });

    return this.service.create(book);
  }

  @Put()
  @UsePipes(ValidationPipe)
  update(
    @Body() body: BookUpdateValidator,
    @GetUser() user: User,
  ): Promise<void> {
    const book = Book.fromPrimitives({ ...body, userId: user.id.value });

    return this.service.update(book);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  async get(
    @Param('id', ParseUUIDPipe) paramId: string,
    @GetUser() user: User,
  ): Promise<Nullable<Book>> {
    const id = new BookId(paramId);

    const book = await this.service.get(id, { userId: user.id.value });
    return book ? book.toPrimitives() : null;
  }

  @Get()
  async getAll(@GetUser() user: User): Promise<Book[]> {
    const books = await this.service.getAll({ userId: user.id.value });

    return books.map((book) => book.toPrimitives());
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  delete(
    @Param('id', ParseUUIDPipe) paramId: string,
    @GetUser() user: User,
  ): Promise<void> {
    const id = new BookId(paramId);

    return this.service.delete(id, { userId: user.id.value });
  }
}
