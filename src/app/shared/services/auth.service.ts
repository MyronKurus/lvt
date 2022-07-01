import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Token} from "../models/token.model";
import {BankProfile} from "../models/bank-profile.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private appUrl: string = 'http://95.215.159.51:55965/';
  private authToken: string = '';
  private refToken: string = '';
  private bnkProfile = {} as BankProfile;

  constructor(private http: HttpClient) {
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
  }

  public getRefToken(): string {
    return this.refToken;
  }

  public setRefToken(token: string): void {
    this.refToken = token;
  }

  public getBankProfile(): BankProfile {
    return this.bnkProfile;
  }

  public setBankProfile(profile: BankProfile): void {
    this.bnkProfile = profile;
  }

  public accessToken(): Observable<Token> {
    const formData = new FormData();
    formData.append('code', '1324523432434dgtftvdfshvht');
    formData.append('redirect', 'https://www.google.com');

    return this.http.post<Token>(`${this.appUrl}Authorization/AccessToken`, formData);
  }

  public refreshToken(): Observable<Token> {
    const formData = new FormData();
    formData.append('Authorization', '1324523432434dgtftvdfshvht');

    return this.http.post<Token>(`${this.appUrl}Authorization/RefreshToken`, formData);
  }

  public bankProfile(): Observable<BankProfile> {
    return this.http.post<BankProfile>(`${this.appUrl}Authorization/BankProfile`, null);
  }


}
