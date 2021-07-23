import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCursoComponent } from './components/detalle-curso/detalle-curso.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path:'',component:PrincipalComponent, pathMatch:'full' },
  //{ path:' ', component:PrincipalComponent},
  {path:'detalles',component:DetalleCursoComponent},
  {path:'inscripcion',component:InscripcionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
