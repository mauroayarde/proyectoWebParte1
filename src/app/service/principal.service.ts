import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};
const cudOptionsHtml = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8'})
};


@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  // URL Base
  private urlBase = environment.url_servicios_base;

  // Variables de URL Apis REST
  private apiGetCursos = this.urlBase + '/cursosfront';
  private apiGetIdCurso = this.urlBase + '/cursos/';
  private apiPostAlumnos = this.urlBase + '/alumnos/';
  private apiPostInscripcion = this.urlBase +'/inscripciones/';
  private apiGetHorario = this.urlBase +'/comision/';
  private apiGetAlumnoDni = this.urlBase+'/alumnos/dni/'
  

  constructor(public http: HttpClient) { }

  getDni(dni:any){
    return this.http.get(this.apiGetAlumnoDni+dni);
  }
  
  getCursos(): Observable<any> {
    return this.http.get(this.apiGetCursos);
  }
  getComision(fecha:any){
    return this.http.get(this.apiGetHorario+fecha);
  }

  getCursoId(id:number):Observable<any>{
    let direccion = this.apiGetIdCurso + id ;
    return this.http.get(direccion);
  }

 //metodo agregar un alumno
 postAlumnos(alumno: any): Observable<any>{
  const newSession = Object.assign({}, alumno);
  return this.http.post<any[]>(this.apiPostAlumnos, newSession, cudOptions);
}

postInscripcion(inscripcion:any){
  const newSession = Object.assign({}, inscripcion);
  return this.http.post<any[]>(this.apiPostInscripcion, newSession, cudOptions);

}

}
