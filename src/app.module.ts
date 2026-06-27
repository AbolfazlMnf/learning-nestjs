import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LogFilter } from './shared/filters/log.filter';
import { Log, LogSchema } from './shared/schemas/log.schema';
import { ConfigModule } from '@nestjs/config';
import { LogInterceptor } from './shared/interceptors/log.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    BlogModule,
    MongooseModule.forRoot(process.env.DB_URL ?? ''),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }),
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LogFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class AppModule {}
