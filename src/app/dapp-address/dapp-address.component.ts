import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';

import { AddressInfoFetchAction } from '../dapp-store/address-info.actions';
import * as styles from './dapp-address.styles';
import { CachedAddrState } from '../dapp-store/cached-addr.state';
import { Observable } from 'rxjs';
import { CachedAddrStateModel } from '../dapp-store/cached-addr.state.model';

@Component({
  selector: 'app-dapp-address',
  templateUrl: './dapp-address.component.html'
})
export class DappAddressComponent implements OnInit {
  public address_container: any = styles.address_container;
  public address_formField: any = styles.address_formField;

  constructor(private store$: Store, private router: Router) {}

  addressForm = new FormControl('', [Validators.required]);

  @Select(CachedAddrState.getCachedAddr) cachedAddr$: Observable<
    CachedAddrStateModel
  >;

  ngOnInit() {
    // uncomment for easier test experience
    // this.addressForm.setValue('0xb8c77482e45f1f44de1745f52c74426c631bdd52');
  }

  getErrorMessage() {
    return this.addressForm.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  public fetchAddress() {
    console.log('Fetching for Address: ', this.addressForm.value);
    this.store$.dispatch(new AddressInfoFetchAction(this.addressForm.value));
    this.router.navigateByUrl('/dashboard');
  }
}
