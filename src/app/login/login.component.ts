import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password = '';
  username = '';
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {


  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(result => {
      if(result) {
        this.router.navigate(['/admin']);
      }
    });
  }
}
