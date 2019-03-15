import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { CachedAddrStateModel } from './cached-addr.state.model';
import { AddressInfoFetchAction } from './address-info.actions';
import { toArray, map } from 'rxjs/operators';
import { ShortenAddressService } from '../services';

@State<CachedAddrStateModel>({
  name: 'cachedAddr',
  defaults: {
    fullAddress: '',
    shortAddress: ''
  }
})
export class CachedAddrState {
  constructor(private shortenAddressService: ShortenAddressService) {}

  @Selector()
  static getCachedAddr() {
    return localStorage.getItem('cachedAddr');
  }

  @Action(AddressInfoFetchAction)
  setAddress(
    ctx: StateContext<CachedAddrStateModel>,
    action: AddressInfoFetchAction
  ): Observable<any> {
    console.log('### action', action);
    console.log('### action.address', action.address);
    return of(action.address).pipe(
      map(address => this.createCachedAddress(address)),
      toArray(),
      map(addr => localStorage.setItem('cachedAddr', JSON.stringify(addr)))
    );
  }

  private createCachedAddress(address: string): CachedAddrStateModel {
    return {
      fullAddress: address,
      shortAddress: this.shortenAddressService.getShortAddress(address)
    };
  }
}
