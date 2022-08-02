import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormValue} from "../../shared/models/form-value.model";
import {DataService} from "../../shared/services/data.service";
import {forkJoin} from "rxjs";
import {UserProfile} from "../../shared/models/user-profile.model";
import {IndexCollection} from "../../shared/models/index.model";
import {Portfolio} from "../../shared/models/portfolio.model";

export enum LegendType {
  DAILY,
  WEEKLY,
  MONTHLY
}


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  public chartLegend = {
    startDate: new Date(),
    endDate: new Date(),
    type: LegendType.MONTHLY,
    length: 12
  }

  public formValue: FormValue | undefined;
  public profile: UserProfile | undefined;
  public indexes: IndexCollection[] | undefined;
  public portfolio: Portfolio | undefined;

  private chartLegendBreakpoints = [
    {type: LegendType.DAILY, minCount: 0, maxCount: 1},
    {type: LegendType.WEEKLY, minCount: 1, maxCount: 3},
    {type: LegendType.MONTHLY, minCount: 3, maxCount: 36}
  ];

  private static getMonthCount(startDate: Date, endDate: Date) {
    let months;
    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months <= 0 ? 0 : months;
  }

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.data.getUserProfile().subscribe(profile => this.profile = profile);
  }

  onFormValueChange(value: FormValue) {
    this.formValue = value;
    let monthLength = 0;
    forkJoin([
      this.data.indexes({
        startDate: value.startDate,
        endDate: value.endDate,
        requestedPeriod: value.requestedPeriod
      }),
      this.data.portfolio({
        startDate: value.startDate,
        endDate: value.endDate,
        requestedPeriod: value.requestedPeriod,
        portfolioInfoType: 3,
        currencyId: +value.currency,
        brutoOrNetoYield: 2,
      })
    ]).subscribe(([indexes, portfolio]) => {
      this.indexes = indexes;
      this.portfolio = portfolio;
    });

    monthLength = ContentComponent.getMonthCount(new Date(value.startDate), new Date(value.endDate));

    this.chartLegendBreakpoints.forEach(breakPoint => {
      if (breakPoint.minCount <= monthLength && breakPoint.maxCount >= monthLength) {
        this.chartLegend.type = breakPoint.type;
        this.chartLegend.length = monthLength;
        this.chartLegend.startDate = new Date(value.startDate);
        this.chartLegend.endDate = new Date(value.endDate);
      }
    });
  }

  ngOnDestroy() {
    // this.subscription$?.forEach(sub => sub.unsubscribe());
  }

}
