import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ChainInfoService } from '../services';
import { ChainInfoStateModel } from './chain-info.state.model';
import { ChainInfoFetchAction, ChainInfoSuccessAction, ChainInfoErrorAction } from './chain-info.actions';

@State<ChainInfoStateModel>({
  name: 'chain',
  defaults: {
    currentBlock: ''
  }
})
export class ChainInfoState {
  constructor(private chainInfoService: ChainInfoService) {}

  @Selector()
  static getCurrentBlock(state: ChainInfoStateModel): string {
    return state.currentBlock;
  }

  @Action(ChainInfoFetchAction)
  fetchChainInfo(ctx: StateContext<ChainInfoStateModel>, action: ChainInfoFetchAction): Observable<any> {
    ctx.patchState({
      currentBlock: ''
    });
    return this.chainInfoService.getInfo(action.payload).pipe(
      tap((res: any) => ctx.dispatch(new ChainInfoSuccessAction(res))),
      catchError(err => ctx.dispatch(new ChainInfoErrorAction(err)))
    );
  }

  @Action(ChainInfoSuccessAction)
  fetchChainInfoSuccess(ctx: StateContext<ChainInfoStateModel>, action: ChainInfoSuccessAction) {
    ctx.setState({currentBlock: action.response.result});
  }
}
