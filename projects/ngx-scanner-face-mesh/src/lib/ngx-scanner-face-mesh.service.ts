import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';

export interface SelectedFiles {
  file: any;
  name: string;
  url?: string;
  base64?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgxScannerFaceMeshService {

  /**
  * Files to base64: SelectedFiles[]
  * @param files 
  * @param selectedFiles 
  * @returns SelectedFiles
  */
  public toBase64(files: File[], selectedFiles: SelectedFiles[]): AsyncSubject<SelectedFiles[]> {
    const result = new AsyncSubject<SelectedFiles[]>();
    if (files?.length) {
      Object.keys(files)?.forEach((file, i) => {
        const url = URL.createObjectURL(files[i]);
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          selectedFiles = selectedFiles?.filter(f => f?.name != files[i]?.name);
          selectedFiles.push({ name: files[i]?.name, file: files[i], base64: reader?.result as string, url: url });
          result.next(selectedFiles);
          if (files?.length === (i + 1)) {
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }
}
