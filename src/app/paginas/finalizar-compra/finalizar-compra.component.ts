import { Component, OnInit, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {
  
  encapsulation: ViewEncapsulation.None

  constructor() { }

  ngOnInit() {

    

  }

  bola = false;

  MercadoPago(){
    /*let mercadopago = require('mercadopago');

    mercadopago.configure({
      access_token: 'PROD_ACCESS_TOKEN'
    });
    
    // Cria um objeto de preferência
    let preference = {
      items: [
        {
          title: 'Meu produto',
          unit_price: 100,
          quantity: 1,
        }
      ]
    };
    
    mercadopago.preferences.create(preference)
    .then(function(response){
    // Este valor substituirá a string "$$init_point$$" no seu HTML
    //  global.init_point = response.body.init_point;
    }).catch(function(error){
      console.log(error);
    });*/
  }

  buscarCep(){
    
    //let correios = new Correios();

    /*correios.consultaCEP({ cep: '08226022' })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });*/
  }
  

}
