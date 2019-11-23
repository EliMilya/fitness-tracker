import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from 'angularfire2'
import {AngularFirestoreModule} from 'angularfire2/firestore'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {MatIconModule} from "@angular/material/icon";
import {WelcomeComponent} from './welcome/welcome.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {environment} from "../environments/environment";
import {UiService} from "./shared/ui.service";
import {AuthModule} from "./auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./app.reducer";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [UiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
