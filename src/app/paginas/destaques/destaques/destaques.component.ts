import { DestaquesService } from './../service/destaques.service';
import { ProdutosService } from './../../../produtos/service/produtos.service';
import { Produto } from 'src/app/produtos/model/produtoModel';
import { Component, OnInit } from '@angular/core';
import { Destaques } from '../model/destaques_model';
import { faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})
export class DestaquesComponent implements OnInit {

  constructor(private produto_servie:ProdutosService,private destaques_service:DestaquesService) { }
  produtos:Array<Produto> = new Array<Produto>();
  produtos_editados:Array<Produto> = new Array<Produto>();
  destaques:Array<string> = new Array<string>();
  produtos_em_destaque:Array<Produto> = new Array<Produto>();
  delete_icon = faTrashAlt;
  save_icon = faSave;
  ngOnInit() {
    this.getDestaques();
    this.getProducts();
  }
  getProducts(){
    this.produto_servie.buscar().subscribe((res:any) =>{
      this.produtos = res;
      this.getDestaquesProducts();
    });
  }
  getDestaques(){
    this.destaques_service.getDestaques().then((res:any) =>{
      this.destaques = res;
    });
  }
  getDestaquesProducts(reset?){
    reset? this.produtos_em_destaque = [] : null;
    if(this.destaques){
      for(let key of this.destaques){
        for(let product of this.produtos){
          if(key === product.key){
            this.produtos_em_destaque.push(product);
          }
        }
      }
    }

  }
  getKey(index){
    if(this.destaques){
      let check_index = this.destaques.indexOf(this.produtos[index].key);
      if(check_index === -1){
     //   this.produtos.push(this.p
        this.destaques.push(this.produtos[index].key);
      }else{
        this.destaques.splice(check_index,1);
      }
    }else{
      this.destaques = new Array();
      this.destaques.push(this.produtos[index].key);
    }

  }
  isChecked(key){
    if(this.destaques){
      let check_index = this.destaques.indexOf(key);
      if(check_index !== -1){
        return true;

      }else{
        return false;
      }
    }else{

    }


  }
  createDestaques(){
    this.destaques_service.createDestaques(this.destaques).then(val =>{
      alert("Salvo com sucesso");
      this.getDestaquesProducts(true);
    });
  }
  deleteDestaques(){
    this.destaques_service.deleteDestaques().then(val =>{
      alert("Deletado com sucesso");
      this.getDestaquesProducts(true);
    });
  }
}
