import { Injectable } from '@angular/core';
import { EthplorerApi } from './ethplorer.api';
import { Observable, of } from 'rxjs';

@Injectable()
export class AddressInfoService {
  constructor(private ethplorerApi: EthplorerApi) {}

  public fetchAddressInfo(address: string): Observable<any>  {
    return this.ethplorerApi.fetchAddressInfo(address);
  }
}
