import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GuiModule } from '../gui.module';
import { SharedModule } from '../shared/shared.module';
import { DappDashboardComponent } from './dapp-dashboard.component';
import { TokenTableComponent } from './token-table/token-table.component';
import { GeneralInfoComponent } from './general-info/general-info.component';

const routes = [
  {
    path: '',
    component: DappDashboardComponent
  }
];

@NgModule({
  declarations: [
    TokenTableComponent,
    DappDashboardComponent,
    GeneralInfoComponent
  ],
  entryComponents: [DappDashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    GuiModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule
  ]
})
export class DappDashboardModule {}
