import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DappHeaderComponent } from './dapp-header.component';

describe('DappHeaderComponent', () => {
  let component: DappHeaderComponent;
  let fixture: ComponentFixture<DappHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DappHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DappHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
