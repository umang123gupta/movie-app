import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


const routes:Routes=[
  {
    path:'',
    component:DashboardComponent
  },
   {
    path:'movie-details',
    component:MovieDetailsComponent
  }
]


@NgModule({
  declarations: [
    DashboardComponent,
    MovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DashboardModule { }
