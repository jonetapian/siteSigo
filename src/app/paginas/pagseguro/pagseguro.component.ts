import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagseguro',
  templateUrl: './pagseguro.component.html',
  styleUrls: ['./pagseguro.component.css']
})
export class PagseguroComponent implements OnInit {

  constructor(private http: HttpClient) { }

  email = "leo.vasconcelos2000@gmail.com";
  token = "47594107-4f78-4951-b700-e4537eb954546b15e9e14a6cb61b008a232b6e1c81a2f3bb-5533-4fd9-994c-e2d83eae41b6";
  /*body = [
    "email=leo.vasconcelos2000@gmail.com",
    "token=f2871e64-5eab-4f8e-aeb5-f80c30db0d8817f7e7b7480f81818aeeddda692109a6c664-0f98-4275-a513-c089d1011a43",
    "currency=BRL",
    "itemId1=001",
    "itemDescription=item",
    "itemAmount1=169",
    "itemQuantity1=1",
    "itemWeight1=2",
    "shippingAddressRequired=true"
  ];*/

  ngOnInit() {
    this.checkout();
  }

  checkout(){
    const headers = new HttpHeaders().append('Content-type', 'application/x-www-form-urlencoded');
    this.http.post(``, {headers: headers}).subscribe(dados => {
    }, err =>{
      console.log(err);
    });
  }

}
