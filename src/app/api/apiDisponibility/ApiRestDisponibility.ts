import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ApiRestDisponibility{
private server: string = 'http://192.168.1.10:8080'

    constructor(private http: HttpClient){}


    checkConnexion(): Observable<any>{
        const route = '/disponibility/check ';
        return this.http.get(this.server + route);
    }

    test(): Observable<any>{
        const route = '/disponibility/check ';
        return this.http.get(this.server + route);
    }
}