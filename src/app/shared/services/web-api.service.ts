import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';

import {RepoConfig} from '../../core/configs/config';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  private static createUrl(route: string) {
    return `${RepoConfig.apiUrl}/${route}`;
  }

  private static generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(route: string, params?: HttpParams): Observable<any> {
    const url = WebApiService.createUrl(route);
    return this.httpClient.get(url, {params});
  }

  public post<T>(route: string, body?: any, params?: any): Observable<any> {
    const url = WebApiService.createUrl(route);
    return this.httpClient.post(url, body, {params});
  }

  public authPost<T>(route: string, body?: any, headers?: any): Observable<any> {
    const url = WebApiService.createUrl(route);
    return this.httpClient.post(url, body, headers);
  }

  public update<T>(route: string, body?: any): Observable<any> {
    const url = WebApiService.createUrl(route);
    return this.httpClient.put(url, body, WebApiService.generateHeaders());
  }

  public delete<T>(route: string): Observable<any> {
    const url = WebApiService.createUrl(route);
    return this.httpClient.delete(url);
  }
}
