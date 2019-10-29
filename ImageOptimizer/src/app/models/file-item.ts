

export class FileItem {

    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public type: string;

    constructor( archivo: File ) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

    }

}
