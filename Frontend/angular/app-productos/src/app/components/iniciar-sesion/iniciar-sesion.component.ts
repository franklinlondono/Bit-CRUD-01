import { Component, OnInit } from '@angular/core';
import {IniciarSesionService} from "../../services/iniciar-sesion.service"
import { Router } from '@angular/router';

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
          localStorage.setItem('token', res.success);
          this.router.navigate(['/listar-productos']);
        }
      },
      (err) => console.log('err:', err)
    );
  }
}
