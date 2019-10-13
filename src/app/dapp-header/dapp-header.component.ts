import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaService, MediaSize } from '../shared/media.service';

@Component({
  selector: 'app-dapp-header',
  templateUrl: './dapp-header.component.html',
  styleUrls: ['./dapp-header.component.scss']
})
export class DappHeaderComponent implements OnInit, OnDestroy {
  private _mediaSizeSubscription: Subscription;
  private _currentMedia = '';
  public isMobileViewPort: boolean;
  constructor(private mediaService: MediaService) {
    this._mediaSizeSubscription = this.mediaService
      .getMediaSize()
      .subscribe((mediaSize: MediaSize) => {
        this._currentMedia = mediaSize.current;
        this.handleMobileSize();
      });
  }

  private handleMobileSize(): any {
    this.isMobile()
      ? (this.isMobileViewPort = true)
      : (this.isMobileViewPort = false);
  }

  private isMobile(): boolean {
    return this._currentMedia === MediaSize.XS;
  }

  ngOnDestroy(): void {
    this._mediaSizeSubscription.unsubscribe();
  }

  ngOnInit() {}
}
