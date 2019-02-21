import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DappAddressComponent } from './dapp-address.component';

describe('DappAddressFieldComponent', () => {
  let component: DappAddressComponent;
  let fixture: ComponentFixture<DappAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DappAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DappAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
