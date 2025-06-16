import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { SearchResultService } from "../date-search/search-result.server";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  grid: ApexGrid | any;
  colors: string[] | any;
  legend: ApexLegend | any;
};

@Component({
  standalone: true,
  selector: 'app-column-chart',
  imports: [NgApexchartsModule, HttpClientModule],
  templateUrl: './column-chart.component.html',
  styles: ``
})

export class ColumnChartComponent implements OnInit {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  columnData: any[] = [];
  columnCategory: any[] = [];

  constructor(private http: HttpClient, private resultService: SearchResultService) {
    this.chartOptions = {
      series: [
        {
          name: "Шуудангийн тоо",
          data: this.columnData,
        }
      ],
      chart: {
        height: 350,
        foreColor: "#fff",
        type: "bar",
        events: {
          click: function(chart: any, w: any, e: any) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "55%",
          distributed: true,
          borderRadius: 12
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.columnCategory,
        labels: {
          rotate: 0,
          style: {
            // colors: [
            //   "#008FFB",
            //   "#00E396",
            //   "#FEB019",
            //   "#FF4560",
            //   "#775DD0",
            //   "#546E7A",
            //   "#26a69a",
            //   "#D10CE8"
            // ],
            fontSize: "12px"
          }
        }
      }
    };
  }

  ngOnInit () : void {
    this.GetColumnChart();
    this.resultService.results$.subscribe(data => {
    if (Array.isArray(data[0])) {
      // 1. Хуучин өгөгдлийг цэвэрлэ
      this.columnData = [];
      this.columnCategory = [];

      // 2. Шинэ өгөгдлийг оноо
      for (let item of data[0]) {
        this.columnData.push(item.barCount);
        this.columnCategory.push(item.office);
      }

      // 3. График шинэчлэх
      if (this.chart) {
        this.chart.updateSeries([
          {
            name: "Шуудангийн тоо",
            data: this.columnData
          }
        ]);

        this.chart.updateOptions({
          xaxis: {
            categories: this.columnCategory,
            labels: {
              rotate: 0,
              style: {
                fontSize: "12px"
              }
            }
          }
        });
      }
    }
  });
  }



  private GetColumnChart () {
    this.http.get("http://192.168.3.207:55/api/Datas/BarChart").subscribe((result: any) => {
      for(let item of result) {
        this.columnData.push(item.barCount);
        this.columnCategory.push(item.office); 
      }
    })
  }
}