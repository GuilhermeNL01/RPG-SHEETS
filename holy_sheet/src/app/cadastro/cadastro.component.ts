// src/app/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../data/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome_usuario: ['', Validators.required],
      senha_usuario: ['', Validators.required],
      email_usuario: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const { nome_usuario, senha_usuario, email_usuario } = this.registerForm.value;
      this.authService.register(nome_usuario, senha_usuario, { email_usuario }).subscribe({
        next:() => this.router.navigate(['login']),
        error:error => console.error('Erro no registro', error)
    });
    }
  }
}

