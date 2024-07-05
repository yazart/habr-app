import { AsyncPipe, NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButtonModule,
  TuiGroupModule,
  TuiModeModule,
  TuiScrollbarComponent,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import {
  TuiCellModule,
  TuiIconModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import { TuiInputModule } from '@taiga-ui/kit';
import { BehaviorSubject, tap } from 'rxjs';

import { BotService } from './bot.service';
import { BOT_COMMANDS } from './bot-commands.provider';
import type { Message } from './message';

@Component({
  standalone: true,
  selector: 'app-bot',
  imports: [
    TuiButtonModule,
    TuiInputModule,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    TuiTitleModule,
    TuiIconModule,
    TuiCellModule,
    TuiGroupModule,
    TuiModeModule,
    TuiScrollbarModule,
  ],
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BOT_COMMANDS, BotService],
})
export class BotComponent {
  @ViewChild(TuiScrollbarComponent, { read: ElementRef })
  private readonly scrollBar?: ElementRef<HTMLElement>;

  private readonly destroyRef$ = inject(DestroyRef);
  private readonly bot = inject(BotService);

  private readonly inboxMessages = this.bot.inbox$
    .pipe(
      tap((message) => this.messages$.next([...this.messages$.value, message])),
      takeUntilDestroyed(this.destroyRef$),
    )
    .subscribe(() => {
      this.onMessage();
    });

  public userName = 'User';

  public form = new FormGroup({
    message: new FormControl<string>('', [Validators.required]),
  });

  public messages$ = new BehaviorSubject<Message[]>([]);

  public send(): void {
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      const messages = this.messages$.value;
      const value = this.form.value;

      this.form.reset();
      const message = {
        id: (messages.at(-1)?.id || 0) + 1,
        name: this.userName,
        from: this.userName,
        to: 'Bot',
        message: value.message || '',
      };

      this.bot.sendMessage(message);
      this.messages$.next([...messages, message]);
      this.onMessage();
    }
  }

  private onMessage(): void {
    if (!this.scrollBar) {
      return;
    }

    const { nativeElement } = this.scrollBar;

    nativeElement.scrollTop = nativeElement.scrollHeight;
  }
}
