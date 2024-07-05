import { inject, Injectable } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

import type { BotCommand } from './bot-commands.provider';
import { BOT_COMMAND } from './bot-commands.provider';
import type { Message } from './message';

@Injectable()
export class BotService {
  private readonly commands: BotCommand[] = inject<BotCommand[]>(BOT_COMMAND);

  private readonly default = this.commands.find((c) => c.isDefault);

  private readonly commandMap = this.commands.reduce(
    (mapCommand: Record<string, BotCommand>, command: BotCommand) => {
      Object.assign(mapCommand, {
        [command.command]: command,
      });

      return mapCommand;
    },
    {} as Record<string, BotCommand>,
  );

  private readonly INBOX$ = new Subject<Message>();

  public inbox$ = this.INBOX$.pipe(debounceTime(1));

  public sendMessage(mgs: Message): void {
    const trimMsg = mgs.message.trim();

    if (this.commandMap[trimMsg]) {
      this.INBOX$.next({
        message: this.commandMap[trimMsg].response || '',
        name: 'Bot',
        from: 'Bot',
        to: 'User',
        id: mgs.id + 1,
      });

      return;
    }

    if (this.default) {
      this.INBOX$.next({
        message: this.default.response || '',
        name: 'Bot',
        from: 'Bot',
        to: 'User',
        id: mgs.id + 1,
      });
    }
  }
}
