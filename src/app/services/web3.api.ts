import { Injectable, Inject } from '@angular/core';
import { WEB3 } from '../core/';

@Injectable()
export class Web3Api {

  constructor(@Inject(WEB3) private web3) { }

  public fetchBalance(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBalance(address.trim(), (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
