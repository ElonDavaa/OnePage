import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { NgApexchartsModule } from "ng-apexcharts";
import { SearchResultService } from "../date-search/search-result.server";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
};

@Component({
  selector: 'app-simple-donut',
  imports: [NgApexchartsModule, HttpClientModule],
  templateUrl: './simple-donut.component.html',
  styles: ``
})

export class SimpleDonutComponent {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  donutData: any = [];
  donutLabel: any = [];

  constructor( private http: HttpClient, private resultService: SearchResultService) {
    this.chartOptions = {
      series: this.donutData,
      chart: {
        type: "donut",
        foreColor: "#fff",
      },
      labels: this.donutLabel,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit() : void {
    this.GetDonutChart();
    this.resultService.results$.subscribe(data => {
      if(Array.isArray(data[1])) {
        this.donutData = [];
        this.donutLabel = [];

        for (let item of data[1]) {
        this.donutData.push(item.donutCount);
        this.donutLabel.push(item.durationCategory);
        }

        this.chartOptions = {
          series: this.donutData,
          chart: {
            type: "donut",
            height: 300
          },
          labels: this.donutLabel,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 100
                },
                legend: {
                  position: "bottom"
                }
              }
            }
         ]
        };
      }
    })
  }

  private GetDonutChart() {
    this.http.get("http://192.168.3.207:55/api/Datas/DonutChart").subscribe((result: any) => {
      for(let item of result) {
        this.donutData.push(item.donutCount);
        this.donutLabel.push(item.durationCategory);
      }
    })
  }
}
