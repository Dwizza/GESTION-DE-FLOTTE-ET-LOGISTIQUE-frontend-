import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterClientComponent } from './features/auth/register-client/register-client.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register-client', component: RegisterClientComponent },
    // Catch all route
    { path: '**', redirectTo: 'auth/login' }
];
