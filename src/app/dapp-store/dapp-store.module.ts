import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../environments/environment';
import { ChainInfoState } from './chain-info.state';
import { ChainInfoService, BalanceInfoService, AddressInfoService } from '../services';
import { HttpClientModule } from '@angular/common/http';
import { BalanceInfoState } from './balance-info.state';
import { Web3Api } from '../services/web3.api';
import { EthplorerApi } from '../services/ethplorer.api';
import { AddressInfoState } from './address-info.state';
import { TokenTableState } from './token-table.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      ChainInfoState,
      BalanceInfoState,
      AddressInfoState,
      TokenTableState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    HttpClientModule
  ],
  providers: [
    ChainInfoService,
    BalanceInfoService,
    AddressInfoService,
    Web3Api,
    EthplorerApi
  ],
})
export class DappStoreModule {}
