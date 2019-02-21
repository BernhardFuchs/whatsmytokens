import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { infuraMain } from '../core';
import { Observable } from 'rxjs';

@Injectable()
export class ChainInfoService {
  constructor(private httpClient: HttpClient) {}

  public getInfo(payload: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(infuraMain.href, payload, { headers });
  }
}
