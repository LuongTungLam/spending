import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { autoLogin, browserReload, loginSocicalSuccess } from './store/actions/login-actions';
import { User } from './store/reducers/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spending-management';
  user!: User;
  constructor(private route: Router, private store: Store<AppState>) {
    var _user = localStorage.getItem('socicalUser');
    this.user = JSON.parse(_user!);

    if (this.user) {
      this.route.navigate(['home']);
      this.store.dispatch(browserReload({ user: this.user }))
      // this.store.dispatch(autoLogin({ user: this.user }))
    } else {
      this.route.navigate(['login']);
    }
  }

}
