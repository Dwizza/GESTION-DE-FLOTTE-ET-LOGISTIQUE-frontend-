import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  public themeService = inject(ThemeService);
  private authService = inject(AuthService);

  get userRole(): string {
    return this.authService.getUserRole() || 'Guest';
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  logout() {
    this.authService.clearTokens();
    // In a real app, you'd trigger a router navigation here, e.g. this.router.navigate(['/auth/login'])
    window.location.href = '/auth/login';
  }
}
