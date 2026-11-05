import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './messages.service.js';
import { TransformResponseInterceptor } from '../TransformResponse.interceptor.js';

export interface MessageDto {
  messageId: number;
  empDept: string;
  dateOfBirth: string;
}

@UseInterceptors(TransformResponseInterceptor)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getAllMessages(): unknown {
    return this.messageService.getAllEmployees();
  }

  @Get(':id')
  getMessageById(@Param('id') id: number): unknown {
    const message = this.messageService.findByMessageId(id);
    if (message.length == 0) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  @Post()
  createMessage(@Body() createUserDto: MessageDto): string {
    return this.messageService.createMessageById(createUserDto);
  }

  @Put(':id')
  getMessageByIdParam(
    @Body() createUserDto: MessageDto,
    @Param('id') id: number,
  ): unknown {
    return this.messageService.updateMessageById(id, createUserDto);
  }

  @Delete(':id')
  deleteMessageById(@Param('id') id: number) {
    return this.messageService.deleteMessageById(id);
  }
}
