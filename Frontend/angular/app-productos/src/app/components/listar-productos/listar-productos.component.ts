import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(private _productoService: ProductoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }
obtenerProductos(){
  this._productoService.getProductos().subscribe(data =>{
    console.log(data);
    this.listProductos = data;
  }, error =>{
    console.log(error)
  }
  )
}

eliminarProducto(_id: any){
  this._productoService.eliminarProducto(_id).subscribe(data =>{
    {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Producto Eliminado Con Exito!',
        showConfirmButton: false,
        timer: 3000,
      });

    } 
 this.toastr.error('El Producto Fue Eliminado','¡Producto Eliminado!');
 this.obtenerProductos();
  }, error =>{
    console.log(error)} )
  
}
}
