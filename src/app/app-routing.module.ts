import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-table', component: UserTableComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'feedback-form', component: FeedbackFormComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
