/**
 * @fileoverview template driven approach in handling form
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  @ViewChild('signupForm', { static: true }) signupForm?: NgForm;
  defaultQuestion: string = 'teacher';
  answer: string = '';
  cities: string[] = ['San Francisco', 'San Jose', 'Sunnyvale'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    city: '',
  };
  submitted: boolean = false;

  constructor() { }

  public ngOnInit(): void {
  }

  /**
   * form passed into onSubmit as parameter through local reference
   * <form (ngSubmit)="onSubmmit(form)" #form="ngForm">
   */
  public onSubmmit(form: NgForm): void {
    console.log(form);
  }

  /**
   * form with view child to access the form template
   * <form (ngSubmit)="onSubmitWithViewChild()" #signupForm="ngForm">
   * note that #signupForm must be assigned to "ngForm" for view child to work
   */
  public onSubmitWithViewChild(): void {
    console.log('using view child', this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm?.value.userData.username;
    this.user.email = this.signupForm?.value.userData.email;
    this.user.secretQuestion = this.signupForm?.value.secret;
    this.user.answer = this.signupForm?.value.questionAnswer;
    this.user.city = this.signupForm?.value.city;
    // clear (reset) inputs inside the form
    this.signupForm?.reset();
  }

  /**
   * form with view child to access the form template
   */
  public suggestUserName(): void {
    const suggestedMame = 'Superuser';
    this.signupForm?.setValue({
      userData: {
        username: suggestedMame,
        email: 'user@seethisemail.com'
      },
      secret: 'pet',
      questionAnswer: 'set by form set value',
      city: 'San Francisco'
    });
  }

  /**
   * form with view child to access the form template
   */
  public suggestUserNameUsingForm(): void {
    const suggestedMame = 'SuperForm';
    // set some parts of form
    this.signupForm?.form.patchValue({
      userData: {
        username: suggestedMame,
      }
    });
  }

}
