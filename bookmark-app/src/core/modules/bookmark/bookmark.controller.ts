import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService, BookmarkParams } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { BookmarkDto, EditBookmarkDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (err, file, cb) => {
          const fileName = Date.now() + '-' + file.originalname;
          console.log('saved');

          cb(null, fileName);
        },
      }),
    }),
  )
  @Bind(UploadedFile())
  uploadFile(file: Express.Multer.File) {
    console.log(file);
  }

  @Get('all-bookmarks')
  getBookmarks(@GetUser('id') userId: number, @Param() body: BookmarkParams) {
    console.table(body);

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
