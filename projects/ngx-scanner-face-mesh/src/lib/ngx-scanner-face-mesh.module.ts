import { NgModule } from '@angular/core';
import { NgxScannerFaceMeshComponent } from './ngx-scanner-face-mesh.component';
import { NgxScannerFaceMeshService } from './ngx-scanner-face-mesh.service';

@NgModule({
  declarations: [
    NgxScannerFaceMeshComponent
  ],
  exports: [
    NgxScannerFaceMeshComponent,
  ],
  providers: [NgxScannerFaceMeshService]
})
export class NgxScannerFaceMeshModule { }
