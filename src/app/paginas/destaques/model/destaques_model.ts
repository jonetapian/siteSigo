import { Produto } from 'src/app/produtos/model/produtoModel';

export class Destaques {
  product_keys:Array<string> = new Array<string>();
  constructor(data?){
    if(data){
      this.fromJson(data);
    }
  }
  fromJson(data){
    this.product_keys = data.product_keys;
  }
}
