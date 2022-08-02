import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {Token} from "../models/token.model";
import {BankProfile} from "../models/bank-profile.model";

import {WebApiService} from "./web-api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authToken: string = '';
  private refToken: string = '';
  private bnkProfile = {} as BankProfile;

  constructor(private webApiService: WebApiService) {
  }

  public getAuthToken(): string {
    return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJMZXZlbnQiLCJzdWIiOiJTdWJqZWN0IiwiYXVkIjoiQXVkaWVuY2UiLCJleHAiOjEyMywibmJmIjoxMjMsImlhdCI6MTIzLCJqdGkiOiJ1bmlxdWUgaWRlbnRpZmllciIsImJhbmsiOjMxLCJicmFuY2giOjQ2LCJhY2NvdW50Ijo0MDQxNDQsImN1c3RvbWVySWQiOiIwMTIzNDU2NyIsImNsZXJrSWQiOiJ0MTIzNDU2In0.deyJmMOlK8nEq9nR4cCmkkajiaGD4RUrS3S2WmMUj5U';
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

    return this.webApiService.post<Token>('Authorization/AccessToken', formData);
  }

  public refreshToken(): Observable<Token> {
    const formData = new FormData();
    formData.append('Authorization', '1324523432434dgtftvdfshvht');

    return this.webApiService.post<Token>('Authorization/RefreshToken', formData);
  }

  public bankProfile(): Observable<BankProfile> {
    return this.webApiService.post<BankProfile>('Authorization/BankProfile', null);
  }

  public authorization(hash: string): Observable<any> {
    return this.webApiService.post(
      'authorization/web/post',
      `hashKey=${hash}`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }

}
