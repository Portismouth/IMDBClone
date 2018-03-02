import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { MovieComponent } from './movie/movie.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResultsComponent } from './results/results.component';
import { UserComponent } from './user/user.component';
import { ReleasesComponent } from './releases/releases.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'title/:movieId', component: MovieComponent },
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
