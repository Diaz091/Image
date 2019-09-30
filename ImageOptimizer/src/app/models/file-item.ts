

export class FileItem {

    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;
    public type: string;

    constructor( archivo: File ) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

        // this.type = archivo.type.substr( archivo.type.lastIndexOf('/') , archivo.type.length);
        // console.log( this.type );

        this.estaSubiendo = false;
        this.progreso = 0;
    }

}
