import { Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsFormComponent } from './news-form/news-form.component';
import { HomeResolver } from '../dashboard/home.resolver';
import { NewsFormResolver } from './news-form/news-form.resolver';
import { AuthGuard } from '../core/auth.guard';

export const newsRoutes: Routes = [
  {
    path: '',
    title: 'Мэдээний жагсаалт',
    resolve: { item: HomeResolver },
    component: NewsComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'news',
    title: 'Мэдээ нэмэх',
    component: NewsFormComponent,
    canActivate: [AuthGuard],
    data: { item: null },
  },
  {
    path: ':id',
    title: 'Мэдээ засах',
    component: NewsFormComponent,
    resolve: { item: NewsFormResolver },
  }
];