import { Component } from '@angular/core';
import { ScannerFaceConfig, ScannerFaceResult } from 'projects/ngx-scanner-face-mesh/src/lib/ngx-scanner-face-mesh.options';
import { NgxScannerFaceMeshService } from 'projects/ngx-scanner-face-mesh/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public config: ScannerFaceConfig = {
    mesh: {
      maxNumFaces: 5,
    },
    // style: { 
    //   background: '#000'
    // },
    // medias: {
    //   audio: false,
    //   video: {
    //     width: { ideal: window.outerWidth },
    //     height: { ideal: window.outerHeight }
    //   }
    // }
  }

  public faceResult: ScannerFaceResult[] = [];

  constructor(private faces: NgxScannerFaceMeshService) { }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe((res: boolean) => console.log(fn + ': ' + res));
  }

  public onSelects(files: any) {
    this.faces.loadFiles(files, this.config).subscribe((res: any) => this.faceResult = res);
  }

  public event(e: any) {
    // console.log(e)
  }
}
