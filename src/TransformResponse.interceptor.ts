import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable() // Controller Scoped
export class TransformResponseInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data: T) => ({
        data,
        time: new Date(Date.now()).toISOString(),
        statusCode,
      })),
    );
  }
}

@Injectable() // Global
export class ErrorInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) =>
          throwError(() => new NotFoundException('Message not found')),
        ),
      );
  }
}
