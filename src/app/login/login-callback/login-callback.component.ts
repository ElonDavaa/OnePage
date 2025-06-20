import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: [],
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const fragment = this.activatedRoute.snapshot.fragment;
    const tree: UrlTree = this.router.parseUrl('?' + fragment);
    this.authService.login(tree.queryParams);
  }
}
