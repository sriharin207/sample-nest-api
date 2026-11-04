import { Injectable } from '@nestjs/common';
import { MessageDto } from './messages.controller.js';
import { LoggerService } from './logger.service.js';

interface employee {
  messageId: number;
  empDept: string;
  dateOfBirth: string;
}

@Injectable()
export class MessageService {
  constructor(private readonly loggerService: LoggerService) {}
  private employees: employee[] = [
    { messageId: 1, empDept: 'SAP', dateOfBirth: '20-03-1998' },
    { messageId: 2, empDept: 'UNIX', dateOfBirth: '21-03-1998' },
    { messageId: 3, empDept: 'REACT', dateOfBirth: '22-03-1998' },
  ];

  getAllEmployees() {
    this.loggerService.logMessage('Fetching all employees');
    return this.employees.sort((a, b) => a.messageId - b.messageId);
  }

  findByMessageId(messageId: number) {
    this.loggerService.logMessage('Fetching employee by id');
    return this.employees.find((emp) => emp.messageId == messageId) || [];
  }

  createMessageById(createUserDto: MessageDto) {
    this.loggerService.logMessage('Creating employee by id');
    this.employees.push(createUserDto);
    return 'Message created successfully';
  }

  updateMessageById(messageId: number, updateUserDto: MessageDto) {
    this.loggerService.logMessage('Updating employee by id');
    const index = this.employees.findIndex((ele) => ele.messageId == messageId);
    if (index !== -1) {
      this.employees[index] = updateUserDto;
      return 'User details updated';
    }
    return 'message not found';
  }

  deleteMessageById(messageId: number) {
    this.loggerService.logMessage('Deleting employee by id');
    const index = this.employees.findIndex((ele) => ele.messageId == messageId);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return `User messages with id :${messageId} deleted successfully`;
    }
    return `No messages with id :${messageId} found`;
  }
}
