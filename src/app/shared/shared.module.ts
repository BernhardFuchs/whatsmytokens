import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenHashPipe } from './pipes/shorten-hash.pipe';

@NgModule({
  declarations: [ShortenHashPipe],
  exports: [ShortenHashPipe],
  imports: [CommonModule]
})
export class SharedModule {}
