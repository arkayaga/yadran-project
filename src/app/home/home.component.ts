import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { OrganizationService } from '../core/organization/organization.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ChartComponent,
  ApexDataLabels
} from "ng-apexcharts";
import * as moment from 'moment';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  labels: any;
  dataLabels: ApexDataLabels;
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

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private authService: AuthService,
    private organizationService: OrganizationService) {
    this.getChartData();
    this.chartOptions = {
      series: [],
      chart: {
        type: "donut",
        width: '100%',
        height: 'auto'
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
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 40
      //       },
      //       legend: {
      //         position: "bottom"
      //       }
      //     }
      //   }
      // ],
      dataLabels: {
        enabled: true,
        formatter(_value, { seriesIndex, w }) {
          return w.config.series[seriesIndex]
        }
      }
    };
  }

  ngOnInit(): void {
    this.userSub = this.authService.getUser().subscribe(user => {
      this.username = user?.username ?? ''
    })

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  getChartData() {
    const request = {
      organizationStatusId: this.organizationStatusId,
      beginDate: this.beginDate ? moment(this.beginDate) : null,
      endDate: this.endDate ? moment(this.endDate) : null,
    };
    this.organizationService.getChartData(request).subscribe((x: any) => {
      x.data.forEach(y => {
        this.chartOptions.series.push(y.count)
        this.chartOptions.labels.push(y.placeName)

      });
    })
  }

}
