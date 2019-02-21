import { Injectable } from '@angular/core';
import { Web3Api } from './web3.api';

@Injectable()
export class BalanceInfoService {

  constructor(private web3Api: Web3Api) { }

  public fetchBalance(address: string): Promise<any> {
    return this.web3Api.fetchBalance(address);
  }
}
