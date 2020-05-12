import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagseguro',
  templateUrl: './pagseguro.component.html',
  styleUrls: ['./pagseguro.component.css']
})
export class PagseguroComponent implements OnInit {

  constructor(private http: HttpClient) { }

  email = "leo.vasconcelos2000@gmail.com";
  token = "f2871e64-5eab-4f8e-aeb5-f80c30db0d8817f7e7b7480f81818aeeddda692109a6c664-0f98-4275-a513-c089d1011a43";
  body;

  ngOnInit() {
    this.checkout();
  }

  checkout(){
   return this.http.post(`https://cors-anywhere.herokuapp.com/https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${this.email}&token=${this.token}`, "").subscribe(dados => console.log(dados));
  }

}
