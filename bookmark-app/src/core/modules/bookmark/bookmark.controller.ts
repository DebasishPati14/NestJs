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
import { AllBookmarkResponse, BookmarkRequest, BookmarkResponse, EditBookmarkDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DeleteResponse, ErrorResponse } from 'src/common/types';

@ApiBearerAuth()
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
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AllBookmarkResponse,
  })
  getBookmarks(@GetUser('id') userId: number, @Param() body: BookmarkParams): Promise<AllBookmarkResponse> {
    return this.bookmarkService.getAllBookmarks(userId, body);
  }

  @Get('single-bookmark/:id')
  @ApiResponse({ status: 200, description: 'Success', type: BookmarkResponse })
  @ApiResponse({ status: 422, description: 'Error', type: ErrorResponse })
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
  ): Promise<BookmarkResponse | ErrorResponse> {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Post('create')
  @ApiResponse({ status: 200, description: 'Success', type: BookmarkResponse })
  createBookmarks(@GetUser('id') userId: number, @Body() bookmarkDto: BookmarkRequest): Promise<BookmarkResponse> {
    return this.bookmarkService.createBookmark(userId, bookmarkDto);
  }

  @ApiResponse({ status: 200, description: 'Success', type: BookmarkResponse })
  @ApiResponse({ status: 422, description: 'Error', type: ErrorResponse })
  @Patch('edit-bookmark/:id')
  editBookmark(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: number,
    editDto: EditBookmarkDto,
  ): Promise<BookmarkResponse | { error: string }> {
    return this.bookmarkService.editBookmarkById(userId, bookmarkId, editDto);
  }

  @Delete('delete-bookmark/:id')
  @ApiResponse({ status: 422, description: 'Error', type: ErrorResponse })
  @ApiResponse({ status: 200, description: 'Success', type: DeleteResponse })
  removeBookmark(@GetUser('id') userId: number, @Param('id') bookmarkId: number) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
