import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { API_FILE_DELETE, API_FILE_UPLOAD, API_NEWS_EXTERNAL, API_NEWS_INTERNAL } from '../shared/constants';
import { AuthService } from '../core/auth.service';

export interface Pageable {
  page: number,
  size: number,
  sort: string,
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  changed = new Subject<any[]>();
  private defaultPageable: Pageable;
  private pageable: Pageable;
  private criteria: any = {};
  private total = 0;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.defaultPageable = { size: 20, page: 0, sort: 'createdDate,desc' };
    this.pageable = { size: 20, page: 0, sort: 'createdDate,desc' };
  }

  post(data: any): Observable<any> {
    return this.httpClient.post(API_NEWS_INTERNAL, data, this.getHeaders());
  }

  put(data: any): Observable<any> {
    return this.httpClient.put(API_NEWS_INTERNAL + '/' + data.id, data, this.getHeaders());
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(API_NEWS_INTERNAL + '/' + id, this.getHeaders());
  }

  uploadFile(image: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.getAccessToken()
      })
    };
    return this.httpClient.post(API_FILE_UPLOAD, formData, httpOptions);
  }

  deleteFile(imagePath: any): Observable<any> {
    return this.httpClient.delete(API_FILE_DELETE + '?filename=' + imagePath, this.getHeaders());
  }


  fetch(criteria?: any): Observable<any> {
    if (criteria) {
      this.criteria = { ...criteria };
    }
    const query = this.query(this.pageable, this.criteria);
    return this.httpClient.get<any>(API_NEWS_EXTERNAL, { params: query, observe: 'response' }).pipe(
      map(val => {
        if (val.headers.get('X-Total-Count')) {
          this.total = Number(val.headers.get('X-Total-Count'));
        }
        return val.body;
      })
    );
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getAccessToken()
      })
    };
    return httpOptions;
  }

  getNews(criteria?: any, pageable?: Pageable): Observable<any> {
    if (pageable) {
      this.pageable = pageable;
    }
    return this.fetch(criteria);
    // return this.httpClient.get<any>(API_NEWS_EXTERNAL);
  }
  getNewsById(id: number): Observable<any> {
    return this.httpClient.get<any>(API_NEWS_EXTERNAL + '/' + id);
  }

  listMap(list: any[]): any[] {
    return list;
  }

  getCriteria(): any {
    return { ...this.criteria };
  }

  getTotal(): number {
    return this.total;
  }

  getPageable(): Pageable {
    return { ...this.pageable };
  }

  setPageable(pageable: Pageable): void {
    this.pageable = { ...pageable };
  }

  query(pageable: Pageable, criteria: any): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pageable.page);
    httpParams = httpParams.set('size', pageable.size);
    httpParams = httpParams.set('sort', pageable.sort);

    for (const i in criteria) {
      if (criteria[i] !== null && criteria[i] !== '') {

        const lowerIndex = i.toLowerCase();
        if (Array.isArray(criteria[i])) {
          if (criteria[i].length === 2 && typeof criteria[i][0] === 'object') {
            httpParams = httpParams.set(i + '.greaterThanOrEqual', criteria[i][0].toJSON());
            let date = new Date(criteria[i][1].getTime() + 24 * 60 * 60000);
            if (criteria[i][1]) {
              date = new Date(criteria[i][1].getTime() + 24 * 60 * 60000);
            }
            httpParams = httpParams.set(i + '.lessThan', date.toJSON());
          } else {
            httpParams = httpParams.set(i + '.in', criteria[i].join(','));
          }
        } else if (
          typeof criteria[i] === 'number' ||
          typeof criteria[i] === 'boolean' ||
          lowerIndex === 'id' ||
          lowerIndex === 'listorder' ||
          lowerIndex === 'ratetype' ||
          lowerIndex === 'additiontype'
        ) {
          httpParams = httpParams.set(i + '.equals', criteria[i]);
        } else {
          httpParams = httpParams.set(i + '.contains', criteria[i]);
        }

      }
    }

    return httpParams;
  }


}
