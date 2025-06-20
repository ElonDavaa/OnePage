import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService
  ) {}

  logOut() {
    const translate = this.translateService;
    this.confirmationService.confirm({
      message: translate.instant('common.logoutBody'),
      header: translate.instant('common.logout'),
      icon: 'pi pi-sign-out',
      acceptLabel: translate.instant('common.yes'),
      rejectLabel: translate.instant('common.no'),
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.authService.logout();
      },
    });
  }
}