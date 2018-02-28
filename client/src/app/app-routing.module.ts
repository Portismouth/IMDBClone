import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { MovieComponent } from './movie/movie.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResultsComponent } from './results/results.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'user', component: UserComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
