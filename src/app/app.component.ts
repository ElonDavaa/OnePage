import { Component, ViewEncapsulation} from "@angular/core";

import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, LucideAngularModule, MatFormFieldModule, MatDatepickerModule, MatInputModule,
    MatNativeDateModule, MatIconModule
  ],
  template: `
    <app-dashboard/>

    <router-outlet />
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'first-ng-app';
   readonly FileIcon = FileIcon;
}
