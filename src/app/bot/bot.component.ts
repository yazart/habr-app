import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {
  TuiButtonModule,
  TuiGroupModule,
  TuiModeModule,
  TuiScrollbarComponent, TuiScrollbarModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiMobileDialogModule, TuiSheetDialogModule} from "@taiga-ui/addon-mobile";
import {TuiAvatarModule, TuiInputComponent, TuiInputModule, TuiTextareaModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  TUI_DEFAULT_MATCHER,
  TUI_WINDOW_SIZE,
  TuiAutoFocusModule,
  tuiControlValue,
  TuiSwipeDirection,
  TuiSwipeModule
} from "@taiga-ui/cdk";
import {AsyncPipe, NgForOf} from "@angular/common";
import {BehaviorSubject, map, Observable} from "rxjs";
import {TuiCellModule, TuiIconModule, TuiTitleModule} from "@taiga-ui/experimental";

@Component({
  standalone: true,
  selector: 'bot',
  templateUrl: './bot.component.html',
  styleUrls: ['bot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiButtonModule,
    TuiSheetDialogModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiSwipeModule,
    TuiAvatarModule,
    NgForOf,
    AsyncPipe,
    TuiMobileDialogModule,
    TuiTitleModule,
    TuiIconModule,
    TuiCellModule,
    TuiGroupModule,
    TuiAutoFocusModule,
    TuiModeModule,
    TuiTextareaModule,
    TuiScrollbarModule
  ]
})
export class BotComponent {
  @ViewChild(TuiScrollbarComponent, {read: ElementRef})
  private readonly scrollBar?: ElementRef<HTMLElement>;

  public userName = 'User';

  public form = new FormGroup({
    message: new FormControl<string>('', [Validators.required]),
  });

  messages$ =  new BehaviorSubject([
    {id: 1, name: 'Bot', from: 'Bot', to: 'User', message: 'Test1'},
  ])

  send(){
    this.form.updateValueAndValidity();
    if(this.form.valid) {
      const messages = this.messages$.value;
      const value = this.form.value;
      this.form.reset();
      this.messages$.next([
        ...messages,
        {
          id: (messages.at(-1)?.id || 0) + 1,
          name: this.userName,
          from: this.userName,
          to: 'Bot',
          message: value['message'] || '',
        }
      ]);
      if (!this.scrollBar) {
        return;
      }

      const {nativeElement} = this.scrollBar;

      nativeElement.scrollTop = nativeElement.scrollHeight;
    }
  }
}
