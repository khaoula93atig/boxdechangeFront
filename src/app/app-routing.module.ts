import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertisseurComponent } from './convertisseur/convertisseur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormEnchereComponent } from './form/form-enchere/form-enchere.component';
import { AfterAuthGuard } from './guards/afterAuthGuards';
import { AuthGuard } from './guards/AuthGuards';
import { RoleGuard } from './guards/roleGuards';
import { ListEnchereComponent } from './list-enchere/list-enchere.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu/menu.component';
import { PropositionListComponent } from './proposition-list/proposition-list.component';

const routes: Routes = [
  {path:'', component:LoginComponent, canActivate:[AfterAuthGuard]},
  {path:'dash', component:MenuComponent,canActivate:[AuthGuard],children:[
    {path:'list', component:ListEnchereComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_MODERATOR'}},
    {path:'dashboard', component:DashboardComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}},
    {path:'ajoutEnchere', component:FormEnchereComponent ,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}},
    {path:'convertisseur', component:ConvertisseurComponent ,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}},
    {path:'propositionList', component:PropositionListComponent ,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_USER'}}

  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
