export class ChainInfoFetchAction {
  static readonly type = '[Header Component] Fetch Chain Info';
  constructor(public payload: any) {}
}

export class ChainInfoSuccessAction {
  static readonly type = '[Chain Info Api] Chain Info Success';
  constructor(public response: any) {}
}

export class ChainInfoErrorAction {
  static readonly type = '[Chain Info Api] Chain Info Error';
  constructor(public error: any) {}
}
