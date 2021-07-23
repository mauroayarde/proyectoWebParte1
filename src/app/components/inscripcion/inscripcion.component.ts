import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ComunicacionService } from 'src/app/service/comunicacion.service';
import { PrincipalService } from 'src/app/service/principal.service';
import {MatDialog} from '@angular/material/dialog';
import { PagoComponent } from '../pago/pago.component';
import { ToastrService } from 'ngx-toastr';

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

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  valorFecha: string='';
  datosForm!:FormGroup;
  cursos!:Array<Curso>;
  favoriteSeason!: string;
  seasons: string[] = [];
  titulo!:string;
  comision1!:string;
  comision2!:string;
  comision3!:string;
  precioInscripcion!:number;

  selected : any;
  localidades: any =[
    {
      id_localidad:'1',
      nombre:'San salvador de Jujuy'
    },
    {
      id_localidad:'2',
      nombre:'Palpala'
    },
    {
      id_localidad:'3',
      nombre:'Perico'
    },
    {
      id_localidad:'4',
      nombre:'San Pedro de Jujuy'
    },
    {
      id_localidad:'5',
      nombre:'Ledesma'
    }
  ];

  constructor(public cService:ComunicacionService,private principalService:PrincipalService,
    private formBuilder: FormBuilder,public modal:MatDialog,
    private toastr:ToastrService) {
    this.cursos = new Array<Curso>();
   }

  ngOnInit(): void {
    this.selected = this.localidades[0];
    this.datosForm = this.formBuilder.group({
      
      nombres:['',[Validators.required]],
      apellidos:['',[Validators.required]],
      dni:['',[Validators.required]],
      fechaNacimiento:['',[Validators.required]],
      celular:['',[Validators.required]],
      mail:['',[Validators.required]],
      direccionCalle:['',[Validators.required]],
      direccionNumero:['',[Validators.required]],
      direccionBarrio:['',[Validators.required]],
      direccion_localidad:['']
      
      
    });


  

    this.test();
   
    
    
  }

  test() {
    try {
        this.principalService.getCursos().subscribe( resp => {
      // console.log(resp['cursos']);
        this.cursos=resp['cursos'];
        for (let index = 0; index < this.cursos.length; index++) {
            if(this.cursos[index].idCurso == this.cService.idCurso){
                for (let j = 0; j < this.cursos[index].comisiones.length; j++) {
                 this.titulo=this.cursos[index].nombreCurso;
                 this.seasons[j] = this.cursos[index].comisiones[j].horario;
                 this.precioInscripcion = this.cursos[index].precio_inscripcion;
                }
            }  
          }
      });
    } catch {
       console.log('');
    }
    
  }

  pagoExitoso(){
    this.modal.open(PagoComponent);
  }

async  altaAlumno(){
    
    if(!this.datosForm.invalid){

      let alumno = {
        nombres: this.datosForm.get('nombres')?.value,
        apellidos: this.datosForm.get('apellidos')?.value,
        dni: this.datosForm.get('dni')?.value,
        fechaNacimiento:this.datosForm.get('fechaNacimiento')?.value,
        celular: this.datosForm.get('celular')?.value,
        mail: this.datosForm.get('mail')?.value,
        direccionCalle: this.datosForm.get('direccionCalle')?.value,
        direccionNumero: this.datosForm.get('direccionNumero')?.value,
        direccionBarrio: this.datosForm.get('direccionBarrio')?.value,
        direccionLocalidad: this.selected.nombre
       
    };
    console.log(alumno);
   await this.principalService.postAlumnos(alumno).toPromise().then(resp=>{
      this.toastr.success("Se registraron los datos correctamente","Carga exitosa")
      console.log(resp);
      this.principalService.getDni(this.datosForm.value.dni).subscribe(resp=>{
        this.cService.ObjetoAlumno=resp;
       // console.log(this.cService.ObjetoAlumno);
         //id alumno para pasar por parametro
        this.cService.id_alu=this.cService.ObjetoAlumno.alumnos_id;
        //id alumno para pasar por parametro
        console.log(this.cService.id_alu);
      })
      
    });
    }else{
      this.toastr.error("No se realizo la inscripcion tiene que completar todos los campos!!! ","Vuelva hacer el proceso");
    }
    
  }

  radioChangeHandler(event:any){
  //  this.valorFecha = event;
   // console.log(this.valorFecha);
    console.log(this.favoriteSeason);
  }

 async horarioComision(){
  await  this.principalService.getComision(this.favoriteSeason).toPromise().then((resp:any)=>{
      console.log(resp);
      this.cService.objetoCurso=resp["rows"];
      this.cService.id_comision=this.cService.objetoCurso[0].id_comisiones;
      console.log(this.cService.id_comision);
    })
  }
  
  async inscribir(){
    let inscripcion={
     id_comision: this.cService.id_comision,
      id_alu:this.cService.id_alu
    }

    await  this.principalService.postInscripcion(inscripcion).toPromise().then((resp:any)=>{
       // console.log(this.cService.id_comision);
      //  console.log(this.cService.id_alu);
        console.log(resp);
      })
      
    
    
  }

}
