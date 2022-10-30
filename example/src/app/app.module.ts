import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxScannerFaceMeshModule } from 'ngx-scanner-face-mesh';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxScannerFaceMeshModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
