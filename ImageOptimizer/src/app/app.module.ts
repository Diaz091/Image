import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';

import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import {NgxImageCompressService, } from 'ngx-image-compress';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FinnaPdfViewerModule } from 'finna-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BodyComponent,
    NgDropFilesDirective,
    PdfViewerComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ImageCropperModule,
    FinnaPdfViewerModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
