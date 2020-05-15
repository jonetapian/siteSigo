import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagSeguroService {

  constructor(private http_service:HttpClient) { }

  GetAuthToken(email,token){
    const headers = new HttpHeaders().append('Content-type', 'application/x-www-form-urlencoded');
    this.http_service.post('https://cors-anywhere.herokuapp.com/https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email='+ email + '&token=' + token, token, {headers: headers}).subscribe(dados => {
       console.log(dados)
       }, err =>{ console.log(err); });
  }
}
