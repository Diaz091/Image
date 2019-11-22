import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgxImageCompressService
} from 'ngx-image-compress';
import {
  FileItem
} from 'src/app/models/file-item';
import {
  ImageCroppedEvent
} from 'ngx-image-cropper';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent {

  public imagePath: string;
  public message: string;
  imgURLCompress: any = '';
  archivos: FileItem[] = [];
  num = '';
  pdf = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private imageCompress: NgxImageCompressService) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  compressFile() {
    let ratio: number;
    const myImg = document.getElementById('img') as HTMLImageElement;
    const image = myImg.src;
    
    // Default Image Width
    const defaultWidth = myImg.naturalWidth;
    // Default Image Height
    const defaultHeight = myImg.naturalHeight;
    // tslint:disable-next-line: radix
    const numParsed = parseInt(this.num);
    if (!isNaN(numParsed) && numParsed > 1024) {
      // Comprobamos cual de los lados es mayor.
      if (defaultHeight > defaultWidth) {
        ratio = (100 / (defaultHeight / numParsed));
      } else {
        ratio = (100 / (defaultWidth / numParsed));
      }
    } else { // If they don't insert any Height(Input) or Height(Input) < 1024
      if (defaultHeight > defaultWidth) {
        ratio = (100 / (defaultHeight / 1024));
      } else {
        ratio = (100 / (defaultWidth / 1024));
      }
    }
    
    // tslint:disable-next-line: prefer-const
    let orientation: any;
    this.imageCompress.compressFile(image, orientation, ratio, 100).then(
      result => {
        // this.imgURLCompress = result;
        this.croppedImage = result;
      }
    );
  }

  onFileSelected(files) {
    if (files.length > 0) {
      this.pdf = files[0];
      if ( (files[0].type.split('/')[0]) === 'image' ) {
        document.getElementById('image').className = 'in';
        document.getElementById('pdf').className = 'out';
     } else {
        document.getElementById('pdf').className = 'in';
        document.getElementById('image').className = 'out';
     }
    }
  }
}






  // preview(files) {

  //   if (files.length === 0) {
  //     return;
  //   }
  //   const MIMETYPE = files[0].type;
  //   if (MIMETYPE.match(/image\/*/) == null) {
  //     this.message = 'Only images are supported.';
  //     return;
  //   }
  //   const READER = new FileReader();
  //   this.imagePath = files;
  //   READER.readAsDataURL(files[0]);
  //   // tslint:disable-next-line: variable-name
  //   READER.onload = (_event) => {
  //     this.imgURL = READER.result;
  //   };
  // }
