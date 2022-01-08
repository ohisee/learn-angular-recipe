import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  public ngOnInit(): void {
  }

  public onClick(): void {
    this.router.navigate(['/servers']);
  }

  public onClickLoadServer(id: number): void {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  public onClickToSignIn():void {
    this.authService.login();
  }

  public onClickToSignOut(): void {
    this.authService.logout();
  }

}
