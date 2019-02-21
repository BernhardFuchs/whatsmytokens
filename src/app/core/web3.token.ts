import { InjectionToken } from '@angular/core';
import Web3 from 'web3';
import { infuraMain } from './providers.constants';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => new Web3(infuraMain.href)
});
