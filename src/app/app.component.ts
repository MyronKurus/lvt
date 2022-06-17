import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {RepoConfig} from "./core/configs/config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public translate: TranslateService) {
    translate.addLangs(RepoConfig.locales);
    translate.setDefaultLang(RepoConfig.defLocale);
    translate.use(RepoConfig.defLocale);
  }

}
