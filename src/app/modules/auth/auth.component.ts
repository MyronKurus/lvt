import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {AuthService} from "../../shared/services/auth.service";
import {ERoutes} from "../../core/enums/routes";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loading = true;
  error = false;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authService.authorization(encodeURIComponent(params['hash']))
        .subscribe(() => {
          this.loading = false;
          this.router.navigate([ERoutes.EMPTY]).then();
        }, () => {
          this.loading = false;
          this.error = true;
        });
    });

    setTimeout(() => {
      this.loading = false;
      this.error = true;
    }, 25000);
  }

}
