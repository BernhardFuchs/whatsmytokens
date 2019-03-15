import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShortenAddressService {
  getShortAddress(address: string) {
    const startChars: string = address.slice(0, 7);
    const endChars: string = address.slice(
      address.length - 6,
      address.length - 1
    );
    return `${startChars}...${endChars}`;
  }
}
