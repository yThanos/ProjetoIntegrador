import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { JwtInterceptor } from './security/JwtInterceptor ';
import { ErrorHandlerService } from './security/ErrorHandler';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HomeModule } from './home/home.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { StringFormatPipeModule } from './service/stringFormatPipe.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HomeModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      fullScreenBackdrop: true,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)'
    })
  ],
  providers: [
    provideNgxMask(),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
