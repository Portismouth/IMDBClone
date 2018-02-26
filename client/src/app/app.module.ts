//Modules
import { AppRoutingModule } from './/app-routing.module';
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';

//Services
import { HttpService } from './http.service';
import { LocalService } from './local.service';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [
    HttpService,
    LocalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
