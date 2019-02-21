import { State, Action, StateContext, Selector } from '@ngxs/store';
import { BalanceInfoStateModel } from './balance-info.state.model';
import { AddressInfoFetchAction, BalanceInfoSuccessAction, BalanceInfoErrorAction } from './address-info.actions';
import { BalanceInfoService } from '../services';

@State<BalanceInfoStateModel>({
  name: 'balanceInfo',
  defaults: {
    address: '',
    balanceWei: ''
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
    return state.balanceWei;
  }

  @Action(AddressInfoFetchAction)
  async fetchBalanceInfo(ctx: StateContext<BalanceInfoStateModel>, action: AddressInfoFetchAction) {
    ctx.setState({
      address: '',
      balanceWei: ''
    });
    await this.balanceInfoService.fetchBalance(action.address).then(
      (res: string) => ctx.dispatch(new BalanceInfoSuccessAction(action.address, res)),
      err => ctx.dispatch(new BalanceInfoErrorAction(err))
    );
  }

  @Action(BalanceInfoSuccessAction)
  addBalanceInfoToState(ctx: StateContext<BalanceInfoStateModel>, action: BalanceInfoSuccessAction) {
    ctx.setState({
      address: action.address,
      balanceWei: action.balanceWei
    });
  }
}
