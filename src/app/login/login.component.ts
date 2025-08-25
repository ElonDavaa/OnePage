import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (!this.authService.isExpired()) {
      this.router.navigate(['news']);
    } else if (isPlatformBrowser(this.platformId)){
      this.onLogin();
    }
  }

  onLogin(): void {
    if(!isPlatformBrowser(this.platformId)) return;
    
    if (this.authService.isExpired()) {
      const callback = window.location.href.replace(
        window.location.pathname,
        '/login/callback'
      );
      window.location.href =
        environment.keycloak +
        'auth/realms/' + environment.realm + '/protocol/openid-connect/auth?response_type=token&client_id=web_app&redirect_uri=' +
        callback;
        this.router.navigate(['news']);
    } else {
      this.router.navigate(['news']);
    }
  }
}

