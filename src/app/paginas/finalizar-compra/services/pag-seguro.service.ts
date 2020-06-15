import { Vendedor } from './../models/vendedor-model';
import { Compra } from './../models/compra-model';
import { Produto } from './../../../produtos/model/produtoModel';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagSeguroService {

  constructor(private http_service:HttpClient) { }

  GetAuthToken(email,token,compra:Compra, vendedor:Vendedor){
    let body = new HttpParams();
    let params = {
      'currency' : 'BRL',
      'receiverEmail' :'victorhenriquediniz@gmail.com',
      'reference' : 'reff',
      'redirectURL' : 'https://sigo-ffd8c.web.app/',
      'senderName' : compra.comprador.nome,
      'senderCPF' : compra.comprador.cpf.toString(),
      'senderAreaCode' : String(compra.comprador.telefone).substring(0,2),
      'senderPhone': String(compra.comprador.telefone).substring(2),
      'senderEmail': compra.comprador.email,
      'shippingAddressRequired': 'true',
      'shippingAddressStreet': compra.frete.rua,
      'shippingAddressNumber': String(compra.frete.numero),
      'shippingAddressComplement' : compra.frete.complemento,
      'shippingAddressDistrict': compra.frete.bairro,
      'shippingAddressPostalCode': String(compra.frete.cep),
      'shippingAddressCity': compra.frete.cidade,
      'shippingAddressState': compra.frete.estado,
      'shippingAddressCountry': 'BRA',
      'shippingType' : '1',
      'timeout' : '30',
      'maxUses' : '2',
      'maxAge': '300'

    }
    // body.set('receiverEmail', 'victorhenriquediniz@gmail.com');
    // body.set('currency', 'BRL');
    let item_counter = 1;
    for(let produto of compra.produtos){
      params['itemId' + item_counter] =  produto.key;
      params['itemDescription' + item_counter] = produto.nome;
      params['itemAmount' + item_counter] = String(produto.preco);
      params['itemQuantity' + item_counter ] = String(produto.quantidadeCarrinho) ;
      params['itemWeight' + item_counter] = String(200) ;

      item_counter += 1;
    }
    // body.set('reference' , 'reff');
    // body.set('redirectURL' , 'http://localhost:4200/');
    // body.set('senderName' , compra.comprador.nome);
    // body.set('senderCPF' , String(compra.comprador.cpf));
    // body.set('senderAreaCode' , String(compra.comprador.telefone).substring(0,2));
    // body.set('senderPhone',String(compra.comprador.telefone).substring(2));
    // body.set('senderEmail', compra.comprador.email);
    // body.set('senderHash' , compra.comprador.hash);
    // body.set('shippingAddressRequired', 'true');
    // body.set('shippingAddressStreet', compra.frete.rua);
    // body.set('shippingAddressNumber', String(compra.frete.numero));
    // body.set('shippingAddressComplement' , compra.frete.complemento);
    // body.set('shippingAddressDistrict', compra.frete.bairro);
    // body.set('shippingAddressPostalCode', String(compra.frete.cep));
    // body.set('shippingAddressCity', compra.frete.cidade);
    // body.set('shippingAddressState', compra.frete.estado);
    // body.set('shippingAddressCountry', 'BRA');
    // body.set('shippingType' ,'1');
    // body.set('timeout' ,'30');
    // body.set('maxUses' , '2');
    // body.set('maxAge', '300');
    // body.set('shippingCost=1.00
    // body.set('creditCardToken', compra.cartao.token);
    // body.set('installmentQuantity', String(compra.parcela.quantidade));
    // body.set('installmentValue', String(compra.parcela.valor));
    // // body.set('noInterestInstallmentQuantity={valor_maxInstallmentNoInterest_incluido_no_passo_2.5}
    // body.set('creditCardHolderName' , compra.cartao.nome);
    // body.set('creditCardHolderCPF' , String(compra.cartao.cpf));
    // body.set('creditCardHolderBirthDate' , compra.cartao.aniversario );
    // body.set('creditCardHolderAreaCode' , String(compra.cartao.telefone).substring(0,2));
    // body.set('creditCardHolderPhone' , String(compra.cartao.telefone));
    // body.set('billingAddressStreet' , compra.frete.rua);
    // body.set('billingAddressNumber' , String(compra.frete.numero));
    // body.set('billingAddressComplement' , compra.frete.complemento);
    // body.set('billingAddressDistrict', compra.frete.bairro);
    // body.set('billingAddressPostalCode', String(compra.frete.cep));
    // body.set('billingAddressCity' , compra.frete.cidade);
    // body.set('billingAddressState' , compra.frete.estado);
    // body.set('billingAddressCountry', 'BRA');
    console.log(body);
    const headers = new HttpHeaders().append('Content-type','application/x-www-form-urlencoded' );
    const params_final = new HttpParams({fromObject: params})
    return this.http_service.post(`https://cors-anywhere.herokuapp.com/https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=${email}&token=${token}`,params_final, {headers: headers, responseType: 'text'}).pipe(
      map(val => {
        return val;
      })

    );
    }
  SendChckoutCode(code){
    const headers = new HttpHeaders().append('Content-type','application/x-www-form-urlencoded' );
    return this.http_service.get(`https://cors-anywhere.herokuapp.com/https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${code}`, {headers: headers, responseType: 'text'}).pipe(
      map(val => {
        return val;
      })

    );

  }
  CreditCardCheckout(compra:Compra, vendedor:Vendedor){
    let body = new URLSearchParams();
    body.set('paymentMode' ,'default');
    body.set('paymentMethod','boleto');
    body.set('receiverEmail', 'victorhenriquediniz@gmail.com');
    body.set('currency', 'BRL');
    // body.set('extraAmount',  );
    let item_counter = 1;
    for(let produto of compra.produtos){
      body.set('itemId' + item_counter, produto.key );
      body.set('itemDescription' + item_counter, produto.nome);
      body.set('itemAmount' + item_counter, String(produto.preco));
      body.set('itemQuantity' + item_counter, String(produto.quantidadeCarrinho) );
      item_counter += 1;
    }
    //body.set('reference' , compra.key)
    body.set('senderName' , compra.comprador.nome);
    body.set('senderCPF' , String(compra.comprador.cpf));
    body.set('senderAreaCode' , String(compra.comprador.telefone).substring(0,2));
    body.set('senderPhone',String(compra.comprador.telefone).substring(2));
    body.set('senderEmail', compra.comprador.email);
   // body.set('senderHash' , compra.comprador.hash);
    body.set('shippingAddressRequired', 'true');
    body.set('shippingAddressStreet', compra.frete.rua);
    body.set('shippingAddressNumber', String(compra.frete.numero));
    body.set('shippingAddressComplement' , compra.frete.complemento);
    body.set('shippingAddressDistrict', compra.frete.bairro);
    body.set('shippingAddressPostalCode', String(compra.frete.cep));
    body.set('shippingAddressCity', compra.frete.cidade);
    body.set('shippingAddressState', compra.frete.estado);
    body.set('shippingAddressCountry', 'BRA');
    body.set('shippingType' ,'1');
    // body.set('shippingCost=1.00
    //body.set('creditCardToken', compra.cartao.token);
    //body.set('installmentQuantity', String(compra.parcela.quantidade));
    //body.set('installmentValue', String(compra.parcela.valor));
    // body.set('noInterestInstallmentQuantity={valor_maxInstallmentNoInterest_incluido_no_passo_2.5}
    //body.set('creditCardHolderName' , compra.cartao.nome);
    //body.set('creditCardHolderCPF' , String(compra.cartao.cpf));
    //body.set('creditCardHolderBirthDate' , compra.cartao.aniversario );
    //body.set('creditCardHolderAreaCode' , String(compra.cartao.telefone).substring(0,2));
    //body.set('creditCardHolderPhone' , String(compra.cartao.telefone));
    body.set('billingAddressStreet' , compra.frete.rua);
    body.set('billingAddressNumber' , String(compra.frete.numero));
    body.set('billingAddressComplement' , compra.frete.complemento);
    body.set('billingAddressDistrict', compra.frete.bairro);
    body.set('billingAddressPostalCode', String(compra.frete.cep));
    body.set('billingAddressCity' , compra.frete.cidade);
    body.set('billingAddressState' , compra.frete.estado);
    body.set('billingAddressCountry', 'BRA');
    const headers = new HttpHeaders().append('Content-type',[ 'application/x-www-form-urlencoded' , 'charset=ISO-8859-1']);
    console.log(body.toString());
    this.http_service.post('https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?', body, {headers: headers, responseType: 'text'}).pipe(
      map(val => {
        return val;
        }
      )
    );
  }


}
