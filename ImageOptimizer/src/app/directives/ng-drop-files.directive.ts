import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';



@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  // @Output() changeImg:  EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  // Color change "Animation"
  @HostListener('dragover', ['$event'])
  public ondragenter( event: any) {
    this.mouseSobre.emit( true );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any) {
    this.mouseSobre.emit( false );

    const TRANSFERENCIA = this._getTransferencia( event );
    if ( !TRANSFERENCIA ) {
      return;
    }

    this._extraerArchivos( TRANSFERENCIA.files );
    // this._prevenirDetener( event );
    this.mouseSobre.emit( false );
  }

  // Private Methods
  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList ) {
    // tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archivoTemportal = archivosLista[ propiedad ];
      if ( this._canBeLoaded( archivoTemportal ) ) {

        const nuevoArchivo = new FileItem( archivoTemportal );
        this.archivos.push( nuevoArchivo );

      }
    }
    console.log( this.archivos);
  }

  // Validaciones
  private _canBeLoaded( archivo: File ): boolean {
    if ( !this._archivoDropped( archivo.name ) ) {
      // Change Preview IMG into Dropped IMG
      return true;
    } else {
      return false;
    }
  }

  private _archivoDropped( nombreArchivo: string ): boolean {
    for ( const archivo of this.archivos ) {
      if ( archivo.nombreArchivo === nombreArchivo ) {
        console.log('El archivo ' + nombreArchivo + 'ya existe ');
        return true;
      }
    }
    return false;
  }
}
