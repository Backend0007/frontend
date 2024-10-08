import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { AttendanceData, DepartmentsListData, EmployeeListData, EmployeeSalaryData, EstimatesData, EventData, ExpensesData, FriendsData, GridViewData, HolidaysData, LeaveManageEmployeeData, LeaveManageHRData, ListViewData, NotesData, OrderListData, SellersData, UserGridViewData, UserListViewData, events } from '../../data';
import { GlobalComponent } from '../../global-component';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserDecoded } from '../../interfaces/userDecoded';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private token!: string;
    constructor() { 
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const users: any[] = JSON.parse(localStorage.getItem('users')!) || [{ }];
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            const route = '/app/connexion';
            // authenticate
            if (request.url.endsWith(route) && request.method === 'POST') {


                const userDecoded = jwtDecode<UserDecoded>(localStorage.getItem('bearer')!);
                const filteredUsers = users.filter(user => {
                    return userDecoded.sub === request.body.email;
                });
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        email: userDecoded.sub,
                        firstName: userDecoded.firstName,
                        lastName: userDecoded.lastName,
                        role: userDecoded.role,
                        service: userDecoded.service,
                        token: localStorage.getItem('bearer')
                    };
                     this.token = localStorage.getItem('bearer')!;
                     localStorage.removeItem('bearer');
                   
                    return of(new HttpResponse({ status: 200, body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }
            // post users
            if (request.method === 'POST') {
                if(this.token){
                    console.log('post in');
                  request = request.clone({
                      setHeaders: {
                          Authorization: `Bearer ${this.token}`
                      }
                  })
  
                }
          }

            // get users
            if (request.method === 'GET') {
                  if(this.token){
                    
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })

                  }
            }

          
            // pass through any requests not handled above
            return next.handle(request);

        }))

            // tslint:disable-next-line: max-line-length
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}
