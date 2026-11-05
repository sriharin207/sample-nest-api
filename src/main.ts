import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module.js';
import { ErrorInterceptor } from './TransformResponse.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalInterceptors(new ErrorInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
