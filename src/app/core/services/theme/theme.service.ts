import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDarkMode = signal<boolean>(false);

    constructor() {
        this.initTheme();
    }

    private initTheme(): void {
        const savedTheme = localStorage.getItem('theme');

        // Check local storage, or fallback to user system preference
        if (savedTheme === 'dark') {
            this.setDarkMode(true);
        } else if (savedTheme === 'light') {
            this.setDarkMode(false);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setDarkMode(prefersDark);
        }
    }

    toggleTheme(): void {
        this.setDarkMode(!this.isDarkMode());
    }

    private setDarkMode(isDark: boolean): void {
        this.isDarkMode.set(isDark);
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }
}
