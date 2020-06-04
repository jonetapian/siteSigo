import { Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { cpfValidator } from 'src/app/shared/directives/validador-cpf/cpf.directive';
import { emailValidator } from 'src/app/shared/directives/validador-email/email.directive';

@Component({
  selector: 'app-formulario-comprador',
  templateUrl: './formulario-comprador.component.html',
  styleUrls: ['./formulario-comprador.component.css']
})
export class FormularioCompradorComponent implements OnInit {

  @Output() goToNextStep = new EventEmitter();
  compradorForm = new FormGroup({
    nome: new FormControl("", [
      Validators.required,
    ]),
    email: new FormControl('',[
      Validators.required,
      emailValidator()
    ]),
    telefone: new FormControl('',[
      Validators.required,
    ]),
    cpf :new FormControl('',[
      Validators.required,
      cpfValidator()
    ])
  });
  constructor() { }

  ngOnInit() {
  }
  get nome() { return this.compradorForm.get('nome'); }
  get email() { return this.compradorForm.get('email'); }
  get telefone() { return this.compradorForm.get('telefone'); }
  get cpf() { return this.compradorForm.get('cpf'); }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.goToNextStep.emit(this.compradorForm.value);
  }

}
