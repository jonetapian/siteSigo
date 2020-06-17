import { environment } from './../../../../environments/environment';
import { Vendedor } from './../models/vendedor-model';
import { Compra } from './../models/compra-model';
import { Produto } from './../../../produtos/model/produtoModel';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SizedProduct } from 'src/app/produtos/model/sizedProduct';

@Injectable({
  providedIn: 'root'
})
export class PagSeguroService {

  constructor(private http_service:HttpClient) { }

  GetAuthToken(email,token,compra:Compra, produtos:Array<SizedProduct>){
    let body = new HttpParams();
    let params = {
      'currency' : 'BRL',
      'receiverEmail' :'victorhenriquediniz@gmail.com',
      'reference' : compra.ref,
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
    for(let produto of produtos){
      params['itemId' + item_counter] =  produto.key;
      params['itemDescription' + item_counter] = produto.nome;
      params['itemAmount' + item_counter] = String(Number(produto.preco).toFixed(2));
      params['itemQuantity' + item_counter ] = String(produto.quantidadeCarrinho) ;
      params['itemWeight' + item_counter] = String(200) ;

      item_counter += 1;
    }

    const headers = new HttpHeaders().append('Content-type','application/x-www-form-urlencoded ;charset=UTF-8' );
    const params_final = new HttpParams({fromObject: params})
    return this.http_service.post( environment.cors + environment.sandbox.auth + `email=${email}&token=${token}`,params_final, {headers: headers, responseType: 'text'}).pipe(
      map(val => {
        return val;
      })

    );
    }
  SendChckoutCode(code){
    const headers = new HttpHeaders().append('Content-type','application/x-www-form-urlencoded ;charset=UTF-8' );
    return this.http_service.get(environment.cors + environment.sandbox.send_code + `code=${code}`, {headers: headers, responseType: 'text'}).pipe(
      map(val => {
        return val;
      })

    );

  }

}
