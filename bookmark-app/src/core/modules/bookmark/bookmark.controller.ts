import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService, BookmarkBody } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { BookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get('all-bookmarks')
  getBookmarks(@GetUser('id') userId: number, @Body() body: BookmarkBody) {
    return this.bookmarkService.getAllBookmarks(userId, body);
  }

  @Get('single-bookmark/:id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Post('create')
  createBookmarks(
    @GetUser('id') userId: number,
    @Body() bookmarkDto: BookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, bookmarkDto);
  }

  @Patch('edit-bookmark/:id')
  editBookmark(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
    editDto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(userId, bookmarkId, editDto);
  }

  @Delete('delete-bookmark/:id')
  removeBookmark(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
