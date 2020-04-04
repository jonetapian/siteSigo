import { Produto } from 'src/app/produtos/model/produtoModel';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-component',
  templateUrl: './show-component.component.html',
  styleUrls: ['./show-component.component.css']
})
export class ShowComponentComponent implements OnInit {

  @Input() produto:Produto;

  constructor() { }

  ngOnInit() {
  }

}
