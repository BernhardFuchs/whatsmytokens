import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BalanceInfoState } from '../../dapp-store/balance-info.state';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent {

  @Select(BalanceInfoState.getAddress) address$: Observable<string>;
  @Select(BalanceInfoState.getBalance) balance$: Observable<string>;

}
