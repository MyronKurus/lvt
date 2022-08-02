import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from "./shared/services/auth.service";
import {Subscription, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoading = true;
  private subscription: Subscription | undefined;

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = false;

    this.auth.bankProfile()
      .pipe(tap(profile => this.auth.setBankProfile(profile)))
      .subscribe(() => {
        this.isLoading = false;
      });
    this.subscription = this.auth.accessToken()
      .pipe(
        tap(token => this.auth.setAuthToken(token.access_token)),
        switchMap( () => this.auth.bankProfile()),
        tap(profile => this.auth.setBankProfile(profile))
      ).subscribe(() => {
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
