import { Injectable } from '@angular/core';

@Injectable()
export class BalanceInfoService {

  constructor() { }

  public fetchBalance(address: string): Promise<string> {
    return new Promise(() => '123');
  }
}
