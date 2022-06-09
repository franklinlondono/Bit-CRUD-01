import { Component, OnInit } from '@angular/core';
import {ResgistrarseService} from "../../services/resgistrarse.service"
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  

  constructor(
    private registrarseService: ResgistrarseService,
    private router: Router,
    
  ) { }
  user = {
    name: '',
    email: '',
    password: '',
  };
  ngOnInit(): void {
  }
  register() {
    //console.log('user:', this.user);
    this.registrarseService.createUser(this.user).subscribe(
      (res: any) => {
        if (res.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro Exitoso',
            showConfirmButton: false,
            timer: 3000
          })
          this.router.navigate(['IniciarSesion']);
        }
      },
      (err: any) => {
        console.log('err:', err);
      }
    );
  }
}

