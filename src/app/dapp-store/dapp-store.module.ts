import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../environments/environment';
import { BalanceInfoService, AddressInfoService } from '../services';
import { HttpClientModule } from '@angular/common/http';
import { BalanceInfoState } from './balance-info.state';
import { EthplorerApi } from '../services/ethplorer.api';
import { AddressInfoState } from './address-info.state';
import { TokenTableState } from './token-table.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([BalanceInfoState, AddressInfoState, TokenTableState]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    HttpClientModule
  ],
  providers: [BalanceInfoService, AddressInfoService, EthplorerApi]
})
export class DappStoreModule {}
