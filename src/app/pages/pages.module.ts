import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
     
    ]
  }
]

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    LayoutModule
  ],
})
export class PagesModule { }
