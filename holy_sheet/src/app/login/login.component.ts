import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../data/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nome_usuario: ['', Validators.required],
      senha_usuario: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { nome_usuario, senha_usuario } = this.loginForm.value;
      this.authService.login(nome_usuario, senha_usuario).subscribe({
        next:(response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log('Login error', error);
        }
    });
    }
  }
}
