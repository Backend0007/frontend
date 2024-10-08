import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

   // if (this.authenticationService.user) {
    //  this.router.navigate(['/']);
   // }
   }

  //saveToken(token: string): void{
  //  localStorage.setItem('token', token)
   // this.router.navigate(['/'])
   // console.log('in')
   // this.store.dispatch(login({ email: email, password: password }));
  }

 // isLogged(): boolean{
  // const bearer = localStorage.getItem('token')
 //  console.log(bearer)
   // return !! bearer
 // }
//}
