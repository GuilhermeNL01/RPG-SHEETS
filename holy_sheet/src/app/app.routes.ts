import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { CriadorComponent } from './criador/criador.component';
import { ListaFichasComponent } from './lista-fichas/lista-fichas.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'criador', component: CriadorComponent},
  {path: 'listafichas', component: ListaFichasComponent}
];
