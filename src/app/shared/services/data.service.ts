import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {Currency} from "../models/currency.model";
import {Portfolio} from "../models/portfolio.model";
import {IndexCollection} from "../models/index.model";
import {UserProfile} from "../models/user-profile.model";
import {IndexesBody} from "../models/indexes-body.model";
import {PortfolioBody} from "../models/portfolio-body.model";

import {WebApiService} from "./web-api.service";

@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor(
    private repoService: WebApiService,
  ) {
  }

  public getCurrencyList(): Observable<Currency[]> {
    return this.repoService.get<Currency[]>('CurrencyHelper');
  }

  public getUserProfile(): Observable<UserProfile> {
    return this.repoService.get<UserProfile>('CustomerProfile/UserProfile');
  }

  public indexes(body: IndexesBody): Observable<IndexCollection[]> {
    return this.repoService.post<IndexCollection[]>('CustomerYieldCalculation/Indexes', body);
  }

  public portfolio(body: PortfolioBody): Observable<Portfolio> {
    return this.repoService.post<Portfolio>('CustomerYieldCalculation/Portfolio', body);
  }

}
