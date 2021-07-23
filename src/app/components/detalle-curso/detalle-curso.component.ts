import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/service/comunicacion.service';
import { PrincipalService } from 'src/app/service/principal.service';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionComponent } from '../inscripcion/inscripcion.component';

export interface Instructor{
  idInstructor:number;
  nombre:string;
  apellido:string;
  foto:string;
  cv:string;
  celular:string;
  titulo:string;
  dni:string;
  mp_public_key:string;
  mp_access_token:string;
}

export interface Comision{
  idComision:number;
  nombre:string;
  horario:string;
  cupo:number;
}

export interface Curso{
  idCurso:number;
  nombreCurso:string;
  descripcion:string;
  publico_destinado:string;
  requisitos:string;
  url_imagen_presentacion:string;
  url_video_presentacion:string;
  precio_inscripcion:number;
  precio_cuota:number;
  cantidad_cuotas:number;
  id_subrubros:number;
  id_instructores:number;
  estado_eliminacion:boolean;
  estado_publicacion:boolean;
  habilita_inscripcion:boolean;
  instructor:Instructor;
  comisiones:Comision[];
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})
export class DetalleCursoComponent implements OnInit {
  
  imagen!:string;
  descripcion!:string;
  requisitos!: string
  detalle_curso!: string;
  publicoDestinado!: string;
  precioCuota!:number;
  precioInscripcion!:number;
  nombre!:string;
  apellido!:string;
  profesor!:string
  horarios!:string;
  cursos!: Array<Curso>;
  seasons: string[] = [];
  
  
  constructor(private principalService: PrincipalService,public cService:ComunicacionService,public modal:MatDialog) { 
    this.cursos=new Array<Curso>();
    
  }
  
  ngOnInit(): void {
    this.test();
  }

  
  test() {
    try {
        this.principalService.getCursos().subscribe( resp => {
      // console.log(resp['cursos']);
        this.cursos=resp['cursos'];
          
        for (let index = 0; index < this.cursos.length; index++) {
            if(this.cursos[index].idCurso == this.cService.idCurso){
                 this.descripcion = this.cursos[index].descripcion;
                 this.imagen = this.cursos[index].url_imagen_presentacion;
                 this.requisitos = this.cursos[index].requisitos;
                 this.publicoDestinado = this.cursos[index].publico_destinado; 
                 this.nombre = this.cursos[index].instructor.nombre;
                 this.apellido = this.cursos[index].instructor.apellido;
                 this.profesor = this.nombre+' '+this.apellido;
                 this.precioCuota=this.cursos[index].precio_cuota;
                 this.precioInscripcion=this.cursos[index].precio_inscripcion;
                for (let j = 0; j < this.cursos[index].comisiones.length; j++) {
                  this.seasons[j] = this.cursos[index].comisiones[j].horario;
                  
                }
                 // this.horarios = this.cursos[index].comisiones[index].horario;
                 
            }  
          }
        
      });
    } catch {
       console.log('');
    }

  }

  inscripcion(){
    this.modal.open(InscripcionComponent);
  }

  id(test:number){
    this.principalService.getCursoId(test).subscribe(resp=>{
     console.log(resp['rows']);
    });
  }

}
