export interface Subir {
    producto: Producto[];
}

export interface Producto {
    nombre: string;
    imagen: string;
    tipos:  Tipo[];
}

export interface Tipo {
    nombre:  string;
    imagen:  string;
    modelos: Modelo[];
}

export interface Modelo {
    modelo:         string;
    img:            string[];
    especificacion: string;
    precio:         number;
    cantidad:       number;
}

export class bucles {
    constructor(public modelo:string, public especificacion:string,public precio:number, public cantidad:number){}
}