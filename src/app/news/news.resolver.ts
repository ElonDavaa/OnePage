import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { NewsService } from './news.service';

export const newsResolver: ResolveFn<any> = (route, state) => {
  const service = inject(NewsService);
  // pageable, search-г default-оор өгөх
  return service.fetch({});
};