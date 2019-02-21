import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtherPipe } from './pipes';
import { ShortenHashPipe } from './pipes/shorten-hash.pipe';

@NgModule({
  declarations: [EtherPipe, ShortenHashPipe],
  exports: [EtherPipe, ShortenHashPipe],
  imports: [CommonModule]
})
export class SharedModule {}
