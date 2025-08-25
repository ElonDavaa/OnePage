import { Component, ViewEncapsulation} from "@angular/core";

import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ LucideAngularModule, MatFormFieldModule, MatDatepickerModule, MatInputModule,
    MatNativeDateModule, MatIconModule, RouterOutlet ],
  template: `
    <router-outlet/>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'One Page';
   readonly FileIcon = FileIcon;
}
