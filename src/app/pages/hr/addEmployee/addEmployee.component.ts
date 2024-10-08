import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { Store } from '@ngrx/store';
import { NgxDatatableModule } from '@siemens/ngx-datatable';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { MDModalModule } from '../../../Component/modals';
import { FlatpickrModule } from '../../../Component/flatpickr/flatpickr.module';
import { NGXPagination } from '../../../Component/pagination';
import { RouterLink } from '@angular/router';
import { FormBuilder,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiRest } from '../../../api/apiEmployee/ApiRest';
import { Alert } from '../../alert/Alert';
import { GenerateRandom } from '../../../utils/GenerateRandom';
import { ErrorHandlerService } from '../../../service/errorManagement/ErrorHandlerService';
import { ListRoles } from '../../../data/data-utils/listRoles';
import { ApiRestDisponibility } from '../../../api/apiDisponibility/ApiRestDisponibility';



@Component({
  selector: 'app-addEmployee',
  standalone: true,
  imports: [CommonModule, PageTitleComponent, NgxDatatableModule, LucideAngularModule, NGXPagination, MDModalModule, FlatpickrModule, RouterLink,ReactiveFormsModule,NgClass],
  templateUrl: './addEmployee.component.html',
  styles: ``,
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }]
})
export class AddEmployeeComponent {
  public registerFormEmployee!: FormGroup;
  private imagePath: any;
  trackerEmployeeById: string = "";
  employes: any;
  allemployee: any;
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalItems: number = 0;
  startIndex: number = 0;
  endIndex: any;
  imgUrl: any;
  userFile: any;
 

  private store = inject(Store);


  constructor(
    private fb: FormBuilder,
    private apiRest: ApiRest,
    private alert: Alert,
    private randomId: GenerateRandom,
    private errorHandlerService: ErrorHandlerService,
    private listRoles: ListRoles,
    private apiRestDisponibility: ApiRestDisponibility
  ){}

  ngOnInit(): void {
    const roles = this.listRoles;

    this.imgUrl = 'assets/images/users/user-dummy-img.jpg';

    this.registerFormEmployee = this.fb.group({
      firstNameEmployee: '',
      lastNameEmployee: '',
      sex: '',
      phoneEmployee: '',
      emailPersonalEmployee: '',
      emailProfessionalEmployee: '',
      photoEmployee: '',
      dateOfBirthEmployee: '',
      accademyDegreeOfEmployee: '',
      serviceConcern: '',
      placeOfWork: '',
      statusOfemployee: '',
      directorGeneral: 'false',
      streetOfEmployee: '',
      numberStreetOfEmployee: '',
      neighborhoodOfEmployee: '',
      cityOfEmployee: '',
      stateOfEmployee: '',
      nationalityEmployee: '',
      countryOfEmployee: '',
      createdEmployeeBy: ''

    });

    // Fetch Data
    setTimeout(() => {
      this.apiRest.fetchEmployee()
      .subscribe(
        (dataEmployee: any) => {
        this.employes = dataEmployee
        this.allemployee = dataEmployee
        this.totalItems = this.employes.length;
      });
    }, 100)
  }

// fin de la methode onInit ----------------------------------------------------------------------------------------

test(){
  this.apiRestDisponibility.checkConnexion();
}

sendData(){
 const formData = new FormData();
 const employee = this.registerFormEmployee.value;
 formData.append('employee', JSON.stringify(employee));
 formData.append('photo',this.userFile);

 this.apiRest.saveEmployee(formData)
     .subscribe(Response => {
      console.log(Response)
      switch(Response){
        case 20000:
          this.alert.success(this.registerFormEmployee.get('firstNameEmployee')?.value+"-"+this.registerFormEmployee.get('lastNameEmployee')?.value+" "+'Enregistré avec succes');
          this.registerFormEmployee.reset();
          this.userFile = null;
          this.imgUrl = 'assets/images/users/user-dummy-img.jpg';
          break;
        case 20003:
          this.alert.info(this.registerFormEmployee.get('emailPersonalEmployee')?.value+" "+', cet e-mail personnel existe');
          break;
        case 20033:
          this.alert.info(this.registerFormEmployee.get('emailProfessionalEmployee')?.value+" "+', cet e-mail professionnel existe');
          break;

        case 20011:
          this.alert.warning('cet employé existe');
          this.registerFormEmployee.reset();
          this.userFile = null;
          this.imgUrl = 'assets/images/users/user-dummy-img.jpg';
          break;  
        case 20055:
          this.alert.warning('le PDG existe déjà');
          break;
      }


     }, error => {
      this.errorHandlerService.handleHttpError(error);
     });
}


onFileLoad(event: any): void{
 if(event.target.files.length > 0){

  const file = event.target.files[0];
 const randomId = this.randomId.generateRandomId(16);
  const fileName = randomId+file.name;
  this.userFile = file;
  this.registerFormEmployee.get('photoEmployee')?.patchValue(fileName);

  var mimeType = event.target.files[0].type;
  if(mimeType.match(/image\/*/) == null){
    console.log('Only images are supported');
    return;
  }

  var reader = new FileReader();
  this.imagePath = file;
  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    this.imgUrl = reader.result;
  }
 }
}

loadId(idEmployee: string){
this.trackerEmployeeById = idEmployee;
}

sendId(id: string){
this.apiRest.deleteEmployee(id)
    .subscribe(Response =>{
      switch(Response){
        case 30000:
          this.closeModalDelete()
          this.alert.success('Suppression avec succès');
          
          break;
        case 30001:
          this.alert.warning('Suppression échouée');
          break;
      }
      
    },
  error => {
    this.errorHandlerService.handleHttpError(error);
  })
}

closeModalDelete(){
  const modalDelete = document.getElementById('deleteModal');
  if(modalDelete){
    modalDelete.style.display = 'none';
    window.location.reload();
  }
}
 



  // Pagination
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePagedOrders();
  }

  getEndIndex() {
    return Math.min(this.startIndex + this.itemsPerPage, this.totalItems)
  }

  updatePagedOrders(): void {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.employes = this.allemployee.slice(this.startIndex, this.endIndex);
  }

  columns = [
   
    { name: 'Matricule', prop: 'matriculateEmployee' },
    { name: 'Nom ', prop: 'firstNameEmployee' },
    { name: 'Prénom ', prop: 'lastNameEmployee' },
    { name: 'Poste', prop: 'statusOfemployee' },
    { name: 'Télephone', prop: 'phoneEmployee' },
    { name: 'E-mail professionnel', prop: 'emailProfessionalEmployee' },
    { name: 'E-mail personnel', prop: 'emailPersonalEmployee' },
    { name: 'Service', prop: 'serviceConcern' },
    { name: 'Date d\'entrée', prop: 'dateOfRecruitement' },
    { name: 'Date d\'entrée', prop: 'hourOfRecruitement' },
    { name: 'Action', prop: 'idEmployee' },
  ]
}
