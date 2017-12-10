import {AbstractControl, ValidatorFn} from "@angular/forms";

export function dateLimitValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let exceeded = false;
    let currentDate = new Date();

    console.log(minDate);

    if (control.value <= minDate || control.value >= currentDate) {
      exceeded = true;
    } else {
      exceeded = false;
    }

    return exceeded ? {'dateLimit': {value: control.value}}: null;
  };
}
