import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/modules/auth/auth.module';
import { PrismaModule } from './core/modules/prisma/prisma.module';
import { UserModule } from './core/modules/user/user.module';
import { BookmarkModule } from './core/modules/bookmark/bookmark.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MulterModule.register({ dest: '/images' }),
    PrismaModule,
    UserModule,
    BookmarkModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
