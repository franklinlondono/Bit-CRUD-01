import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivateComponent } from './components/private/private.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { CrearProductosComponent } from './components/crear-productos/crear-productos.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateComponent,
    RegistrarseComponent,
    IniciarSesionComponent,
    PageNotFoundComponent,
    CrearProductosComponent,
    ListarProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'Home', component: HomeComponent },
      { path: 'Private', component: ListarProductosComponent },
      { path: 'Registrarse', component: RegistrarseComponent },
      { path: 'IniciarSesion', component: IniciarSesionComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
  ]),
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  CommonModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot(),
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
