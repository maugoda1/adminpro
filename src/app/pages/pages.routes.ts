import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

import { LoginGuardsGuard } from './../services/guards/login-guards.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardsGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars'}  },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graphs'}  },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promise'}  },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observable'}  },
      { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Setting'}  },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario'}  },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full', data: { titulo: 'Dashboard'}  }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
