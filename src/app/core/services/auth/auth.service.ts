import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import {
    LoginRequest,
    LoginResponse,
    RegisterClientRequest,
    RegisterClientResponse
} from '../../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/auth';
    private readonly tokenKey = 'access_token';
    private readonly refreshTokenKey = 'refresh_token';

    constructor() { }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
            tap((response) => this.saveTokens(response.accessToken, response.refreshToken))
        );
    }

    registerClient(request: RegisterClientRequest): Observable<RegisterClientResponse> {
        return this.http.post<RegisterClientResponse>(`${this.apiUrl}/register/client`, request);
    }

    // Token Management
    saveTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.tokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshTokenKey);
    }

    clearTokens(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }

    isLoggedIn(): boolean {
        const token = this.getAccessToken();
        if (!token) return false;

        try {
            const decoded: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    }

    getUserRole(): string | null {
        const token = this.getAccessToken();
        if (!token) return null;

        try {
            const decoded: any = jwtDecode(token);
            // Assuming Spring Security puts roles in an array called "roles" or "authorities"
            // Adjust this based on your exact JWT payload structure (usually like "ROLE_ADMIN")
            const roles = decoded.roles || decoded.authorities || [];
            if (roles.includes('ROLE_ADMIN')) return 'ADMIN';
            if (roles.includes('ROLE_MANAGER')) return 'MANAGER';
            if (roles.includes('ROLE_CLIENT')) return 'CLIENT';

            // Fallback for simple "role" generic claim
            return decoded.role || null;
        } catch (error) {
            return null;
        }
    }

    isAdmin(): boolean {
        return this.getUserRole() === 'ADMIN';
    }

    isManager(): boolean {
        return this.getUserRole() === 'MANAGER';
    }

    isClient(): boolean {
        return this.getUserRole() === 'CLIENT';
    }
}
