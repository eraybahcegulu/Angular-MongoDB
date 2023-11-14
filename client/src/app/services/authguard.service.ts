import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Is authenticated:', this.authService.isAuthenticated());

    if (this.authService.isAuthenticated()) {
      const roles = route.data['roles'] as string[];
      const userType = this.authService.getUserType();

      if (userType && roles.includes(userType)) {
        return true;
      } else {

        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}