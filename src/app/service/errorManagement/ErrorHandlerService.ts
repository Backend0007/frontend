import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { Alert } from "../../pages/alert/Alert";



@Injectable({
    providedIn: 'root'
})

export class ErrorHandlerService{
    constructor(private alert: Alert){}

    handleHttpError(error: HttpErrorResponse): void {
        let errorMessage = 'An unknown error occured!';

        if(error.error instanceof ErrorEvent){
            errorMessage = `Error: ${error.error.message}`;
        }else{
            errorMessage = this.getServerErrorMessage(error.status);
        }
        this.alert.warning(errorMessage);
    }

    private getServerErrorMessage(status: number): string{
        switch(status){
            case 0:
        return 'Serveur éteint ou injoignable!';
      case 404:
        return 'Ressource non trouv\é!';
      case 500:
        return 'Erreur du serveur interne!';
      default:
        return 'Serveur erreur inconue';
        }
    }




    checkDisponibility(error: HttpErrorResponse): number {
        let errorMessage: any = 800;

        if(error.error instanceof ErrorEvent){
           return errorMessage = this.g(error.status);
        }else{
           return errorMessage = this.g(error.status);
        }
       return this.g(error.status);;
    }

    private g(status: number): number{
        switch(status){
            case 0:
        return 0;
      case 404:
        return  404;
      case 500:
        return 500;
      default:
        return 10;
        }
    }




}