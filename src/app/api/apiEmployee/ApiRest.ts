import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class ApiRest{

    private server: string = 'http://192.168.1.10:8080'

    constructor(private http: HttpClient) { }
    



    fetchEmployee(): Observable<any>{
        const route: string = '/ressources_humaine/employees';
        return this.http.get(this.server+route);
    }


     saveEmployee(data: FormData){
          const route: string = '/ressources_humaine/create';
          return this.http.post(this.server+route, data);
   }

   deleteEmployee(idEmployee: string){
    const route: string = `/ressources_humaine/delete/${idEmployee}`;
    return this.http.delete(this.server+route);
   }

   getEmployeeById(idEmployee: string): Observable<any>{
    const route: string = `/ressources_humaine/search/${idEmployee}`;
    return this.http.get(this.server+route);
   }


}