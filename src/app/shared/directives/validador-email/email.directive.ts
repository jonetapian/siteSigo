import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let email_str = String(control.value);
    if(email_str.indexOf(" ") !== -1){
      return {'emailValidator' : {value : control.value}}
    }
    let arroba_index = email_str.indexOf("@");
    if(arroba_index == -1){
      return {'emailValidator' : {value : control.value}}
    }
    if(email_str.substring(arroba_index).length == 0 ){
      return {'emailValidator' : {value : control.value}}
    }
    if(email_str.substring(0 , arroba_index).length == 0 ){
      return {'emailValidator' : {value : control.value}}
    }
    if(email_str.substring(arroba_index).indexOf(".") == -1){
      return {'emailValidator' : {value : control.value}}
    }

    return  null;
  };
}
