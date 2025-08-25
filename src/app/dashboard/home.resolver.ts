import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { NewsService } from '../news/news.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {
  constructor(
    private newsService: NewsService
  ){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.newsService.getNews();
  }
}