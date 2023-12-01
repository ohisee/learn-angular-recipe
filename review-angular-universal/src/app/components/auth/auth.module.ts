import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        // path: 'auth',
        path: '',  // use lazy loading, set to empty path
        component: AuthComponent
      }
    ]),
    SharedModule,
  ],
  exports: [RouterModule]
})
export class AuthModule { }
