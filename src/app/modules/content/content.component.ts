import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormValue} from "../../shared/models/form-value.model";
import {DataService} from "../../shared/services/data.service";
import {forkJoin} from "rxjs";
import {UserProfile} from "../../shared/models/user-profile.model";
import {IndexCollection} from "../../shared/models/index.model";
import {Portfolio} from "../../shared/models/portfolio.model";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  public formValue: FormValue | undefined;
  public profile: UserProfile | undefined;
  public indexes: IndexCollection[] | undefined;
  public portfolio: Portfolio | undefined;

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.data.getUserProfile().subscribe(profile => this.profile = profile);
  }

  onFormValueChange(value: FormValue) {
    this.formValue = value;
    console.log(this.formValue);
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
        portfolioInfoType: 1,
        currencyId: +value.currency,
        brutoOrNetoYield: 0,
      })
    ]).subscribe(([indexes, portfolio]) => {
      this.indexes = [];
      this.portfolio = portfolio;
    });
  }

  ngOnDestroy() {
    // this.subscription$?.forEach(sub => sub.unsubscribe());
  }

}
