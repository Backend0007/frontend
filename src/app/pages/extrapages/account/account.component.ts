import { Component } from '@angular/core';
import { DocumentsData, FollowersData, ProjectsData } from '../../../data';
import { NavModule } from '../../../Component/tab/tab.module';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { getChartColorsArray } from '../../../shared/commonFunction';
import { CutomDropdownComponent } from '../../../Component/customdropdown';
import { ActivatedRoute } from '@angular/router';
import { ApiRest } from '../../../api/apiEmployee/ApiRest';

import { ErrorHandlerService } from '../../../service/errorManagement/ErrorHandlerService';
import { CommonModule } from '@angular/common';
import { Alert } from '../../alert/Alert';
import { DateParse } from '../../../utils/DateParse';
import { GlobalComponent } from '../../../global-component';
import { MDModalModule } from "../../../Component/modals/modal.module";
import { ApiRestUser } from '../../../api/apiUser/apiRestUser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../../model/Employee';
import { ModalService } from '../../../Component/modals/modal.service';
import { ListRoles } from '../../../data/data-utils/listRoles';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NavModule, LucideAngularModule, NgApexchartsModule, CutomDropdownComponent, CommonModule, MDModalModule,ReactiveFormsModule],
  templateUrl: './account.component.html',
  styles: ``,
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }]
})
export class AccountComponent {

 activateForm!: FormGroup;
 codeSend!: FormGroup;

  private date!: Date;
  profileUrl: any;
  documentdata: any;
  projectsdata: any;
  followersData: any;
  employeeId: any;
  employeeData: any;
  user: any;
  recentStatisticsChart: any;

  constructor(
    private route: ActivatedRoute,
    private apiRest: ApiRest,
    private apiRestUser: ApiRestUser,
    private errorHandlerService: ErrorHandlerService,
    private alert: Alert,
    private dateParse: DateParse,
    private fb: FormBuilder,
    private modalService: ModalService,
    public roles: ListRoles
  ){
      
  }

  ngOnInit(): void {
    
    this.employeeData = {
      idEmployee: "",
      matriculateEmployee: "",
      firstNameEmployee: "",
      lastNameEmployee: "",
      sex: "",
      phoneEmployee: "",
      emailPersonalEmployee: "",
      emailProfessionalEmployee: "",
      photoEmployee: "",
      dateOfBirthEmployee: "",
      accademyDegreeOfEmployee: "",
      serviceConcern: "",
      statusOfemployee: "",
      dateOfRecruitement: "",
      hourOfRecruitement: "",
      directorGeneral: "",
      streetOfEmployee: "",
      numberStreetOfEmployee: "",
      neighborhoodOfEmployee: "",
      cityOfEmployee: "",
      stateOfEmployee: "",
      nationalityEmployee: "",
      countryOfEmployee: "",
      createdEmployeeBy: "",
      diplomaEmployee: [],
      curriculumAndResumeEmployee: [],
      signatureEmployee: []
    };

    this.codeSend = this.fb.group({
      code: [''],
    })
  
    this.activateForm = this.fb.group({
      idUser: [''],
      employeeId: [''],
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      sex: [''],
      password: [''],
      repassword: [''],
      phone: [''],
      role: [''],
      photo: [''],
      status: [''],
      service: [''],
      number: [''],
      address: [''],
      neighborhood: [''],
      city: [''],
      state: [''],
      country: [''],
      conditions: [''],
      activation: [false],
      placeOfwork: [''],
      userCreatedBy: [''],
    });


    this.profileUrl = GlobalComponent.profilPath;
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.apiRest.getEmployeeById(this.employeeId)
                 .subscribe((employee: any) => {
                   this.employeeData = employee;
                 },
                error =>{
                  this.errorHandlerService.handleHttpError(error);
                });

    this._recentStatisticsChart('["bg-custom-500", "bg-purple-500"]');
    this.documentdata = DocumentsData,
      this.projectsdata = ProjectsData,
      this.followersData = FollowersData

  }






 olderness(dates: string): any{
  const date = this.dateParse.parseDate(dates);
  const today = new Date();
  let years = today.getFullYear() - date.getFullYear();
 const montDiff = today.getMonth() - date.getMonth();

 if (montDiff < 0 || (montDiff === 0 && today.getDate() < date.getDate())){
      years --;
 }
  return years+":"+ montDiff;
 }


  isEmployeeDateEmpty(){
    this.alert.info('Aucun employée trouvé');
  }



  getOneUser(id: string): void {
    this.apiRestUser.getOneUser(id).subscribe(
      (user) => {
        this.user = user;
        this.populateForm(this.user);
      },
      (error) => {
        this.errorHandlerService.handleHttpError(error);
      }
    );
  }

  populateForm(user: any): void {
    this.activateForm.patchValue({
  
    });

  }


onSubmit(idUser: string){
const userData = new FormData();

if(this.activateForm.get('password')?.value != this.activateForm.get('repassword')?.value){

  this.alert.warning('Le mot de passe ne correspond pas');
} else {
const user = this.activateForm.value;
userData.append('user', JSON.stringify(user));
userData.append('idUser', idUser);

this.apiRestUser.activateUser(userData)
    .subscribe(Response => {
      console.log(Response);
      if(Response = 300 ){
        this.modalService.open('codeModal');
        this.modalService.close('activateEmployeeModal');
      }
    })
  }
}


onSend(){
  const codeData = new FormData();
  const code = this.codeSend.value;
  codeData.append('code', JSON.stringify(code));
  this.apiRestUser.codeSender(codeData)
      .subscribe(Response => {
        console.log(Response);
        if(Response = 8000 ){
          this.modalService.close('codeModal');
          this.alert.success('Le compte est activé');
        }
      })
      
}

  /**
 * Recent Statistics Chart
 */
  private _recentStatisticsChart(colors: any) {
    colors = getChartColorsArray(colors);
    this.recentStatisticsChart = {
      series: [{
        name: 'Following',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 87, 72]
      }, {
        name: 'Followers',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 105, 91]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      colors: colors,
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      fill: {
        opacity: 1
      },
    }

  }



  loadEmployeeData(): void {

    this.employeeData = {
      idEmployee: '1',
      matriculateEmployee: '12345',
      firstNameEmployee: 'John',
      lastNameEmployee: 'Doe',
      sex: 'M',
      phoneEmployee: 1234567890,
      emailPersonalEmployee: 'john.doe@example.com',
      emailProfessionalEmployee: 'j.doe@company.com',
      photoEmployee: 'photo.jpg',
      dateOfBirthEmployee: '01/01/1990',
      accademyDegreeOfEmployee: 'Bachelor',
      serviceConcern: 'IT',
      statusOfemployee: 'Active',
      dateOfRecruitement: '01/01/2022',
      hourOfRecruitement: '09:00',
      directorGeneral: 'Jane Smith',
      streetOfEmployee: '123 Main St',
      numberStreetOfEmployee: '123',
      neighborhoodOfEmployee: 'Downtown',
      cityOfEmployee: 'Metropolis',
      stateOfEmployee: 'NY',
      nationalityEmployee: 'American',
      countryOfEmployee: 'USA',
      createdEmployeeBy: 'Admin',
      diplomaEmployee: [],
      curriculumAndResumeEmployee: null,
      signatureEmployee: null
    };
  }





}
