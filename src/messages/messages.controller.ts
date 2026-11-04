import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessageService } from './messages.service.js';

export interface MessageDto {
  messageId: number;
  empDept: string;
  dateOfBirth: string;
}

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getAllMessages(): unknown {
    return this.messageService.getAllEmployees();
  }

  @Get(':id')
  getMessageById(@Param('id') id: number): unknown {
    return this.messageService.findByMessageId(id);
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
