import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  public onSubmit(templateDrivenForm: NgForm): void {
    if (templateDrivenForm.form.invalid) {
      return;
    }

    const enteredEmail = templateDrivenForm.form.value['email'];
    const enteredPassword = templateDrivenForm.form.value['passwordss'];

    // console.log(enteredEmail, enteredPassword);

    templateDrivenForm.form.reset();
  }
}
