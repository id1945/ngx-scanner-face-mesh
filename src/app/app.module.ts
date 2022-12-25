import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SafePipe } from './safe.pipe';
import { NgxScannerFaceMeshModule } from 'projects/ngx-scanner-face-mesh/src/public_api';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    NgxScannerFaceMeshModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
