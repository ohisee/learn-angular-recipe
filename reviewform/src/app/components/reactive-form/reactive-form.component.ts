import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  readonly cities: string[] = ['San Francisco', 'San Jose', 'Sunnyvale'];

  signupForm?: FormGroup;

  forbiddenUserNames: string[] = ['Runner'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('',
          [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        'email': new FormControl('',
          [Validators.required, Validators.email], this.forbiddenEmailsAsyncValidator()),
        // or this.forbiddenEmails as AsyncValidatorFn
      }),
      'street': new FormControl('', [Validators.required]),
      'city': new FormControl('Sunnyvale'),
      'hobbies': new FormArray([]),
      'projectCity': new FormControl('sunnyvale'),
    });

    this.signupForm.valueChanges.subscribe(value => console.log(value));

    this.signupForm.statusChanges.subscribe(status => console.log(status));

    // or patchValue
    this.signupForm.setValue({
      'userData': {
        'username' : 'walker',
        'email': 'test1@test.com',
      },
      'street': '123 street',
      'city': 'Sunnyvale',
      'hobbies': [], // empty array
      'projectCity': 'sunnyvale'
    });
  }

  onSubmit(): void {
    console.log(this.signupForm);
    this.signupForm?.reset();
  }

  onClickAddHobby(): void {
    if (this.signupForm) {
      const control = new FormControl(null, Validators.required);
      (this.signupForm.get('hobbies') as FormArray).push(control);
    }
  }

  getFormArrayControls() {
    if (this.signupForm) {
      return (this.signupForm.get('hobbies') as FormArray).controls;
    }
    return [];
  }

  forbiddenNamesValidator(control: FormControl): { [key: string]: boolean } | null {
    // 'this' is undefined when called by angular to check / validate, not by 
    // this reactive-form component object  
    // to fix this error, must bind 'this', this.forbiddenNamesValidator.bind(this)
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  getErrors(): string[] {
    const errs: ValidationErrors | null | undefined = this.signupForm?.get('userData.username')?.errors;
    if (errs) {
      return Object.keys(errs);
    }
    return [];
  }

  /** include in async validator array like 'this.forbiddenEmails as AsyncValidatorFn' */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  forbiddenEmailsAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({ 'emailIsForbidden': true });
          } else {
            resolve(null);
          }
        }, 1000);
      });
      return promise;
    }
  }

  onClick(): void {
    this.signupForm?.patchValue({
      'userData': {
        'username': 'talker',
        'email': 'test123@test.com',
      },
      'street': '1234566789 main street',
      'city': 'San Jose',
      'hobbies': [], // empty array
    });
  }
}
