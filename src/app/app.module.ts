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
import { FormsModule } from '@angular/forms';
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
    SortPipe
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
   // AngularFireModule.
    
  ],
  providers: [authInterceptorProviders,VenteService, 
    WebsocketsService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
