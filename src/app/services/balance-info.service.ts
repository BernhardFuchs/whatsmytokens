import { Injectable } from '@angular/core';
import { BalanceInfoApi } from './balance-info.api';
import { Observable } from 'rxjs';

@Injectable()
export class BalanceInfoService {
  constructor(private balanceInfoApi: BalanceInfoApi) {}

  public fetchBalance(address: string): Observable<string> {
    return this.balanceInfoApi.fetchBalance(address);
  }
}
