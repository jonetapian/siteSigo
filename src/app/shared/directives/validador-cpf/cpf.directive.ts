import { ValidatorFn, AbstractControl } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
      let forbidden = false;

      let Soma;
      let Resto;
      let strCPF =  String(control.value);
      Soma = 0;
      if (strCPF == "00000000000"){
        forbidden = true;
      }
      for (let i = 1; i <= 9; i++){
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      }
      Resto = (Soma * 10) % 11;
      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))){
        forbidden = true;
      }
      Soma = 0;
      for (let i = 1; i <= 10; i++){
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      }
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))){
        forbidden = true;
      }
    return forbidden ? {'cpfValidator': {value: control.value}} : null;
  };
}
