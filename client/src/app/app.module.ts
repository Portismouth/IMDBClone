//Modules
import { AppRoutingModule } from './/app-routing.module';
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Components
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResultsComponent } from './results/results.component';
import { UserComponent } from './user/user.component';
import { ReleasesComponent } from './releases/releases.component';

//Services
import { HttpService } from './http.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ResultsComponent,
    NavigationComponent,
    UserComponent,
    ReleasesComponent
    MovieComponent
  ],
  imports: [
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [
    NgbModule,
    AuthService,
    HttpService,
    LocalService,
    MovieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}