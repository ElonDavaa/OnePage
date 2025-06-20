import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../news.service';
import { API_FILE_DOWNLOAD } from '../../shared/constants';
import { MessageService } from 'primeng/api';
import { mergeMap, of } from 'rxjs';
import { HeaderComponent } from "../header/header.component";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: [],
  imports: [HeaderComponent, TranslateModule, FormsModule, FileUploadModule, CommonModule],
})
export class NewsFormComponent implements OnInit {
  id: number | null = null;
  item: any;
  title: string = '';
  images: string = '';
  previousImage: string = '';
  content: string = '';
  isNewImage = false;
  viewImage: any;
  imageFile: File | null = null;
  createdDate: Date = new Date();
  loading = false;

  @ViewChild('fileload', { static: true }) fileload: ElementRef | any;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private service: NewsService,
    private messageService: MessageService
  ) {
    let item = this.activateRoute.snapshot.data['item'];
    if (item) {
      this.item = item;
      this.title = item.title;
      this.id = item.id;
      this.content = item.content;
      this.images = item.images;
      this.previousImage = item.images;
      this.viewImage = item.image;
    } else {
      this.images = 'assets/images/default1.png';
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSelect(event: any) {
    if (event.files && event.files[0]) {
      this.isNewImage = true;
      this.images = '';
      const file = event.files[0];
      const reader = new FileReader();
      this.imageFile = file;
      reader.onload = (e) => (this.viewImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onClear() {
    this.fileload.clear();
    this.imageFile = null;
    this.isNewImage = false;
    this.images = 'assets/images/default1.png'
  }

  onSubmit() {
    if (this.title === null || this.title === '' || this.content === undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Анхааруулга', detail: 'Мэдээний гарчиг хоосон байна.' });
      return;
    }
    if (this.content === null || this.content === '' || this.content === undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Анхааруулга', detail: 'Мэдээний агуулга хоосон байна.' });
      return;
    }
    const data = {
      id: this.id,
      title: this.title,
      content: this.content,
      images: '',
      createdBy: this.item ? this.item.createdBy : null,
      createdDate: this.item ? this.item.createdDate : null,
    };
    let observable = of(null);

    if (this.id !== null && this.isNewImage) {
      if (this.previousImage !== null && this.previousImage !== undefined && this.previousImage !== '' && this.previousImage.includes(API_FILE_DOWNLOAD)) {
        const prevImageName = this.previousImage.replaceAll(API_FILE_DOWNLOAD, '');
        observable = this.service.deleteFile(prevImageName);
      }
      observable = observable.pipe(
        mergeMap(() => {
          return this.service.uploadFile(this.imageFile);
        }),
        mergeMap((val: any) => {
          data.images = API_FILE_DOWNLOAD + val.filename;
          return this.service.put(data);
        })
      )
    } else if (this.id !== null) {
      data.images = this.previousImage;
      observable = this.service.put(data);
    } else {
      if (!this.isNewImage) {
        observable = this.service.post(data);
      } else {
        observable = this.service.uploadFile(this.imageFile).pipe(
          mergeMap((val) => {
            data.images = API_FILE_DOWNLOAD + val.filename;
            return this.service.post(data);
          })
        );
      }
    }
    this.loading = true;
    observable.subscribe((val: any) => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Амжилттай', detail: 'Мэдээг амжилттай хадгаллаа.' });
      this.route.navigate(['../news']);
    }, (error) => {
      if (error.status === 401) {
        localStorage.clear();
        this.messageService.add({ severity: 'error', summary: 'Алдаа', detail: 'Нэвтрэх хугацаа дууссан.' });
        this.route.navigate(['login']);
      }
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Алдаа', detail: 'Мэдээ хадгалахад алдаа гарлаа.' });
    });
  }
}
