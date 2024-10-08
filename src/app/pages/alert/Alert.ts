import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: "root"
})

export class Alert{


    success(_message: string) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: _message,
          showConfirmButton: false,
          timer: 2500,
          showCloseButton: true
        })
      }

      info(_message: string) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: _message,
          showConfirmButton: false,
          timer: 2500,
          showCloseButton: true
        })
      }
      warning(_message: string) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: _message,
          showConfirmButton: false,
          timer: 2500,
          showCloseButton: true
        })
      }


      
}