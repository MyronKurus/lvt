import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const url = req.url.split('/')[req.url.split('/').length - 1];
    const tokenUrls = ['AccessToken', 'RefreshToken'];

    if (!tokenUrls.includes(url)) {
      const newReq = req.clone({
        headers: req.headers.append('Authorization', this.auth.getAuthToken())
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }

}
