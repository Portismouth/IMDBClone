import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'user', component: UserComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
