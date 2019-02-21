import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { TokenTableViewItem } from '../dapp-store/token-table.state.model';
import { TokenTableState } from '../dapp-store/token-table.state';
import { Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Select(TokenTableState.getTokenTableItems)
  private tokenTableItems$!: Observable<TokenTableViewItem[]>;
  private initValue: BehaviorSubject<
    TokenTableViewItem[]
  > = new BehaviorSubject<TokenTableViewItem[]>([]);

  getAllItems(): Observable<TokenTableViewItem[]> {
    const sources = [this.tokenTableItems$, this.initValue];
    return merge(...sources);
  }
}
