import {environment} from 'src/environments/environment';

export class RepoConfig {
  public static production: boolean = environment.production;
  public static apiUrl: string = environment.apiUrl;
  public static defLocale = environment.defaultLang
  public static locales = environment.languages
}
