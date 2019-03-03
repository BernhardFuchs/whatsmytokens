import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BalanceInfoApi {
  constructor(private httpClient: HttpClient) {}

  public fetchBalance(address: string): Observable<any> {
    const url: URL = new URL(`http://localhost:3000/balance`);
    return this.httpClient.get<any>(url.toString(), {
      headers: { address: address }
    });
  }
}
