import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {

  password = '';
  username = '';
  constructor(
    public authService: AuthService, 
    public router: Router,
    // private nzService: NzMessageService
    ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: result => {
        localStorage.setItem('access_info', JSON.stringify(result));
        if(result) {
          localStorage.setItem('jwt_sart', JSON.stringify(result));
          this.router.navigate(['/admin']);
        }
      }, error: e => {

      } 
    });
  }
}
