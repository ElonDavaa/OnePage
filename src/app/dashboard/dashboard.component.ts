import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { systemLinks, systemMock } from '../core/mock-data';
import { LineChartComponent } from "../line-chart/line-chart.component";
import { ColumnChartComponent } from "../column-chart/column-chart.component";
import { SimpleDonutComponent } from "../simple-donut/simple-donut.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LucideAngularModule, FileIcon, CalendarDays } from 'lucide-angular';
import { SearchResultService } from '../date-search/search-result.server';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NewsService } from '../news/news.service';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, LineChartComponent, ColumnChartComponent, SimpleDonutComponent, HttpClientModule, LucideAngularModule,
    MatFormFieldModule, MatDatepickerModule, MatInputModule,
    MatNativeDateModule, MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {
  readonly CalendarDays = CalendarDays;
  
  placeholder1 = '';
  placeholder2 = '';
  startDate = '';
  endDate = '';
  results: any[] = [];
  loading = false;
  searched = false;
  inputEmpty = false;

  systemMenu = systemMock;
  systemLists = systemLinks;
  
  totalRevenue: number = 0;
  totalOrders: number = 0;
  totalChanges: number = 0;
  totalDeliveries: number = 0;
  avgDelivery: number = 0;


 totalRevenueS: string = "";
  totalOrdersS: string = "";
  totalChangesS: string = "";
  totalDeliveriesS: string = "";
  avgDeliveryS: string = "";



  newsList: any[] = [];
  systemList = systemLinks;
  selectedIndex: any;
  selectedNews: any;
  showNews: boolean = false;
  loadingNews: boolean = false;
  pageable = { size: 20, page: 0, sort: 'createdDate,desc' };
  total = 0;


  progressDataZahialga = [
    { label: 'Нийслэл', value: 0, percent: 0, less: '' },
    { label: 'Орон нутаг', value: 0, percent: 0, less: '' },
  ];
  progressDataSoliltsoo = [
    { label: 'Гарах', value: 0, percent: 0, less: '' },
    { label: 'Орох', value: 0, percent: 0, less: '' },
  ]
  progressDataOrlogo = [
    { label: 'Дотоод', value: 0, percent: 0, less: '' },
    { label: 'Гадаад', value: 0, percent: 0, less: '' },
  ]

  selectedType = 'Захиалга';
  chartOptionsList: string[] = ['Захиалга', 'Орлого', 'Солилцоо', 'Гардуулалт'];

  constructor (private http: HttpClient, private resultService: SearchResultService,
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {
    this.newsList = this.route.snapshot.data['item'];
    this.total = this.newsService.getTotal();
  }

  onSearch() {
    const dateStart = new Date(this.startDate);
    const dateEnd = new Date(this.endDate);

    const checkDate = this.checkMax12Months(dateStart, dateEnd);

    if (!this.startDate || !this.endDate) {
      this.inputEmpty = true;
    }
    else if(!checkDate) {
      alert("Эхлэх болон төгсөх огнооны хооронд 12 сараас их байж болохгүй.");
    }
    else {
      this.loading = true;
      this.searched = false;
      this.inputEmpty = false;

      console.log(this.sentFormatDate(dateStart) +'======'+ this.sentFormatDate(dateEnd));
      const url = `http://192.168.3.207:55/api/Datas/totalOrdersSearch?start=${this.sentFormatDate(dateStart)}&end=${this.sentFormatDate(dateEnd)}`;

      this.http.get<any>(url).subscribe((result:any) => {
      const sendData = [];
      sendData.push(result.bar_chart);
      sendData.push(result.donut_chart);
      this.results = sendData;
      this.resultService.setResults(sendData);
      this.loading = false;
      this.searched = true;

      this.totalOrders = result.niit_barcode;
      this.totalOrdersS = this.getNumber(result.niit_barcode);

      this.totalChanges = result.niit_soliltsoo;
      this.totalChangesS = this.getNumber(result.niit_soliltsoo);

      this.totalDeliveries = result.niit_garduulalt;
      this.totalDeliveriesS = this.getNumber(result.niit_garduulalt);
      this.avgDelivery = Math.floor(result.niit_garduulalt / 30);
      this.avgDeliveryS = this.getNumber(Math.floor(result.niit_garduulalt / 30));

      this.totalRevenue = Math.floor(result.niit_orlogo);
      this.totalRevenueS = this.getNumber(Math.floor(result.niit_orlogo));

      this.progressDataZahialga[0].value = result.niislel_zahialga;
      this.progressDataZahialga[0].percent = Math.floor(result.niislel_zahialga * 100 / this.totalOrders); 
      this.progressDataZahialga[0].percent > 50 ? this.progressDataZahialga[0].less = "" : this.progressDataZahialga[0].less = "less";
      this.progressDataZahialga[1].value = this.totalOrders - result.niislel_zahialga;
      this.progressDataZahialga[1].percent = 100 - this.progressDataZahialga[0].percent;
      this.progressDataZahialga[1].percent > 50 ? this.progressDataZahialga[1].less = "" : this.progressDataZahialga[1].less = "less";

      this.progressDataSoliltsoo[0].value = result.garah_soliltsoo;
      this.progressDataSoliltsoo[0].percent = Math.floor(result.garah_soliltsoo * 100 / this.totalChanges);
      this.progressDataSoliltsoo[0].percent > 50 ? this.progressDataSoliltsoo[0].less = "" : this.progressDataSoliltsoo[0].less = "less";
      this.progressDataSoliltsoo[1].value = this.totalChanges - result.garah_soliltsoo;
      this.progressDataSoliltsoo[1].percent = 100 - this.progressDataSoliltsoo[0].percent;
      this.progressDataSoliltsoo[1].percent > 50 ? this.progressDataSoliltsoo[1].less = "" : this.progressDataSoliltsoo[1].less = "less";

      this.progressDataOrlogo[0].value = result.dotood_orlogo;
      this.progressDataOrlogo[0].percent = Math.floor(result.dotood_orlogo * 100 / this.totalRevenue);
      this.progressDataOrlogo[0].percent > 50 ? this.progressDataOrlogo[0].less = "" : this.progressDataOrlogo[0].less = "less";
      this.progressDataOrlogo[1].value = this.totalRevenue - result.dotood_orlogo;
      this.progressDataOrlogo[1].percent = 100 - this.progressDataOrlogo[0].percent;
      this.progressDataOrlogo[1].percent > 50 ? this.progressDataOrlogo[1].less = "" : this.progressDataOrlogo[1].less = "less";
      })
    }
  }

  onTypeChange(type: string) {
    this.selectedType = type;
  }

  ngOnInit(): void { 
    this.getDateTite()
    this.getTotalOrder();
    this.getTotalChange();
    this.getTotalDelivery();
    this.getTotalIncome();
    this.progressBarCity();
    this.progressBarChange();
    this.progressBarIncome();
    this.getNewsApi();
  }
   // toog taslalaar formatlah method
   private getNumber (number: number) {
     var a = number.toString();

          var x = a.split("").reverse().join("");

          var y = '';
          var count = 1;

          for(var i=0; i < x.length; i++)
          {
            y = y + x[i];

            if( count%3 === 0 ) y = y + ',';
            count ++;
          }
          var z = y.split("").reverse().join("");

          if(z[0] === ',') z = z.substr(1, z.length - 1);
          return z;
   }
   
   // хугацаа хоорондыг шалгах method
   checkMax12Months(startDate: Date, endDate: Date): boolean {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const diffInMonths =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      if (diffInMonths > 11) { // 0-based index тул 11 = 12 сар
        return false;
      }

      return true;
}
   // одоо байгаагаас өмнөх 1 сарыг авах 
   getDateTite () {
     const currentDate = new Date();

      // Өмнөх сар
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

      // Эхлэл: өмнөх сарын 1
      const startDate = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);

      // Төгсгөл: дараа сарын 1-нээс 1 өдөр хасах
      const endDate = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);

      this.placeholder1 = this.formatDate(startDate);
      this.placeholder2 = this.formatDate(endDate);

   }

   // ✅ DD/MM/YYY формат руу хөрвүүлэх функц
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 2 оронтой сар
    const day = ('0' + date.getDate()).slice(-2); // 2 оронтой өдөр
    return `${day}/${month}/${year}`;
  }
  // YYYY-MM-DD формат руу хөрвүүлэх функц
  sentFormatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

   //Нийт захиалга
  private getTotalOrder () {
    this.http.get("http://192.168.3.207:55/api/Datas/totalOrders").subscribe((result:any) => {
      this.totalOrders = result.niit_barcode;
      this.totalOrdersS = this.getNumber(result.niit_barcode);
    })
  }
  
  // Нийт солилцоо
  private getTotalChange () {
    this.http.get("http://192.168.3.207:55/api/Datas/TotalChange").subscribe((result:any) => {
      this.totalChanges = result.niit_soliltsoo;
      this.totalChangesS = this.getNumber(result.niit_soliltsoo);
    })
  }
  // Нийт гардуулалт
  private getTotalDelivery () {
    this.http.get("http://192.168.3.207:55/api/Datas/TotalEnd").subscribe((result: any) => {
      this.totalDeliveries = result.niit_garduulalt;
      this.totalDeliveriesS = this.getNumber(result.niit_garduulalt);
      this.avgDelivery = Math.floor(result.niit_garduulalt / 30);
      this.avgDeliveryS = this.getNumber(Math.floor(result.niit_garduulalt / 30));
    })
  }
  // Нийт орлого
  private getTotalIncome () {
    this.http.get("http://192.168.3.207:55/api/Datas/TotalIncome").subscribe((result: any) => {
      this.totalRevenue = Math.floor(result.niit_orlogo);
      this.totalRevenueS = this.getNumber(Math.floor(result.niit_orlogo));
    })
  }
  // Progress bar 
  private progressBarCity () {
    this.http.get("http://192.168.3.207:55/api/Datas/CityOrder").subscribe((result: any) => {
      this.progressDataZahialga[0].value = result.niislel_zahialga;
      this.progressDataZahialga[0].percent = Math.floor(result.niislel_zahialga * 100 / this.totalOrders); 
      this.progressDataZahialga[0].percent > 50 ? this.progressDataZahialga[0].less = "" : this.progressDataZahialga[0].less = "less";
      this.progressDataZahialga[1].value = this.totalOrders - result.niislel_zahialga;
      this.progressDataZahialga[1].percent = 100 - this.progressDataZahialga[0].percent;
      this.progressDataZahialga[1].percent > 50 ? this.progressDataZahialga[1].less = "" : this.progressDataZahialga[1].less = "less";
    })
  }

  private progressBarChange () {
    this.http.get("http://192.168.3.207:55/api/Datas/OutChange").subscribe((result: any) => {
      this.progressDataSoliltsoo[0].value = result.garah_soliltsoo;
      this.progressDataSoliltsoo[0].percent = Math.floor(result.garah_soliltsoo * 100 / this.totalChanges);
      this.progressDataSoliltsoo[0].percent > 50 ? this.progressDataSoliltsoo[0].less = "" : this.progressDataSoliltsoo[0].less = "less";
      this.progressDataSoliltsoo[1].value = this.totalChanges - result.garah_soliltsoo;
      this.progressDataSoliltsoo[1].percent = 100 - this.progressDataSoliltsoo[0].percent;
      this.progressDataSoliltsoo[1].percent > 50 ? this.progressDataSoliltsoo[1].less = "" : this.progressDataSoliltsoo[1].less = "less";
    })
  }
  private progressBarIncome () {
    this.http.get("http://192.168.3.207:55/api/Datas/InnerIncome").subscribe((result: any) => {
      this.progressDataOrlogo[0].value = result.dotood_orlogo;
      this.progressDataOrlogo[0].percent = Math.floor(result.dotood_orlogo * 100 / this.totalRevenue);
      this.progressDataOrlogo[0].percent > 50 ? this.progressDataOrlogo[0].less = "" : this.progressDataOrlogo[0].less = "less";
      this.progressDataOrlogo[1].value = this.totalRevenue - result.dotood_orlogo;
      this.progressDataOrlogo[1].percent = 100 - this.progressDataOrlogo[0].percent;
      this.progressDataOrlogo[1].percent > 50 ? this.progressDataOrlogo[1].less = "" : this.progressDataOrlogo[1].less = "less";
    })
  }

  onSystem(url: string): void {
    window.open(url, '_blank');
  }

   onHide(): void {
    this.selectedIndex = null;
    this.showNews = false;
  }

  onShow(index: number): void {
    this.selectedIndex = index;
    this.selectedNews = this.newsList[index];
    this.showNews = true;
  }
  onScroll(event: any) {
    if (!this.loadingNews) {
      if (event.target.offsetHeight + event.target.scrollTop + 10 >= event.target.scrollHeight) {
        if (this.total > (this.pageable.page + 1) * this.pageable.size) {
          this.pageable.page = this.pageable.page + 1;
          this.loadingNews = true;
          this.newsService.getNews(null, this.pageable).subscribe(val => {
            this.newsList = [...this.newsList, ...val];
            this.total = this.newsService.getTotal();
            this.loadingNews = false;
          });
        }
      }
    }
  }
  getNewsApi() {
    this.newsService.getNews(null, this.pageable).subscribe(val => {
            this.newsList = val;
            this.total = this.newsService.getTotal();
          });
  }
}
