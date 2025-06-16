// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { LucideAngularModule, FileIcon, CalendarDays } from 'lucide-angular';
// import { flatMap } from 'rxjs';

// @Component({
//   standalone: true,
//   selector: 'app-date-search',
//   imports: [CommonModule, FormsModule, LucideAngularModule, HttpClientModule],
//   templateUrl: './date-search.Component.html',
//   styles: ``
// })
// export class DateSearchComponent {
//   readonly CalendarDays = CalendarDays;
//   startDate = '';
//   endDate = '';
//   results: any[] = [];
//   loading = false;
//   searched = false;
//   inputEmpty = false;

//   constructor(private http: HttpClient){}

//   onSearch() {
//     const dateStart = new Date(this.startDate);
//     const dateEnd = new Date(this.endDate);
//     if (!this.startDate || !this.endDate) {
//       this.inputEmpty = true;
//     }
//     else {
//       this.loading = true;
//       this.searched = false;
//       this.inputEmpty = false;

//       console.log(this.startDate +'======'+ this.endDate);
//       const url = `/api/search?start=${this.startDate}&end=${this.endDate}`;

//       // this.http.get(url).subscribe({
//       //   next: (data) => {
//       //   },
//       //   error: (err) => {
//       //     console.error('Алдаа:', err);
//       //   }
//       // });
//     }
//   }

// }
