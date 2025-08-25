import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login/login-callback/login-callback.component';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsFormComponent } from './news/news-form/news-form.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/callback',
    component: LoginCallbackComponent
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./news/news.routes').then(m => m.newsRoutes)
  }
];  