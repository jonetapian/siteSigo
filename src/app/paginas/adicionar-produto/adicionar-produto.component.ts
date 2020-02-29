import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Produtos } from './../../produtos/model/produtoModel';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { ProdutosDataService } from './../../produtos/service/produtos-data.service';
import { AngularFireStorageModule, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {

  isHovering: boolean;
  files: File[] = [];

  
  toggleHover(event: boolean){
    this.isHovering = event;
  }

  onDrop(files: FileList){
    for(let i = 0; i < files.length; i++){
      this.files.push(files.item(i));
      
    }
  }

  produtos: Produtos;
  key: string = '';
  url: any;
  

  constructor(private produtosService: ProdutosService, private ProdutosDataService: ProdutosDataService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.produtos = new Produtos();
  }

  receberUrl(url){
    this.produtos.foto = url;
  }
  
  
  onSubmit(){
    if(this.key){
      
    }else{
      this.produtosService.adicionar(this.produtos);
      
    }
    
    this.produtos = new Produtos();
    this.files = [];
  }
  

  tipo = [
    'Camiseta',
    'Shorts',
    'Tênis'
  ];

  categoria = [
    'Masculino',
    'Feminino'
  ];

  cor = [
    'azul',
    'branco'
  ]
  
}
