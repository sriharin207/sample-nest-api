import { Injectable } from '@nestjs/common';

Injectable();
export class LoggerService {
  logMessage(message: string) {
    console.log('[LOG]', message, new Date(Date.now()).toISOString());
  }
}
