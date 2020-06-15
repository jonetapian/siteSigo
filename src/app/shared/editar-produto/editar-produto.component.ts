import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { SizedProduct } from './../../produtos/model/sizedProduct';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ErrorHandler } from './../../shared/error-handler/error_handler';
import { Tag } from './../../paginas/tags/model/tag_model';
import { ProdutosDataService } from "./../../produtos/service/produtos-data.service";
import { Produto } from "./../../produtos/model/produtoModel";
import { ProdutosService } from "./../../produtos/service/produtos.service";
import { TagService } from "./../../paginas/tags/service/tag.service";
import { Component, OnInit } from "@angular/core";
import {
  AngularFireStorageModule,
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { error } from 'protractor';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  
  key: string = "";
  url: any;
  product_key:string;
  produto: SizedProduct = new SizedProduct();
  delete_icon = faTimesCircle;

  constructor(
    private produtoService: ProdutosService,
    private produtoDataService: ProdutosDataService,
    private storage: AngularFireStorage,
    private tags_service: TagService,
    private active_route:ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.getAllTags();
    this.active_route.params.subscribe((params:Params) =>{
      this.product_key = params['key'];
    });

    this.getProduct();

    this.produtoDataService.currentProdutos.subscribe(data => {
      if (data.produtos && data.key) {
        
        this.produto.nome = data.produtos.nome;
        this.key = data.key;
      }
    })
  }

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

  receberUrl(url) {
    if(this.produto.foto){
      this.produto.foto.push(url);
    }else{
      this.produto.foto = [url];
    }
  }

  onSubmit() {
    if (this.produto.key) {
      this.produtoService.alterar(this.produto, this.produto.key);
      this.sendTagsToDb(this.produto.key);
      alert("Seu produto foi alterado com sucesso");
      this.route.navigate(["/"]);
    } else {
      
    }
  }

  excluir(){
    this.produtoService.deletar(this.produto);
  }

  getProduct(){
    this.produtoService.buscarPorid(this.product_key).then(res =>{
      this.produto.fromJson(res);
      console.log(this.produto);

    });
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
    console.log(marca_tag.produtos);
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

  fotoRemovida(index, url, produto){
    this.produto.foto.splice(index,1);
    this.produtoService.deletarFoto(url, produto.key, produto);
  }

  removerItem(tipo, i){
    tipo.splice(i,1);
  }

  tipo = ["Camiseta", "Shorts", "Tênis"];

  categoria = ["Masculino", "Feminino"];

  cor = ["azul", "branco"];


}
