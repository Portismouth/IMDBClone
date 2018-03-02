import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResultsComponent } from './results/results.component';
import { UserComponent } from './user/user.component';
import { ReleasesComponent } from './releases/releases.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'title/:movieId', component: MovieComponent },
  { path: 'title/:movieId', component: MovieComponent },
  { path: 'reviews/:movieId', component: ReviewsComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'user', component: UserComponent },
  { path: 'releases', component: ReleasesComponent },
  { path: '', pathMatch: 'full', redirectTo: 'results' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
