import {AbstractControl, ValidatorFn} from "@angular/forms";

export function dateLimitValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    console.log(control.value);
    let exceeded = false;
    let currentDate = new Date();

    if (control.value <= minDate || control.value >= currentDate) {
      exceeded = true;
    } else {
      exceeded = false;
    }

    return exceeded ? {'dateLimit': {value: control.value}}: null;
  };
}
