import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Token} from "../models/token.model";
import {BankProfile} from "../models/bank-profile.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private appUrl: string = '';
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
    const params = {
      type: "multipart/formdata",
      values: {
        code: "1324523432434dgtftvdfshvht",
        redirect: "https://www.google.com"
      }
    }
    return this.http.post<Token>(`${this.appUrl}Authorization/AccessToken`, params);
  }

  public refreshToken(): Observable<Token> {
    const params = {
      type: "multipart/formdata",
      values: {
        refresh_token: this.refToken
      }
    }
    return this.http.post<Token>(`${this.appUrl}Authorization/RefreshToken`, params);
  }

  public bankProfile(): Observable<BankProfile> {
    const params = {
      type: "header",
      values: {
        Authorization: this.authToken
      }
    }
    return this.http.post<BankProfile>(`${this.appUrl}Authorization/BankProfile`, params);
  }


}
