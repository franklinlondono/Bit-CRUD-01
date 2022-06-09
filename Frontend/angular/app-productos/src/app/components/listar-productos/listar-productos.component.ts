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
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((_id) => {
      if (_id.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  } 
  this._productoService.eliminarProducto(_id).subscribe(data =>{
    
 this.toastr.error('El Producto Fue Eliminado','¡Producto Eliminado!');
 this.obtenerProductos();
  }, error =>{
    console.log(error)} )
  
}
}
