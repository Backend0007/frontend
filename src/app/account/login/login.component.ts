import { Component } from '@angular/core';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { login } from '../../store/Authentication/authentication.actions';
import { ApiRestUser } from '../../api/apiUser/apiRestUser';
import { HttpClient } from '@angular/common/http';
import { Itoken } from '../../interfaces/Itoken';
import { GlobalComponent } from '../../global-component';
import { EncryptionData } from '../../security/encrypt';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }]
})
export class LoginComponent {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  toast: boolean = false;
  year: number = new Date().getFullYear();
  message!: String;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private store: Store,
              private apiUser: ApiRestUser,
              private http: HttpClient,
              private encryption: EncryptionData
            ) { }
          

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.f['email'].value;
    const password = this.f['password'].value;




    // Prepare the payload
    const credentials = new FormData
    credentials.append('email', email);
    credentials.append('password', password)    


    try {
      const route = '/user/connexion';
      const response = await this.http.post<Itoken>(GlobalComponent.SERVER + route, credentials).toPromise();
      
      if (response && response.bearer) {
        localStorage.setItem('bearer', response.bearer);
         this.store.dispatch(login({ email: email, password: password }));

      } else {
        this.message = "Identifiants incorrect";
        console.error('Token manquant dans la réponse');
      }
    } catch (error) {

      this.message = "Identifiants incorrect";
      console.error('Erreur lors de la connexion :', error);
      this.error = 'Erreur lors de la connexion'; // Affichage d'un message d'erreur à l'utilisateur
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
