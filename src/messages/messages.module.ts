import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller.js';
import { MessageService } from './messages.service.js';
import { LoggerService } from './logger.service.js';

@Module({
  controllers: [MessagesController],
  providers: [MessageService, LoggerService],
})
export class MessagesModule {}
