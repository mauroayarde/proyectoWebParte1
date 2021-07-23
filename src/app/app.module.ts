import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './components/principal/principal.component';
import { DetalleCursoComponent } from './components/detalle-curso/detalle-curso.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PrincipalService } from './service/principal.service';
//import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { PagoComponent } from './components/pago/pago.component'
//import { MatCardAvatar } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ToastrModule } from 'ngx-toastr';






/*
const routes: Routes = [
  { path: 'cursos', component: PrincipalComponent },
  ];
  
*/

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    DetalleCursoComponent,
    InscripcionComponent,
    PagoComponent
  ],
  imports: [
   // RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatGridListModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    //MatCardAvatar
    MatDatepickerModule,
    MatMomentDateModule,
    ToastrModule.forRoot()
    
  ],
  providers: [PrincipalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
