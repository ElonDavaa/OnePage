import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authorization: any = null;
  private username: any = null;
  private fullname: any = null;
  private offices: any = null;
  private roles: any = null;
  private office: any = null;
  private customer = {
    typeCode: null,
    typeName: null,
    keycloakId: null,
  };

  authSubject = new Subject<string>();
  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      if (
        localStorage.getItem('session_state') &&
        localStorage.getItem('access_token') &&
        localStorage.getItem('token_type') &&
        localStorage.getItem('expires_in') &&
        localStorage.getItem('started_datetime')
      ) {
        this.authorization = {
          session_state: localStorage.getItem('session_state'),
          access_token: localStorage.getItem('access_token'),
          token_type: localStorage.getItem('token_type'),
          expires_in: localStorage.getItem('expires_in'),
          started_datetime: localStorage.getItem('started_datetime'),
        };
      }
    }
  }

  login(authorization: any) {
    this.authorization = authorization;
    if (this.isBrowser) {
      for (const i in authorization) {
        localStorage.setItem(i, authorization[i]);
      }
      const now = new Date();
      localStorage.setItem('started_datetime', now.toString());
    }
    this.authSubject.next('loggedIn');
  }

  logout(): void {
    this.clearAuth();
    if (this.isBrowser) {
      const callback = window.location.href.replace(
        window.location.pathname,
        '/login'
      );
      window.location.href =
        environment.keycloak +
        'auth/realms/epostnet/protocol/openid-connect/logout?redirect_uri=' +
        callback;
    }
  }

  clearAuth(): void {
    this.authorization = null;
    this.username = null;
    this.fullname = null;
    this.offices = null;
    this.roles = null;
    this.office = null;

    if (this.isBrowser) {
      localStorage.removeItem('session_state');
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_type');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('started_datetime');
      localStorage.removeItem('office');
    }
  }

  isExpired(): boolean {
    if (this.authorization) {
      const expire = new Date(this.authorization.started_datetime);
      expire.setSeconds(
        expire.getSeconds() + Number(this.authorization.expires_in)
      );
      const now = new Date();

      if (now.getTime() < expire.getTime()) {
        return false;
      } else {
        this.clearAuth();
      }
    }
    return true;
  }

  hasAuthorization(): boolean {
    return this.authorization !== null;
  }

  getAccessToken(): string {
    return this.authorization?.access_token;
  }

  getUsername(): string {
    return this.username;
  }

  getFullname(): string {
    return this.fullname;
  }

  getOffices(): any[] {
    return this.offices?.slice() || [];
  }

  getRoles(): any[] {
    return this.roles?.slice() || [];
  }

  getCustomer(): any {
    return this.customer;
  }

  hasRole(role: string): boolean {
    return this.roles?.includes(role);
  }

  hasOffice(code: string): boolean {
    const office = this.offices?.find((item: any) => item.code === code);
    return !!office;
  }

  hasOfficeByRole(role: string): boolean {
    const office = this.offices?.find((item: any) => item.role === role);
    return !!office;
  }

  getOffice(): string {
    if (!this.office && this.isBrowser && localStorage.getItem('office')) {
      this.office = localStorage.getItem('office');
      if (!this.offices?.find((item: any) => item.code === this.office)) {
        this.office = null;
      }
    }
    return this.office;
  }

  setOffice(code: string) {
    this.office = code;
    if (this.isBrowser) {
      localStorage.setItem('office', code);
    }
  }
}
