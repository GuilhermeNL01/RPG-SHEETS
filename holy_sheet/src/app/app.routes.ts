// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { CriadorComponent } from './criador/criador.component';
import { ListaFichasComponent } from './lista-fichas/lista-fichas.component';
import { IsAuthGuard } from './data/auth.guard';
import { LobbyComponent } from './lobby/lobby.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FichaDetailComponent } from './ficha-detail/ficha-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'criador', component: CriadorComponent, canActivate: [IsAuthGuard] },
  { path: 'listafichas', component: ListaFichasComponent, canActivate: [IsAuthGuard] },
  { path: 'lobby', component: LobbyComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'ficha/:id_ficha', component: FichaDetailComponent},
];
