import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AddressInfoService } from '../services';
import {
  AddressInfoFetchAction,
  AddressInfoSuccessAction,
  AddressInfoErrorAction
} from './address-info.actions';
import { AddressInfoStateModel, Token } from './address-info.state.model';

export const defaultState: AddressInfoStateModel = {
  address: '',
  ETH: {
    balance: false
  }
};
@State<AddressInfoStateModel>({
  name: 'addressInfo',
  ...defaultState
})
export class AddressInfoState {
  constructor(private addressInfoService: AddressInfoService) {}

  @Selector()
  static getTokens(state: AddressInfoStateModel): Token[] {
    return state.tokens;
  }

  @Action(AddressInfoFetchAction)
  fetchAddressInfo(
    ctx: StateContext<AddressInfoStateModel>,
    action: AddressInfoFetchAction
  ): Observable<any> {
    ctx.setState({ ...defaultState });
    return this.addressInfoService.fetchAddressInfo(action.address).pipe(
      tap((res: AddressInfoStateModel) =>
        ctx.dispatch(new AddressInfoSuccessAction(action.address, res))
      ),
      catchError((err: any) => {
        throw ctx.dispatch(new AddressInfoErrorAction(err));
      })
    );
  }

  @Action(AddressInfoSuccessAction)
  addAddressInfoToState(
    ctx: StateContext<AddressInfoStateModel>,
    action: AddressInfoSuccessAction
  ) {
    ctx.setState(action.addressInfo);
  }
}
