import { PagSeguroService } from './services/pag-seguro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MercadoPago } from 'mercadopago';
import $ from 'jquery';

declare var  PagSeguroDirectPayment : any;

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {

  encapsulation: ViewEncapsulation.None


  constructor(private http: HttpClient, private pag_service:PagSeguroService) { }

  ngOnInit() {
    this.SendToPagSeguro();


  }

  bola = false;
  corsHeaders;

  mercadoPago(){

  }


  onSubmit(form){

  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return{
      'was-validated': this.verificaValidTouched(campo)
    }
  }

  buscarCEP(cep, form){

    console.log(cep);

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadosForm(dados, form));



      }
    }

  }



  populaDadosForm(dados, formulario){

    formulario.form.patchValue({
      rua: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }
  SendToPagSeguro(){
    console.log(PagSeguroDirectPayment)
    // PagSeguroDirectPayment.setSessionId('ID_DA_SESSÃO_OBTIDO_NO_PASSO_1');
    this.pag_service.GetAuthToken("victorhenriquediniz@gmail.com" ,"9999BE8F2BA14EDB9802AEDF83FA61F9" );

  }

}
