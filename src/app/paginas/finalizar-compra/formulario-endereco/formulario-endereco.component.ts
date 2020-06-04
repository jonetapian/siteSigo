import { CepService } from './../services/cep.service';
import { Frete } from './../models/frete-model';
import { Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { cpfValidator } from 'src/app/shared/directives/validador-cpf/cpf.directive';
@Component({
  selector: 'app-formulario-endereco',
  templateUrl: './formulario-endereco.component.html',
  styleUrls: ['./formulario-endereco.component.css']
})
export class FormularioEnderecoComponent implements OnInit {
  @Output() goToNextStep = new EventEmitter();
  frete:Frete;
  enderecoForm = new FormGroup({
    cep: new FormControl("", [
      Validators.required,
    ]),
    rua: new FormControl('',[
      Validators.required,
    ]),
    cidade: new FormControl('',[
      Validators.required,
    ]),
    estado :new FormControl('',[
      Validators.required,
    ]),
    bairro :new FormControl('',[
      Validators.required,
    ]),
    numero :new FormControl('',[
      Validators.required,
    ]),
    complemento :new FormControl('')

  });
  constructor(private cep_service:CepService) { }

  ngOnInit() {
  }
  get cep() { return this.enderecoForm.get('cep'); }
  get rua() { return this.enderecoForm.get('rua'); }
  get cidade() { return this.enderecoForm.get('cidade'); }
  get estado() { return this.enderecoForm.get('estado'); }
  get bairro() { return this.enderecoForm.get('estado'); }
  get numero() { return this.enderecoForm.get('estado'); }
  get complemento() { return this.enderecoForm.get('estado'); }




  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.goToNextStep.emit(this.enderecoForm.value);
  }

  buscarCEP(cep) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.cep_service.GetCep(cep).subscribe(dados =>{
          this.populaDadosForm(dados);
        });
      }
    }
  }

  populaDadosForm(dados) {
    this.enderecoForm.setValue(
      {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        numero: '',
      }
    );
  }
}
