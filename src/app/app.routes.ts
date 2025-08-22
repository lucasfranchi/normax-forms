import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'form',
    loadComponent: () => import('./pages/forms/forms').then(m => m.Forms),
    children: [
      {
        path: 'aval-geral',
        loadComponent: () => import('./pages/forms/avaliacao-geral/avaliacao-geral').then(m => m.AvaliacaoGeral)
      },
      {
        path: 'stress',
        loadComponent: () => import('./pages/forms/risco-stress/risco-stress').then(m => m.RiscoStress)
      },
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
