import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(): boolean {

        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}
