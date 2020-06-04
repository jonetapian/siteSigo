import { Produto } from 'src/app/produtos/model/produtoModel';
import { Router } from '@angular/router';
import { PesquisarService } from './service/pesquisar.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { url } from 'inspector';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  produtos: Produto[];
  startAt = "";
  endAt = "Yezzy";
  nomes: string[] = [];
  myControl = new FormControl();
  filtrarNomes: Observable<string[]>;
  

  constructor(private pesquisarService: PesquisarService, private route: Router) { }
  

  ngOnInit() {
    console.log(this.startAt)

    this.pesquisarService.getProdutos(this.startAt).subscribe(produtos => {
      this.produtos = produtos;
      for(let produto of produtos){
        
        this.nomes.push(produto.nome);
      }
      
    })

    this.filtrarNomes = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filtrar(value))
      );
  }

  private filtrar(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nomes.filter(nomeProduto => nomeProduto.toLowerCase().includes(filterValue));
  }

  selecionarProduto(nomeProduto){
    for(let produto of this.produtos){
      if(nomeProduto == produto.nome){
        this.route.navigate(["ver-produto" , produto.key]);
        
      }
    }
    
  }

  foto(nomeProduto){
    for(let produto of this.produtos){
      if(nomeProduto == produto.nome){
        return produto.foto[0];
      }
    }
    
  }

}
