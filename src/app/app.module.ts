import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MovieDetailsDialogComponent } from './components/dialogs/movie-details-dialog/movie-details-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SafePipe } from './pipes/safe-pipe.pipe';
import { ShortNumberPipe } from './pipes/short-number.pipe';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    MovieDetailsDialogComponent,
    LoadingComponent,
    SafePipe,
    ShortNumberPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.uri],
        disallowedRoutes: [environment.uri + '/users/login'],
      },
    }),
    BrowserAnimationsModule,
  ],
  entryComponents:[
    MovieDetailsDialogComponent,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
