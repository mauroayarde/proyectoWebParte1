import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/service/comunicacion.service';
import { PrincipalService } from '../../service/principal.service'

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
  comiciones:Comision[];
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  inscripcion!: number;
  cuota!:number;
  total!:number;
  cursos!: Array<Curso>;
  imagen1!:string;
  imagen2!:string


  constructor(private principalService:PrincipalService,public cService:ComunicacionService) {
    this.cursos=new Array<Curso>();
   }

  ngOnInit(): void {
    
    this.test();

    
  }

  test() {
    try {
        this.principalService.getCursos().subscribe( resp => {
        //console.log(resp['cursos']);
        this.cursos=resp['cursos'];
        //this.dataSource = new MatTableDataSource(this.cursos);
      });
    } catch {
       console.log('');
    }
  }

  verificacion(test:number){
      this.cService.idCurso=test;
  }

 

  
}
