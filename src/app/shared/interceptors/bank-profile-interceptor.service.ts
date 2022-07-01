import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Injectable()
export class BankProfileInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const url = req.url.split('/')[req.url.split('/').length - 1];
    const noBankUrls = ['AccessToken', 'RefreshToken', 'BankProfile'];

    if (!noBankUrls.includes(url)) {
      const newReq = req.clone({
        headers: req.headers
          .append('bank', this.auth.getBankProfile().Bank + '')
          .append('branch', this.auth.getBankProfile().Branch + '')
          .append('account', this.auth.getBankProfile().Account + '')
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }

}
