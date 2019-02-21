import { Injectable } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class MediaSize {
  public static readonly XS = 'xs';
  public static readonly SM = 'sm';
  public static readonly MD = 'md';
  public static readonly LG = 'lg';
  constructor(public current: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private mediaObserver: MediaObserver) {}

  getMediaSize(): Observable<MediaSize> {
    return this.mediaObserver.media$.pipe(
      map((change: MediaChange) => {
        return new MediaSize(change.mqAlias);
      })
    );
  }
}
