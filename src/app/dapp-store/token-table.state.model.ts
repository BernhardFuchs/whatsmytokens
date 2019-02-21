export interface TokenTableStateModel {
  tokens: TokenTableViewItem[];
}

export interface TokenTableViewItem {
  symbol: string;
  name: string;
  balance: number;
  holdersCount: number;
  rate: string;
  currency: string;
  marketCap: string;
  volume24h: string;
  diff: number;
  diff7d: number;
  diff30d: number;
}

export class TokenTableViewItem implements TokenTableViewItem {
  constructor(tokenTableViewItemImpl: TokenTableViewItem) {
    Object.assign(this, tokenTableViewItemImpl);
  }
}

export class TokenTableViewItemBuilder implements Partial<TokenTableViewItem> {
  symbol?: string;
  name?: string;
  balance?: number;
  holdersCount?: number;
  rate?: string;
  currency?: string;
  marketCap?: string;
  volume24h?: string;
  diff?: number;
  diff7d?: number;
  diff30d?: number;

  withSymbol(value: string): this & Pick<TokenTableViewItem, 'symbol'> {
    return Object.assign(this, { symbol: value });
  }

  withName(value: string): this & Pick<TokenTableViewItem, 'name'> {
    return Object.assign(this, { name: value });
  }

  withBalance(value: number): this & Pick<TokenTableViewItem, 'balance'> {
    return Object.assign(this, { balance: value });
  }

  withHoldersCount(
    value: number
  ): this & Pick<TokenTableViewItem, 'holdersCount'> {
    return Object.assign(this, { holdersCount: value });
  }

  withRate(value: string): this & Pick<TokenTableViewItem, 'rate'> {
    return Object.assign(this, { rate: value });
  }

  withCurrency(value: string): this & Pick<TokenTableViewItem, 'currency'> {
    return Object.assign(this, { currency: value });
  }

  withMarketCap(value: string): this & Pick<TokenTableViewItem, 'marketCap'> {
    return Object.assign(this, { marketCap: value });
  }

  withVolume24h(value: string): this & Pick<TokenTableViewItem, 'volume24h'> {
    return Object.assign(this, { volume24h: value });
  }

  withDiff(value: number): this & Pick<TokenTableViewItem, 'diff'> {
    return Object.assign(this, { diff: value });
  }

  withDiff7d(value: number): this & Pick<TokenTableViewItem, 'diff7d'> {
    return Object.assign(this, { diff7d: value });
  }

  withDiff30d(value: number): this & Pick<TokenTableViewItem, 'diff30d'> {
    return Object.assign(this, { diff30d: value });
  }

  build(this: TokenTableViewItem) {
    return new TokenTableViewItem(this);
  }
}

