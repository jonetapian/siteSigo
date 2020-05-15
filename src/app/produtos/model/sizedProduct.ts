import { Produto } from './produtoModel';
export class SizedProduct extends Produto{
  selected_size:string = "";
  constructor(json?){
    super();
    json? this.fromJson(json) : null;
  }
  fromJson(json){
    json.selected_size?this.selected_size = json.selected_size : null;
    super.fromJson(json);
  }
}
