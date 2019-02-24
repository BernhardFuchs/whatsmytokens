import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuiModule } from './gui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DappStoreModule } from './dapp-store';
import { DappHeaderComponent } from './dapp-header/dapp-header.component';
import { DappAddressComponent } from './dapp-address/dapp-address.component';
import { DappHomeComponent } from './dapp-home/dapp-home.component';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DappHeaderComponent,
    DappAddressComponent,
    DappHomeComponent
  ],
  imports: [
    BrowserModule,
    DappStoreModule,
    GuiModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
