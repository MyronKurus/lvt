import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Currency} from "../models/currency.model";
import {UserProfile} from "../models/user-profile.model";
import {Index} from "../models/index.model";
import {Portfolio} from "../models/portfolio.model";
import {IndexesBody} from "../models/indexes-body.model";
import {PortfolioBody} from "../models/portfolio-body.model";

@Injectable({
  providedIn: "root"
})
export class DataService {

  private appUrl: string = 'http://95.215.159.51:55965/';

  constructor(
    private http: HttpClient,
  ) {
  }

  public getCurrencyList(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.appUrl}CurrencyHelper`);
  }

  public getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.appUrl}CustomerProfile/UserProfile`);
  }

  public indexes(body: IndexesBody): Observable<Index[]> {
    return this.http.post<Index[]>(`${this.appUrl}CustomerYieldCalculation/Indexes`, body);
  }

  public portfolio(body: PortfolioBody): Observable<Portfolio> {
    return this.http.post<Portfolio>(`${this.appUrl}CustomerYieldCalculation/Portfolio`, body);
  }

}
