import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Itoken } from "../../interfaces/Itoken";
import { GlobalComponent } from "../../global-component";

@Injectable({
    providedIn: 'root'
})

export class ApiRestUser{
 private server: string = GlobalComponent.SERVER;



 constructor(private http: HttpClient){}



   getOneUser(id: String ): Observable<any>{
    const route = `/user/getOneUser/${id}` ;
    return this.http.get(this.server+route)
   }

   activateUser(userData: FormData){
    const route = `/user/activate`;
    return this.http.post(this.server+route, userData)
   }

   codeSender(codeData: FormData ){
    const route = `/user/confirmation`;
    return this.http.post(this.server+route, codeData)
   }


}