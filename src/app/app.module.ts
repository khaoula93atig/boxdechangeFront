import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ListEnchereComponent } from './list-enchere/list-enchere.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEnchereComponent } from './form/form-enchere/form-enchere.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropositionListComponent } from './proposition-list/proposition-list.component';
import { ToastrModule } from 'ngx-toastr';
import { ConvertisseurComponent } from './convertisseur/convertisseur.component';
import { VenteService } from './vente.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SortPipe } from './sort.pipe';
import { WebsocketsService } from './services/websockets.service';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './services/stomp';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import theme from 'highcharts/themes/brand-dark';
import { CurrencyPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PositionChangeComponent } from './position-change/position-change.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkColumnDef, CdkTableModule } from '@angular/cdk/table';
import { HighchartsChartModule } from "highcharts-angular";
import { BoxComponent } from './box/box.component';
import { BankComponent } from './bank/bank.component';
import { UsersComponent } from './users/users.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AjoutUserComponent } from './ajout-user/ajout-user.component';
import { MotPasseOublieComponent } from './mot-passe-oublie/mot-passe-oublie.component';
import * as Highcharts from 'highcharts';
import { MatOptionModule } from '@angular/material/core';
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import { AchatDashboardComponent } from './achat-dashboard/achat-dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListEnchereComponent,
    FormEnchereComponent,
    LoginComponent,
    DashboardComponent,
    PropositionListComponent,
    ConvertisseurComponent,
    DashboardComponent,
    SortPipe,
    PositionChangeComponent,
    BoxComponent,
    BankComponent,
    UsersComponent,
    AjoutUserComponent,
    MotPasseOublieComponent,
    AchatDashboardComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ChartModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CdkTableModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatTooltipModule,
    HighchartsChartModule,
    MatGridListModule,
    MatOptionModule,
    MatCurrencyFormatModule
   // AngularFireModule.
    
  ],
  providers: [authInterceptorProviders,VenteService, 
    WebsocketsService,CdkColumnDef,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },{
      provide: HIGHCHARTS_MODULES,
      useFactory: () => [ theme ]
   },CurrencyPipe
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
