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
import { PositionChangeComponent } from './position-change/position-change.component';
import { BoxComponent } from './box/box.component';
import { BankComponent } from './bank/bank.component';
import { UsersComponent } from './users/users.component';
import { AjoutUserComponent } from './ajout-user/ajout-user.component';
import { MotPasseOublieComponent } from './mot-passe-oublie/mot-passe-oublie.component';
import { AchatDashboardComponent } from './achat-dashboard/achat-dashboard.component';

const routes: Routes = [
  {path:'', component:LoginComponent, canActivate:[AfterAuthGuard]},
  {path: 'mdpoublier' , component :  MotPasseOublieComponent},
  {path: 'mdpoublier/:token', component: MotPasseOublieComponent},
  {path:'dash', component:MenuComponent,canActivate:[AuthGuard],children:[
    {path:'list', component:ListEnchereComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_BANK'}},
    {path:'dashboard', component:DashboardComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ENCHERE'}},
    {path:'dashboard-achat', component:AchatDashboardComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ENCHERE'}},
    {path:'ajoutEnchere', component:FormEnchereComponent ,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ENCHERE'}},
    {path:'convertisseur', component:ConvertisseurComponent ,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ENCHERE'}},
    {path:'propositionList', component:PropositionListComponent ,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ENCHERE'}},
    {path:'positionChange', component:PositionChangeComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ENCHERE'}},
    {path:'box', component:BoxComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
    {path:'bank', component:BankComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
    {path:'users', component:UsersComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
    {path:'ajoutUser', component:AjoutUserComponent,canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},

  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
