import { ErrorHandler } from './../../shared/error-handler/error_handler';
import { Tag } from "./../tags/model/tag_model";
import { ProdutosDataService } from "./../../produtos/service/produtos-data.service";
import { Produto } from "./../../produtos/model/produtoModel";
import { ProdutosService } from "./../../produtos/service/produtos.service";
import { TagService } from "./../tags/service/tag.service";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  AngularFireStorageModule,
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { error } from 'protractor';

@Component({
  selector: "adicionar-produto",
  templateUrl: "./adicionar-produto.component.html",
  styleUrls: ["./adicionar-produto.component.css"]
})
export class AdicionarProdutoComponent implements OnInit {
  isHovering: boolean;
  files: File[] = [];
  tags: any;

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

<<<<<<< HEAD
  
  onDrop(files: FileList){
    for(let i = 0; i < files.length; i++){
=======
  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
>>>>>>> 08b934070ba324b212c9517e3503ec2673e85198
      this.files.push(files.item(i));
    }
  }

  produto: Produto = new Produto();
  key: string = "";
  url: any;
<<<<<<< HEAD
  separadorUrl:string = "";
  
=======
>>>>>>> 08b934070ba324b212c9517e3503ec2673e85198

  constructor(
    private produtoService: ProdutosService,
    private produtoDataService: ProdutosDataService,
    private storage: AngularFireStorage,
    private tags_service: TagService
  ) {}

  ngOnInit() {
    this.getAllTags();
  }

<<<<<<< HEAD
  receberUrl(url){

    if(this.separadorUrl != ""){
      this.separadorUrl += "|" + url;
    }else{
      this.separadorUrl = url;
    }
    

    this.produtos.foto = this.separadorUrl.split("|");
    
=======
  receberUrl(url) {
    this.produto.foto = url;
>>>>>>> 08b934070ba324b212c9517e3503ec2673e85198
  }

  onSubmit() {
    if (this.key) {
    } else {
      this.produtoService.adicionar(this.produto).then(product =>{
        this.produto.key = product.key;
        console.log(product);
        this.sendTagsToDb(product.key);
        alert("Seu produto foi adicionado com sucesso")
        this.produto = new Produto();
        this.files = [];
      });
    }


  }
  getAllTags() {
    this.tags_service.getAllTags().then(tags => {
      console.log(tags);
      this.tags = tags;
    });
  }
  addColor(value?) {
    console.log(value);
    if (!this.checkIfExist(value, this.produto.cor)) {
      this.produto.cor.push(value);
    }
  }
  addTamanho(value?) {
    if (!this.checkIfExist(value, this.produto.tamanho)) {
      this.produto.tamanho.push(value);
    }
  }
  addTipo(value?) {
    if (!this.checkIfExist(value, this.produto.tipo)) {
      this.produto.tipo.push(value);
    }
  }
  checkIfExist(value_to_check, array) {
    for (let item of array) {
      if (value_to_check === item) {
        return true;
      }
    }
    return false;
  }
  sendTagsToDb(produto_key) {
    let marca_tag = new Tag();
    marca_tag.nome = this.produto.marca;
    marca_tag.tipo = "marca";
    this.tags_service.createTaggedProduct(marca_tag,produto_key).catch(error =>{
      console.log(error);
      error? ErrorHandler.organizaErro(error):null;
    }).then(res =>{
      console.log(res);
    });
    for (let color of this.produto.cor) {
      let color_tag = new Tag();
      color_tag.nome = color;
      color_tag.tipo = "cor";
      this.tags_service.createTaggedProduct(color_tag,produto_key).catch(error =>{
        console.log(error);
        error? ErrorHandler.organizaErro(error):null;
      }).then(res =>{
        console.log(res);
      });
    }

    for(let tamanho of this.produto.tamanho){
      let tamanho_tag = new Tag();
      tamanho_tag.nome = tamanho;
      tamanho_tag.tipo = "tamanho";
      this.tags_service.createTaggedProduct(tamanho_tag,produto_key).catch(error =>{
        console.log(error);
        error? ErrorHandler.organizaErro(error):null;
      }).then(res =>{
        console.log(res);
      });
    }
    for(let tipo of this.produto.tipo){
      let tipo_tag = new Tag();
      tipo_tag.nome = tipo;
      tipo_tag.tipo = "tipo";
      this.tags_service.createTaggedProduct(tipo_tag,produto_key).catch(error =>{
        console.log(error);
        error? ErrorHandler.organizaErro(error):null;
      }).then(res =>{
        console.log(res);
      });
    }
  }

  tipo = ["Camiseta", "Shorts", "Tênis"];

  categoria = ["Masculino", "Feminino"];

  cor = ["azul", "branco"];
}
