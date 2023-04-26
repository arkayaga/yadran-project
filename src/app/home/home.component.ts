import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { OrganizationService } from '../core/organization/organization.service';
import * as moment from 'moment';
import { PlaceService } from '../core/place/place.service';
import { PlaceTransactionService } from '../core/place-transaction/place-transaction.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ChartComponent,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexLegend,
  ApexYAxis,
  ApexGrid
} from "ng-apexcharts";


export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  labels: any;
  dataLabels: ApexDataLabels;
};

export type ColumnChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  username: string;
  private userSub: Subscription;

  organizationStatusId: string;
  beginDate: string;
  endDate: string;

  @ViewChild("donut") donut: ChartComponent;
  public donutChartOptions: Partial<DonutChartOptions>;

  @ViewChild("column") column: ChartComponent;
  public columnChartOptions: Partial<ColumnChartOptions>;

  places = [];

  constructor(
    private authService: AuthService,
    private organizationService: OrganizationService,
    private placeService: PlaceService,
    private placeTransaction: PlaceTransactionService,

  ) {

    this.getPlaces()
    this.getChartData();

    // setTimeout(() => {
    this.apexDonut();
    this.apexColumn();

    // }, 1);
  }

  ngOnInit(): void {
    this.userSub = this.authService.getUser().subscribe(user => {
      this.username = user?.username ?? ''
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  apexDonut() {
    // setTimeout(() => {
    this.donutChartOptions = {
      ...this.donutChartOptions = {
        series: [],
        chart: {
          type: "donut",
          // width: 300,
          // height: 300
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: false,
                  show: true,
                }
              }
            }
          }
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
        dataLabels: {
          enabled: true,
          formatter(_value, { seriesIndex, w }) {
            return w.config.series[seriesIndex]
          }
        }
      }

    }

    // }, 500);

  }

  getChartData() {
    const request = {
      organizationStatusId: this.organizationStatusId,
      beginDate: this.beginDate ? moment(this.beginDate) : null,
      endDate: this.endDate ? moment(this.endDate) : null,
    };
    this.organizationService.getChartData(request).subscribe((x: any) => {
      x.data.forEach(y => {
        this.donutChartOptions.series.push(y.count)
        this.donutChartOptions.labels.push(y.placeName)

      });
    })
  }


  apexColumn() {

    // setTimeout(() => {
    this.columnChartOptions = {
      ...this.columnChartOptions = {
        series: [
          {
            name: "Kasa Durumu",
            data: [],
          }
        ],
        chart: {
          // width: 300,
          // height: 300,
          toolbar: {
            show: false
          },
          type: "bar",
          events: {
            // click(chart, w, e) {
            // console.log(chart, w, e)
            // }
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
            columnWidth: "25%",
            distributed: true
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
          categories: [],
          labels: {
            style: {
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
              fontSize: "12px"
            }
          }
        },
        yaxis: {
          labels: {
            formatter: (val) => {
              if (val >= 1000000) {
                return val / 1000000 + "M";
              } else {
                return val / 1000 + "K";

              }
            }
          }
        }
      }

    }
    window.dispatchEvent(new Event('resize'))

    // }, 500);
  }

  getPlaces() {
    this.placeService.getPlaces()
      .subscribe(places => {
        this.places = places.data
        this.places.forEach((x: any) => {
          console.log(x)
          this.getPlaceCashboxAmount(x.id)
          this.columnChartOptions.xaxis.categories.push(x.name)

        })
      })
  }

  getPlaceCashboxAmount(id) {
    this.placeTransaction.getPlaceCashboxAmount(id).subscribe((x: any) => {
      console.log(x)
      const index = this.places.findIndex(plc => plc.id === id);
      this.places[index].amount = x.data
      this.columnChartOptions.series[0].data.push(x.data)

    });
  }

}
