import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DappHomeComponent } from './dapp-home/dapp-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DappHomeComponent
  },
  {
    path: 'dashboard',
    loadChildren: './dapp-dashboard/dapp-dashboard.module#DappDashboardModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
