import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';



@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {


  productoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private toastr: ToastrService) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ["", Validators.required],
      precio: ["", Validators.required],
      stock: ["", Validators.required],

    })
   }

  ngOnInit(): void {
  }
  agregarProducto(){
    //console.log(this.productoForm)
    const PRODUCTO: Producto ={
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
      stock: this.productoForm.get('stock')?.value,
    }
    console.log(PRODUCTO);
    
    this.toastr.success('Producto Registrado Con Exito!', 'Producto Registrado!');
    
    this.router.navigate(['/listar-productos']);
  }

}
