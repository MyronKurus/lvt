import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Currency} from "../models/currency.model";
import {UserProfile} from "../models/user-profile.model";
import {Index} from "../models/index.model";
import {Portfolio} from "../models/portfolio.model";

@Injectable({
  providedIn: "root"
})
export class DataService {

  private appUrl: string = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
  }

  public getCurrencyList(): Observable<Currency[]> {
    const params = this.authOptions();
    return this.http.get<Currency[]>(`${this.appUrl}CurrencyHelper`);
  }

  public getUserProfile(): Observable<UserProfile> {
    const params = this.authOptions();
    return this.http.get<UserProfile>(`${this.appUrl}CustomerProfile/UserProfile`);
  }

  public indexes(): Observable<Index[]> {
    const params = this.authOptions();
    const body = {
      type: "body",
      values: {
        requestedPeriod: 0,
        startDate: "2022-06-01T08:49:03.668Z",
        endDate: "2022-06-24T08:49:03.668Z"
      }
    };
    return this.http.post<Index[]>(`${this.appUrl}/CustomerYieldCalculation/Indexes`, params);
  }

  public portfolio(): Observable<Portfolio> {
    const params = this.authOptions();
    const body = {
      type: "body",
      values: {
        "portfolioInfoType": 1,
        "requestedPeriod": 0,
        "startDate": "2022-06-01T08:54:29.194Z",
        "endDate": "2022-06-24T08:54:29.194Z",
        "currencyId": 0,
        "brutoOrNetoYield": 0
      }
    };
    return this.http.post<Portfolio>(`${this.appUrl}/CustomerYieldCalculation/Portfolio`, params);
  }

  private authOptions() {
    return {
      type: "header",
      values: {
        ...this.auth.getBankProfile(),
        Authorization: this.auth.getAuthToken()
      }
    }
  }
}
