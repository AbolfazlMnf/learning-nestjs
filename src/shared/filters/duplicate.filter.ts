import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class DuplicateFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception.code === 11000) {
      return response.status(409).json({
        statusCode: 409,
        message: `${Object.keys(exception.keyValue)[0]} تکراری است`,
      });
    }

    throw exception;
  }
}
