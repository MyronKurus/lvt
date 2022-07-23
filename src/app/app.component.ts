import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {RepoConfig} from "./core/configs/config";
import {AuthService} from "./shared/services/auth.service";
import {Subscription, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  public isLoading = true;
  private subscription: Subscription | undefined;

  constructor(
    public translate: TranslateService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.auth.accessToken()
      .pipe(
        tap(token => this.auth.setAuthToken(token.access_token)),
        switchMap( () => this.auth.bankProfile()),
        tap(profile => this.auth.setBankProfile(profile))
      ).subscribe(() => {
        this.isLoading = false;
      });
  }

  ngAfterViewInit() {
    this.translate.addLangs(RepoConfig.locales);
    this.translate.setDefaultLang(RepoConfig.defLocale);
    this.translate.use(RepoConfig.defLocale);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
