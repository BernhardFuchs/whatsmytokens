import { AddressInfoStateModel } from './address-info.state.model';

export class AddressInfoFetchAction {
  static readonly type = '[Address Component] Fetch Address Info';
  constructor(public address: string) {}
}

export class BalanceInfoSuccessAction {
  static readonly type = '[Balance Api] Address Info Success';
  constructor(public address: string, public balanceEther: string) {}
}

export class BalanceInfoErrorAction {
  static readonly type = '[Balance Api] Address Info Error';
  constructor(public error: any) {}
}

export class AddressInfoSuccessAction {
  static readonly type = '[Ethplorer Api] Address Info Success';
  constructor(
    public address: string,
    public addressInfo: AddressInfoStateModel
  ) {}
}

export class AddressInfoErrorAction {
  static readonly type = '[Ethplorer Api] Address Info Error';
  constructor(public error: any) {}
}
