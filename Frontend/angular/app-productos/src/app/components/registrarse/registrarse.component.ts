import { Component, OnInit } from '@angular/core';
import {ResgistrarseService} from "../../services/resgistrarse.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  

  constructor(
    private registrarseService: ResgistrarseService,
    private router: Router
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
          this.router.navigate(['IniciarSesion']);
        }
      },
      (err: any) => {
        console.log('err:', err);
      }
    );
  }
}

