import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from '../news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsFormResolver implements Resolve<any> {
  constructor(private service: NewsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.fetch({});   // service-ээс бүх мэдээг татах
  }
}