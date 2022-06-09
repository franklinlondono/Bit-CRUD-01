import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AoutService {

  constructor() { }

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  gettoken() {
    return localStorage.getItem('token');
  }
}
