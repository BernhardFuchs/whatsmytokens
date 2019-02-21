import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  TokenTableStateModel,
  TokenTableViewItem,
  TokenTableViewItemBuilder
} from './token-table.state.model';
import {
  AddressInfoSuccessAction,
  AddressInfoFetchAction
} from './address-info.actions';
import { isUndefined as _isUndefined } from 'lodash';

export const defaultState: TokenTableStateModel = {
  tokens: []
};

@State<TokenTableStateModel>({
  name: 'tokenTable',
  ...defaultState
})
export class TokenTableState {
  @Selector()
  static getTokenTableItems(state: TokenTableStateModel): TokenTableViewItem[] {
    return state.tokens;
  }

  @Selector()
  static getTokensLength(state: TokenTableStateModel): number {
    return state.tokens.length;
  }

  @Action(AddressInfoSuccessAction)
  mapTokenTableData(
    ctx: StateContext<TokenTableStateModel>,
    action: AddressInfoSuccessAction
  ) {
    const newState: TokenTableStateModel = { tokens: [] };
    if (!_isUndefined(action.addressInfo.tokens)) {
      action.addressInfo.tokens.map(token =>
        newState.tokens.push(
          new TokenTableViewItemBuilder()
            .withSymbol(token.tokenInfo.symbol)
            .withName(token.tokenInfo.name)
            .withBalance(token.balance)
            .withCurrency(token.tokenInfo.price.currency)
            .withDiff(token.tokenInfo.price.diff)
            .withDiff7d(token.tokenInfo.price.diff7d)
            .withDiff30d(token.tokenInfo.price.diff30d)
            .withHoldersCount(token.tokenInfo.holdersCount)
            .withMarketCap(token.tokenInfo.price.marketCapUsd)
            .withRate(token.tokenInfo.price.rate)
            .withVolume24h(token.tokenInfo.price.volume24h)
            .build()
        )
      );
    }
    ctx.patchState(newState);
  }

  @Action(AddressInfoFetchAction)
  reset(ctx: StateContext<TokenTableStateModel>) {
    ctx.setState(defaultState);
  }
}
