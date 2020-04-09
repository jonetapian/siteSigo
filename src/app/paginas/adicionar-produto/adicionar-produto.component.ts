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


  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
    console.log(this.files);
  }

  produto: Produto = new Produto();
  key: string = "";
  url: any;


  constructor(
    private produtoService: ProdutosService,
    private produtoDataService: ProdutosDataService,
    private storage: AngularFireStorage,
    private tags_service: TagService
  ) {}

  ngOnInit() {
    this.getAllTags();
  }

  receberUrl(url) {
    this.produto.foto.push(url);
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
    if (!this.checkIfExist(value, this.produto.cor) && value !== "default") {
      this.produto.cor.push(value);
    }
  }
  addTamanho(value?) {
    if (!this.checkIfExist(value, this.produto.tamanho) && value !== "default") {
      this.produto.tamanho.push(value);
    }
  }
  addTipo(value?) {
    if (!this.checkIfExist(value, this.produto.tipo) && value !== "default") {
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
    if(this.tags.marca[this.produto.marca].produtos){
      marca_tag.produtos = this.tags.marca[this.produto.marca].produtos;
    }
    marca_tag.produtos.push(produto_key);
    this.tags_service.createTaggedProduct(marca_tag).catch(error =>{
      console.log(error);
      error? ErrorHandler.organizaErro(error):null;
    }).then(res =>{
      console.log(res);
    });

    for (let color of this.produto.cor) {
      let color_tag = new Tag();
      color_tag.nome = color;
      color_tag.tipo = "cor";
      if(this.tags.cor[color].produtos){
        color_tag.produtos = this.tags.cor[color].produtos;
      }
      color_tag.produtos.push(produto_key);
      this.tags_service.createTaggedProduct(color_tag).catch(error =>{
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
      if(this.tags.tamanho[tamanho].produtos){
        tamanho_tag.produtos = this.tags.tamanho[tamanho].produtos;
      }
      tamanho_tag.produtos.push(produto_key);
      this.tags_service.createTaggedProduct(tamanho_tag).catch(error =>{
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
      if(this.tags.tipo[tipo].produtos){
        tipo_tag.produtos = this.tags.tipo[tipo].produtos;

      }
      tipo_tag.produtos.push(produto_key);
      this.tags_service.createTaggedProduct(tipo_tag).catch(error =>{
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
