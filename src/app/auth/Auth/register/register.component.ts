import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, SignUp } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;
  submitted = false;
  passwordsMatch: boolean = true;
 
  constructor(
    private formBuilder: FormBuilder,
    private signUpService: AuthService,
    private toastr: ToastrService,
    private rout:Router
  ) {
      this.signupForm = this.formBuilder.group({
          fullname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          role: ['', Validators.required],
          terms: [false, Validators.requiredTrue]
      })
  }
  get fullname() { return this.signupForm.get('fullname'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get role() { return this.signupForm.get('role'); }
  get terms() { return this.signupForm.get('terms'); }

  onSubmit() {
    var User = this.signupForm.value

    var isPasswordMatch:boolean = this.passwordMatch(User.password ,  this.signupForm.value.confirmPassword) 
    if(isPasswordMatch){
      const AddUser:SignUp = {
      name:User.fullname,
        email:User.email,
        password:User.password,
        role:Number(User.role)
      }
      this.signUpService.UserSignUp(AddUser).subscribe({
        next:(response) =>{
          this.toastr.success("User SignUp Successfully.." , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:4000
          })
        },complete:()=>{
          this.rout.navigate(['/login'])
        },error:(error)=>{
          console.log(error)
          this.toastr.warning(error.error , "" , {
            positionClass:"toast-top-right",
            progressBar:true,
            timeOut:4000
          })
        }
      })
    }else{
      this.toastr.warning("password not match.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    }
    
  }

  passwordMatch(password:string , confirmPassword:string):boolean{
    if(password != confirmPassword){
      return false
    }else{
      return true
    }
  }


  checkPasswords(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }

}


