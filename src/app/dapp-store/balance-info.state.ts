import { State, Action, StateContext, Selector } from '@ngxs/store';
import { BalanceInfoStateModel } from './balance-info.state.model';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  AddressInfoFetchAction,
  BalanceInfoSuccessAction,
  BalanceInfoErrorAction
} from './address-info.actions';
import { BalanceInfoService } from '../services';

@State<BalanceInfoStateModel>({
  name: 'balanceInfo',
  defaults: {
    address: '',
    balanceEther: ''
  }
})
export class BalanceInfoState {
  constructor(private balanceInfoService: BalanceInfoService) {}

  @Selector()
  static getAddress(state: BalanceInfoStateModel) {
    return state.address;
  }

  @Selector()
  static getBalance(state: BalanceInfoStateModel) {
    return state.balanceEther;
  }

  @Action(AddressInfoFetchAction)
  fetchBalanceInfo(
    ctx: StateContext<BalanceInfoStateModel>,
    action: AddressInfoFetchAction
  ): Observable<any> {
    ctx.setState({
      address: '',
      balanceEther: ''
    });
    return this.balanceInfoService.fetchBalance(action.address).pipe(
      tap((res: any) => {
        ctx.dispatch(new BalanceInfoSuccessAction(action.address, res.balance));
      }),
      catchError((err: any) => {
        throw ctx.dispatch(new BalanceInfoErrorAction(err));
      })
    );
  }

  @Action(BalanceInfoSuccessAction)
  addBalanceInfoToState(
    ctx: StateContext<BalanceInfoStateModel>,
    action: BalanceInfoSuccessAction
  ) {
    ctx.setState({
      address: action.address,
      balanceEther: action.balanceEther
    });
  }
}
