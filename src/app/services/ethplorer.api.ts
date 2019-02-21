import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ethplorerApi, ethplorerPaths } from '@core/providers.constants';
import { Observable } from 'rxjs';

@Injectable()
export class EthplorerApi {
  private static readonly QUERY_KEY_API_KEY: string = 'apiKey';
  private static readonly QUERY_VALUE_FREE_KEY: string = 'freekey';

  constructor(private httpClient: HttpClient) {}

  public fetchAddressInfo(address: string): Observable<any> {
    const options = {
      params: new HttpParams()
        .set(EthplorerApi.QUERY_KEY_API_KEY, EthplorerApi.QUERY_VALUE_FREE_KEY)
    };
    const url: URL = new URL(`${ethplorerApi}${ethplorerPaths.getAddressInfo}/${address}`);
    return this.httpClient.get<any>(url.toString(), options);
  }
}
