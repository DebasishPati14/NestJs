import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarkDto, EditBookmarkDto } from './dto';

export interface BookmarkBody {
  orderBy: 'asc' | 'desc';
  pageOffset: PageOffset;
  searchText: string;
}
interface PageOffset {
  pageNumber: number;
  pageSize: number;
}
@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  async getAllBookmarks(userId: number, body: BookmarkBody) {
    const count = await this.prismaService.bookmark.count({
      where: {
        userId,
      },
    });

    return { records: await this.findAndGetBookmarks(userId, body), count };
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmarkDetail = await this.prismaService.bookmark.findUnique({
      where: {
        userId,
        id: +bookmarkId,
      },
    });

    return bookmarkDetail
      ? bookmarkDetail
      : { error: 'No Bookmark found with given Id' };
  }

  async createBookmark(userId: number, bookmarkDto: BookmarkDto) {
    return await this.prismaService.bookmark.create({
      data: {
        title: bookmarkDto.title,
        link: bookmarkDto.link,
        description: bookmarkDto.description,
        userId,
      },
    });
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    editBookmarkDto: EditBookmarkDto,
  ) {
    try {
      const bookmarkDetail = await this.prismaService.bookmark.update({
        where: {
          userId,
          id: +bookmarkId,
        },
        data: {
          userId,
          ...editBookmarkDto,
        },
      });
      return bookmarkDetail
        ? bookmarkDetail
        : { error: 'No Bookmark found with given Id' };
    } catch (error) {
      return { error };
    }
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmarkDetail = await this.prismaService.bookmark.delete({
      where: {
        userId,
        id: +bookmarkId,
      },
    });
    return bookmarkDetail
      ? bookmarkDetail
      : { error: 'No Bookmark found with given Id' };
  }

  async findAndGetBookmarks(userId: number, body: BookmarkBody) {
    const skipCount =
      (body.pageOffset?.pageSize || 2) *
      ((body.pageOffset?.pageNumber || 1) - 1);

    return this.prismaService.bookmark.findMany({
      skip: skipCount,
      take: body.pageOffset?.pageSize || 2,
      orderBy: { title: body.orderBy || 'asc' },
      where: {
        userId,
        title: {
          contains: body.searchText || '',
        },
      },
    });
  }
}
