import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {RepoConfig} from "./core/configs/config";
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
    public translate: TranslateService,
    private auth: AuthService
  ) {
    translate.addLangs(RepoConfig.locales);
    translate.setDefaultLang(RepoConfig.defLocale);
    // translate.use(RepoConfig.defLocale);
    translate.use('he');
  }

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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
