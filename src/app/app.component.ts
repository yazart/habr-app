import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiRootModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiAppBarModule,
  TuiBadgeNotificationModule,
  TuiHeaderModule,
  TuiIconModule,
  TuiSensitiveModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {filter, map, switchMap, tap} from 'rxjs';
import {TuiSheetDialogModule} from "@taiga-ui/addon-mobile";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRootModule,
  ],
  template: `
    <tui-root>
      <router-outlet />
    </tui-root>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {}
