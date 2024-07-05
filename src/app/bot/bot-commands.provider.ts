import { InjectionToken } from '@angular/core';

export interface BotCommand {
  command: string;
  response: string;
  id: string;
  isDefault: boolean;
}

export const BOT_COMMAND = new InjectionToken<BotCommand>('BOT_COMMAND');

export const BOT_COMMANDS = [
  {
    command: '',
    isDefault: true,
    id: 0,
    response: 'Извините, я не понимаю эту команду.',
  },
  {
    command: 'Привет',
    isDefault: false,
    id: 0,
    response: 'Здравствуйте! Чем могу помочь?',
  },

  {
    command: 'Как тебя зовут?',
    isDefault: false,
    id: 0,
    response: 'Я ваш виртуальный ассистент.',
  },

  {
    command: 'Помощь',
    isDefault: false,
    id: 0,
    response: 'Вы можете задать мне любой вопрос.',
  },
].map((value) => ({
  provide: BOT_COMMAND,
  multi: true,
  useValue: value,
}));
