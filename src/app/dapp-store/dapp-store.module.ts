import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../environments/environment';
import {
  BalanceInfoService,
  AddressInfoService,
  BalanceInfoApi,
  EthplorerApi
} from '../services';
import { HttpClientModule } from '@angular/common/http';
import { BalanceInfoState } from './balance-info.state';
import { AddressInfoState } from './address-info.state';
import { TokenTableState } from './token-table.state';
import { CachedAddrState } from './cached-addr.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      BalanceInfoState,
      AddressInfoState,
      TokenTableState,
      CachedAddrState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    HttpClientModule
  ],
  providers: [
    BalanceInfoService,
    BalanceInfoApi,
    AddressInfoService,
    EthplorerApi
  ]
})
export class DappStoreModule {}
