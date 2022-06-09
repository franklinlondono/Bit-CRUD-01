import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {
   
  titulo= 'Crear Producto';
  id: string | null;

  productoForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService, 
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute
    
    ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ["", Validators.required],
      precio: ["", Validators.required],
      stock: ["", Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarProducto(){
    //console.log(this.productoForm)
    const PRODUCTO: Producto ={
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
      stock: this.productoForm.get('stock')?.value,
    }
    if(this.id !== null){
      //editar producto
     
    this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Producto Actualizado Con Exito!',
          showConfirmButton: false,
          timer: 3000,
        });
  
      } 
      this.toastr.info('Producto Actualizado Con Exito!', 'Producto Actualizado!');
      
        this.router.navigate(['/listar-productos']);
    },error =>{
      console.error(error);
      this.productoForm.reset();}
    )

    } else{//agregar producto
      //console.log(PRODUCTO);
      
     
    
      
      this._productoService.guardarProducto(PRODUCTO).subscribe ( res =>{
        
        
       
          if(res.success){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Producto Registrado Con Exito!',
              showConfirmButton: false,
              timer: 3000,
            });
  
          }
  
        this.toastr.success('Producto Registrado Con Exito!', 'Producto Registrado!');
      
        this.router.navigate(['/listar-productos']);
      }, error =>{
        console.error(error);
        this.productoForm.reset();
      }
      )
  
    }
    }  
    
esEditar(){
  if(this.id !== null){
    this.titulo = 'Editar Producto';
    this._productoService.obtenerProducto(this.id).subscribe(data =>{
      this.productoForm.setValue({
       producto: data.nombre,
       categoria: data.categoria,
       precio: data.precio,
       stock: data.stock,
      })
    })
  }

}
}
