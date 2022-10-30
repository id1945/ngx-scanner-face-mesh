import { SelectedFiles, NgxScannerFaceMeshService, BaseConfig } from 'ngx-scanner-face-mesh';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public config: BaseConfig = {
    mesh: {
      maxNumFaces: 5,
    },
    // style: { 
    //   width: 'auto', 
    //   height: window.outerHeight + 'px'
    // },
    // medias: {
    //   audio: false,
    //   video: {
    //     width: { ideal: window.outerWidth },
    //     height: { ideal: window.outerHeight }
    //   }
    // }
  }

  public selectedFiles: SelectedFiles[] = [];

  constructor(private faces: NgxScannerFaceMeshService) { }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log);
  }

  public onSelects(files: any) {
    this.selectedFiles = [];
    this.faces.toBase64(files, this.selectedFiles).subscribe((res: any) => this.selectedFiles = res);
  }

  public event(e: any) {
    console.log(e)
  }
}
