import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { NewsService } from '../news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsFormResolver implements Resolve<boolean> {
  constructor(private service: NewsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    return this.service.getNewsById(Number(id));
  }
}
