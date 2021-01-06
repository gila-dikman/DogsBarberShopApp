import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { TurnsTableComponent } from './Turns/turns-table/turns-table.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'turns', component: TurnsTableComponent, canActivate: [LoginGuard] }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
