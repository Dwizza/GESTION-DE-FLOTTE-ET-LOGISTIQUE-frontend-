import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterClientComponent } from './features/auth/register-client/register-client.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register-client', component: RegisterClientComponent },

    // Protected Dashboards inside Main Layout
    {
        path: '',
        loadComponent: () => import('./shared/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: 'admin',
                loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
                canActivate: [roleGuard],
                data: { expectedRoles: ['ADMIN'] }
            },
            {
                path: 'manager',
                loadComponent: () => import('./features/manager/manager-dashboard/manager-dashboard.component').then(m => m.ManagerDashboardComponent),
                canActivate: [roleGuard],
                data: { expectedRoles: ['MANAGER'] }
            },
            {
                path: 'client',
                loadComponent: () => import('./features/client/client-dashboard/client-dashboard.component').then(m => m.ClientDashboardComponent),
                canActivate: [roleGuard],
                data: { expectedRoles: ['CLIENT'] }
            }
        ]
    },

    // Catch all route
    { path: '**', redirectTo: 'auth/login' }
];
