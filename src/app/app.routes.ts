import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'bot', pathMatch: 'full' },
  {
    path: 'bot',
    loadComponent: async () =>
      import('./bot/bot.component').then((c) => c.BotComponent),
  },
];
