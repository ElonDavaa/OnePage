import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchResultService {
  private resultSource = new BehaviorSubject<any[]>([]);
  results$ = this.resultSource.asObservable();

  setResults(results: any[]) {
    this.resultSource.next(results);
  }
}