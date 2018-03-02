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
import { ReleasesComponent } from './releases/releases.component';
import { ResultsComponent } from './results/results.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

//Services
import { HttpService } from './http.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';
import { MovieService } from './movie.service';
import { ReviewService } from './review.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ResultsComponent,
    NavigationComponent,
    UserComponent,
    ReleasesComponent,
    MovieComponent,
    ReviewsComponent,
    HomeComponent
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
    MovieService,
    ReviewService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}