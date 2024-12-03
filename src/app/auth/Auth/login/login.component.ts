import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signInService: AuthService,
    private toastr: ToastrService,
    private rout:Router
  ) {
      this.signinForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          rememberMe:['']
      });
  }
  onSubmit() {
    this.signInService.UserSignIn(this.signinForm.value).subscribe({
      next:(response:any) => {
        localStorage.setItem("token" , response);
        const token: string = localStorage.getItem('token')!;
        const decode: any = jwtDecode(token);
        localStorage.setItem("Role", decode.Role)
        this.toastr.success("User Login Successfully.." , "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        });
        if(decode.Role == "Admin") {
          this.rout.navigate(['/manager/home']);
        } else if (decode.Role == "Customer") {
          this.rout.navigate(['/customer']);
        }
       
      },complete:()=>{

        
      },error:(error:any)=>{
        this.toastr.warning( error.error, "" , {
          positionClass:"toast-top-right",
          progressBar:true,
          timeOut:4000
        })
      }
    })
  }
}

