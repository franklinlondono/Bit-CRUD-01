export class Producto {
    _id?: number;
    nombre:string;
    categoria:string;
    stock:number;
    precio:number;


    constructor(nombre: string, categoria: string, stock:number, precio:number){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }
}