import {Injectable} from '@angular/core';
import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth"
import {TrainingService} from "../training/training.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UiService} from "../shared/ui.service";
import {Store} from "@ngrx/store";
import * as fromRoot from "../app.reducer"
import * as UI from "../shared/ui.actions"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>()
  private isAuthinticated = false

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private matSnackBar: MatSnackBar,
              private uiService: UiService,
              private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthinticated = true
        this.authChange.next(true)
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubs()
        this.authChange.next(false)
        this.router.navigate(['/login'])
        this.isAuthinticated = false
      }
    })
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading())
      }).catch(error => {
      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading())
      this.matSnackBar.open(error.message, null, {
        duration: 3000
      })
    })
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false)
        this.store.dispatch(new UI.StopLoading())
      }).catch(error => {
      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading())
      this.matSnackBar.open(error.message, null, {
        duration: 3000
      })
    })
  }

  logout() {
    this.afAuth.auth.signOut()
  }

  isAuth() {
    return this.isAuthinticated
  }
}
