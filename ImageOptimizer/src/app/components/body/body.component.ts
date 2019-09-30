import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FileItem } from 'src/app/models/file-item';

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

  constructor(private imageCompress: NgxImageCompressService) {}

  preview( files ) {
    if (files.length === 0) {
      return;
    }

    const MIMETYPE = files[ 0 ].type;
    if ( MIMETYPE.match( /image\/*/ ) == null ) {
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

  // Compress Function
  compressFile( ) {
    // Gets the value of Height input if null or < 1024
    const height = ( ( document.getElementById( 'height' ) as HTMLInputElement ).value) ;
    let ratio: number;
    console.log( 'Input --> ' + height );
    const myImg = document.getElementById('img') as HTMLImageElement;
    // Image Default Width
    // const realWidth = myImg.naturalWidth;
    // Image Default Height
    const defaultHeight = myImg.naturalHeight;
    console.log( 'Default Height --> ' + defaultHeight );
    // When no height introduced or < 1024
    // tslint:disable-next-line: radix
    if ( height === ' '  || parseInt( height ) < 1024) {
      ratio = (100 / ( defaultHeight / 1024 ) );
      console.log( 'Ratio --> ' + ratio );
    } else {
      // tslint:disable-next-line: radix
      ratio = (100 / ( defaultHeight / parseInt( height ) ) );
      console.log( 'Ratio <--> ' + ratio );

    }

    // tslint:disable-next-line: prefer-const
    let orientation: any ; // Useless
    this.imageCompress.compressFile(this.imgURL, orientation, ratio , 100).then(
        result => {
          this.imgURLCompress = result;
        }
      );
  }

  clearInput() {
    this.imgURL = 'assets/img/preview.png';
    this.imgURLCompress = 'assets/img/preview.png';
    this.archivos = [];
  }

  ngOnInit() {
  }
}
