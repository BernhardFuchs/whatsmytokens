import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ChainInfoFetchAction, ChainInfoState } from '../dapp-store';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dapp-header',
  templateUrl: './dapp-header.component.html',
  styleUrls: ['./dapp-header.component.scss']
})
export class DappHeaderComponent implements OnInit, OnDestroy {

  public popText: boolean;
  public applyShadow: boolean;

  @Select(ChainInfoState.getCurrentBlock) currentBlock$;
  private payload = '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}';
  private _onDestroy = new Subject();

  constructor(private store$: Store) { }

  ngOnInit() {
    this.store$.dispatch(new ChainInfoFetchAction(this.payload));
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
