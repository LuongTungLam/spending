import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { LoginEffect } from './effects/login-effect';
// import { reducer } from './reducer/login-reducer';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);



@NgModule({
  imports: [
    SocialLoginModule,
    // StoreModule.forRoot({}),
    // StoreModule.forFeature("login", reducer),
    // EffectsModule.forRoot(),
    // EffectsModule.forFeature([LoginEffect]),
    BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, CommonModule, InputTextModule, ButtonModule, ChartModule, FullCalendarModule, HttpClientModule,
    TableModule, CarouselModule, ConfirmDialogModule, ToastModule, DialogModule, InputMaskModule, DropdownModule, CalendarModule,
  ],
  declarations: [AppComponent, HomeComponent, LoginComponent],
  exports: [HomeComponent, LoginComponent,],

  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('306811353878359'),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('808177454347-d2jbdk2gfkp49tndvgokltlp0vk8adjh.apps.googleusercontent.com'),
          },
        ],
        onError: (err) => {
          console.log(err);
        }
      } as SocialAuthServiceConfig,
    },
    SocialAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
