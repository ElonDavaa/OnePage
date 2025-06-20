import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgApexchartsModule, ApexTooltip } from "ng-apexcharts";


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  tooltip: ApexTooltip | any; 
  yaxis: ApexYAxis | any;
};

@Component({
  standalone: true,
  selector: 'app-line-chart',
  imports: [NgApexchartsModule, HttpClientModule],
  templateUrl: './line-chart.component.html',
  styles: ``
})

export class LineChartComponent {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  lineDatas: any = [];
  lineCategories: any = [];

  constructor(private http: HttpClient) {
    this.chartOptions = {
      series: [
        {
          name: "Шуудангийн тоо",
          data: this.lineDatas,
        }
      ],
      
      chart: {
        height: 350,
        type: "area",
        foreColor: "#fff",
        zoom: {
          enabled: false
        }
      },
      tooltip: {
        y: {
          formatter: function(val: any) {
          return (val / 1000000).toFixed(0);
            }
        }
      },
      yaxis: {
        title: {
            text: "Price"
          },
        labels: {
            formatter: function(val: any) {
              return (val / 1000000).toFixed(0);
            }
          }
        },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Шуудангийн тоо",
        align: "left",
        style: {
          fontSize: "12px",
          color: "#fff",
          Weight: "100"
        },
      },
      
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0
        }
      },
      
      xaxis: {
        categories: this.lineCategories,
        title: {
          text: "Огноо"
        },
        labels: {
          rotate: 0,
        }
      },
    };
  }

  ngOnInit() : void {
    this.GetLineChart();
  }

  private GetLineChart () {
    this.http.get("http://192.168.3.207:55/api/Datas/LineChart").subscribe((result: any) => {
      for(let item of result) {
        this.lineDatas.push(item.count);
        this.lineCategories.push(item.year + "-" + item.month);
      }
    })
  }
}

