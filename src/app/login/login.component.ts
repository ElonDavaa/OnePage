import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isExpired()) {
      this.router.navigate(['news']);
    } else {
      this.onLogin();
    }
  }

  onLogin(): void {
    if (this.authService.isExpired()) {
      const callback = window.location.href.replace(
        window.location.pathname,
        '/login/callback'
      );
      window.location.href =
        environment.keycloak +
        'auth/realms/' + environment.realm + '/protocol/openid-connect/auth?response_type=token&client_id=web_app&redirect_uri=' +
        callback;
    } else {
      this.router.navigate(['news']);
    }
  }
}

