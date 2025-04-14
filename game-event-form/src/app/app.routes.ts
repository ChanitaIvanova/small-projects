import { Routes } from '@angular/router';
import { SignUp } from '../components/signUp/signUp.component';
import { GameForm } from '../components/gameForm/gameForm.component';
import { Login } from '../components/logIn/login.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'sign-up', component: SignUp },
    { path: 'new-game', component: GameForm, canActivate: [AuthGuard] },
];
