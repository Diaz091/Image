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


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public imagePath;
  public message: string;
  imgURL: any = 'assets/img/preview.png';
  imgURLCompress: any = 'assets/img/preview.png';
  archivos: FileItem[] = [];
  num = '';

  constructor(private imageCompress: NgxImageCompressService) {}

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const MIMETYPE = files[0].type;
    if (MIMETYPE.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const READER = new FileReader();
    this.imagePath = files;
    READER.readAsDataURL(files[0]);
    // tslint:disable-next-line: variable-name
    READER.onload = (_event) => {
      this.imgURL = READER.result; // -> Change Default img to Input IMG
    };
  }

  clearInput() {
    this.imgURL = 'assets/img/preview.png';
    this.imgURLCompress = 'assets/img/preview.png';
    this.archivos = [];
  }

  // Compress Function
  compressFile() {
    let ratio: number;
    const myImg = document.getElementById('img') as HTMLImageElement;
    // Default Image Width
    const defaultWidth = myImg.naturalWidth;
    // Default Image Height
    const defaultHeight = myImg.naturalHeight;
    // tslint:disable-next-line: radix
    const numParsed = parseInt(this.num);
    if ( !isNaN( numParsed ) &&  numParsed > 1024 )  {

      // Comprobamos cual de los lados es mayor.
      if ( defaultHeight > defaultWidth ) {
        ratio = (100 / (defaultHeight / numParsed ) );
      } else {
        ratio = (100 / (defaultWidth / numParsed ) );
      }

    } else { // If they don't insert any Height(Input) or Height(Input) < 1024
      if ( defaultHeight > defaultWidth ) {
        ratio = (100 / (defaultHeight / 1024));
      } else {
        ratio = (100 / (defaultWidth / 1024));
      }
    }

    // tslint:disable-next-line: prefer-const
    let orientation: any;
    this.imageCompress.compressFile(this.imgURL, orientation, ratio, 100).then(
      result => {
          this.imgURLCompress = result;
        }
      );
  }

  ngOnInit() {}
}
