import { Component, OnInit } from '@angular/core';
import {IniciarSesionService} from "../../services/iniciar-sesion.service"
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  constructor(private IniciarSesionService: IniciarSesionService, private router: Router) { }
  user = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
  }
login() {
    //console.log('user:', this.user);
    this.IniciarSesionService.loginUser(this.user).subscribe(
      (res) => {
        if (res.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Bienvenido!',
            showConfirmButton: false,
            timer: 3000,
          });
          localStorage.setItem('token', res.success);
          this.router.navigate(['/listar-productos']);
        }
      },
      (err) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        localStorage.setItem('token', err.err);
        this.router.navigate(['/listar-productos']);

      }
       
      
    );
  }
}
