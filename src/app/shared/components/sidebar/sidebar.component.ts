import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = true;

  private authService = inject(AuthService);
  navItems: NavItem[] = [];

  ngOnInit() {
    this.setupNavItems();
  }

  private setupNavItems() {
    const role = this.authService.getUserRole();

    // Base generic items (like Dashboard overview)
    if (role === 'ADMIN') {
      this.navItems = [
        { label: 'Vue d\'ensemble', icon: 'ri-dashboard-line', route: '/admin' },
        { label: 'Managers', icon: 'ri-team-line', route: '/admin/managers' },
        { label: 'Chauffeurs', icon: 'ri-steering-2-line', route: '/admin/drivers' },
      ];
    } else if (role === 'MANAGER') {
      this.navItems = [
        { label: 'Tableau de bord', icon: 'ri-dashboard-line', route: '/manager' },
        { label: 'Camions', icon: 'ri-truck-line', route: '/manager/trucks' },
        { label: 'Remorques', icon: 'ri-truck-fill', route: '/manager/trailers' },
        { label: 'Trajets', icon: 'ri-route-line', route: '/manager/trips' },
        { label: 'Livraisons', icon: 'ri-box-3-line', route: '/manager/deliveries' }
      ];
    } else if (role === 'CLIENT') {
      this.navItems = [
        { label: 'Mon Espace', icon: 'ri-dashboard-line', route: '/client' },
        { label: 'Mes Livraisons', icon: 'ri-box-1-line', route: '/client/deliveries' },
        { label: 'Factures', icon: 'ri-file-list-3-line', route: '/client/invoices' }
      ];
    }
  }
}
