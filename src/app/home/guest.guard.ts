import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}
