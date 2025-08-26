import { Component, inject, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ConfirmationService, MessageService, SelectItem, SortEvent } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar'; 
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { NewsService, Pageable } from './news.service';
import { API_FILE_DOWNLOAD } from '../shared/constants';
import { mergeMap, of } from 'rxjs';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface ListColumn {
  field: string;
  header: string;
  type?: string;
}

@Component({
  standalone: true,
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: [],
  imports: [HeaderComponent, CommonModule, TableModule, CalendarModule, PaginatorModule, TranslateModule, FormsModule],
})
export class NewsComponent {

  customDateMatchOptions!: SelectItem[];
  total: number = 0;
  first: number = 0;
  
  pageable: Pageable = {
    size: 20,
    page: 0,
    sort: 'id,desc'
  };

  sortField = 'id';
  sortOrder = -1;
  search: any;

  tableColumns: ListColumn[] = [
    {
      field: 'images',
      header: 'Зураг',
      type: 'image',
    },
    {
      field: 'title',
      header: 'Мэдээний гарчиг',
      type: 'string',
    },
    {
      field: 'createdDate',
      header: 'Нийтэлсэн огноо',
      type: 'date',
    },
    {
      field: 'createdBy',
      header: 'Нийтэлсэн хэрэглэгч',
      type: 'string',
    },
  ];
  list: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: NewsService,
  ) {
    this.search = {
      title: null,
      createdDate: null,
      createdBy: null
    }
    this.list = this.activatedRoute.snapshot.data['item'];
    this.total = this.service.getTotal();
  }
   
  logOut() {
    const translate = this.translateService;
    this.confirmationService.confirm({
      message: translate.instant('common.logoutBody'),
      header: translate.instant('common.logout'),
      icon: 'pi pi-sign-out',
      acceptLabel: translate.instant('common.yes'),
      rejectLabel: translate.instant('common.no'),
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.authService.logout();
      },
    });
  }

  onNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(item: any): void {
    this.router.navigate([item.id], { relativeTo: this.activatedRoute });
  }

  onDelete(item: any): void {
    const translate = this.translateService;
    this.confirmationService.confirm({
      message: translate.instant('common.deleteConfirm', { id: '#' + item.id }),
      header: translate.instant('common.deleteConfirmHeader'),
      icon: 'pi pi-trash',
      acceptLabel: translate.instant('common.yes'),
      rejectLabel: translate.instant('common.no'),
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.delete(item);
      },
    });
  }

  delete(item: any): void {

    let observable = of(null);
    if (item.images !== null && item.images !== undefined && item.images !== '' && item.images.includes(API_FILE_DOWNLOAD)) {
      const prevImageName = item.images.replaceAll(API_FILE_DOWNLOAD, '');
      observable = this.service.deleteFile(prevImageName);
    }
    const prevImageName = item.images.replaceAll(API_FILE_DOWNLOAD, '');
    observable.pipe(
      mergeMap((val: any) => {
        return this.service.delete(item.id);
      })
    ).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Амжилттай', detail: 'Мэдээ амжилттай устгалаа.' });
      this.fetch();
    }, (error) => {
      if (error.status === 401) {
        localStorage.clear();
        this.messageService.add({ severity: 'error', summary: 'Алдаа', detail: 'Нэвтрэх хугацаа дууссан.' });
        this.router.navigate(['login']);
      }
    })
  }

  onSearch(event: any, field: string = '') {
    if (field) {
      const criteria = this.service.getCriteria();
      if (
        (criteria[field] === undefined && (this.search[field] === null || this.search[field] === '')) ||
        criteria[field] === this.search[field]
      ) {
        return;
      }
    }
    this.fetch();
  }

  onSort(event: SortEvent) {
    const sort = event.field + ',' + (event.order === 1 ? 'asc' : 'desc');
    if (this.pageable.sort === sort) return;
    this.pageable.sort = sort;
    this.fetch();
  }

  paginateWithFilter(event: any) {
    this.pageable.page = event.page;
    this.pageable.size = event.rows;
    this.first = this.pageable.page * this.pageable.size;
    this.fetch();
  }

  fetch() {
    this.service.setPageable(this.pageable);
    this.service.fetch(this.search).subscribe((val) => {
      this.total = this.service.getTotal();
      this.list = val;
    });
  }

  afterDelete(item: any): void {
    const translate = this.translateService;
    this.messageService.add({
      severity: 'success',
      summary: translate.instant('common.success'),
      detail: translate.instant('common.deleteSuccess'),
    });
  }

  afterDeleteError(e: any): void {
    const translate = this.translateService;
    this.messageService.add({
      severity: 'error',
      summary: translate.instant('common.error'),
      detail: translate.instant('common.deleteError'),
    });
  }
}

