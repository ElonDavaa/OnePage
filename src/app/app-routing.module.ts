import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { LoginComponent } from './modules/login/login.component';
import { LoginComponent } from './login/login.component';
//import { LoginCallbackComponent } from './modules/login/login-callback/login-callback.component';
import { LoginCallbackComponent } from './login/login-callback/login-callback.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'login/callback', component: LoginCallbackComponent },
  // {
  //   path: 'news',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./modules/news/news.module').then((m) => m.NewsModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
