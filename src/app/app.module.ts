import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { ConfigureComponent } from './pages/configure/configure.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { CaretRightFill, CaretDownFill, Calendar3, Plus, Backspace } from 'ng-bootstrap-icons/icons';
import { ConfirmationModalComponent } from './pages/confirmation-modal/confirmation-modal.component';
import { NgChartsModule } from 'ng2-charts';
import { BarGraphComponent } from './pages/bar-graph/bar-graph.component';


const icons = {
  CaretRightFill,
  CaretDownFill,
  Calendar3,
  Plus,
  Backspace
};

@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    ConfigureComponent,
    ConfirmationModalComponent,
    BarGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BootstrapIconsModule.pick(icons),
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
