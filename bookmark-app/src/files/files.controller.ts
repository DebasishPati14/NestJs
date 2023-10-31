import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('file')
export class FileController {
  @Get(':filename')
  getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('filename') fileName: string,
  ): StreamableFile {
    const fileExtension = fileName.split('.')[fileName.split('.').length - 1];

    const file = createReadStream(join(process.cwd(), `uploads/${fileName}`));
    res.set({
      'Content-Type': `image/${fileExtension}`,
      'Content-Disposition': 'inline;',
    });
    return new StreamableFile(file);
  }
}
