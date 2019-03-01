export interface AddressInfoStateModel {
  address: string;
  ETH: Eth;
  countTxs?: number;
  contractInfo?: ContractInfo;
  tokenInfo?: TokenInfo;
  tokens?: Token[];
}

export interface Eth {
  balance: number | boolean;
}

export interface ContractInfo {
  creatorAddress: string;
  transactionHash: string;
  timestamp: number;
}

export interface Price {
  rate?: string;
  diff?: number;
  diff7d?: number;
  ts?: string;
  marketCapUsd?: null | string;
  availableSupply?: null | string;
  volume24h?: null | string;
  diff30d?: number;
  currency?: Currency;
}

export enum Currency {
  Usd = 'USD'
}

export interface Token {
  tokenInfo?: TokenInfo;
  balance?: number;
  totalIn?: number;
  totalOut?: number;
}

export interface TokenInfo {
  address: string;
  name?: string;
  decimals?: Decimals;
  symbol: string;
  totalSupply?: string;
  owner?: string;
  lastUpdated?: number;
  issuancesCount?: number;
  holdersCount?: number;
  ethTransfersCount?: number;
  price?: PriceUnion;
  website?: string;
  image?: string;
  description?: string;
  facebook?: string;
  twitter?: string;
  reddit?: string;
  links?: string;
  telegram?: string;
  totalIn?: number;
  totalOut?: number;
}

export type Decimals = number | string;
export type PriceUnion = boolean & Price;
