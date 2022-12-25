import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxScannerFaceMeshComponent } from './ngx-scanner-face-mesh.component';
import { NgxScannerFaceMeshService } from './ngx-scanner-face-mesh.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxScannerFaceMeshComponent],
  exports: [NgxScannerFaceMeshComponent],
  providers: [NgxScannerFaceMeshService],
})
export class NgxScannerFaceMeshModule { }
