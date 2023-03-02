import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { routing } from './routing.module';
import { loginguardian } from './login/loginguardian.service';
import { loginService } from './login/login.service';
import { PopupComponent } from './home/popup/popup.component';
import { homeservices } from './home/home.services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [loginguardian, loginService, homeservices],
  bootstrap: [AppComponent]
})
export class AppModule { }
