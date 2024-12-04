import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm!: FormGroup;
  studentId!: number;
  student!: any;
  constructor(private service:MainService,
    private router:Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    // console.log(this.activatedRoute.routeConfig?.path);
    if(this.activatedRoute.snapshot.params['id']){
      console.log('update')
      this.studentId = this.activatedRoute.snapshot.params['id'];
      this.getStudentById(this.studentId);
      this.initFormAdd();
    }else{
      console.log('add')
      this.initFormAdd();
    }
  }
  
  initFormAdd() {
    this.studentForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      age: [null, [Validators.required, Validators.min(10), Validators.max(30)]],
      address: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern(/[0-9]{11}$/)]],
    })
  }

  initFormUpdate() {
    this.studentForm = this.formBuilder.group({
      name: [this.student.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      age: [this.student.age, [Validators.required, Validators.min(10), Validators.max(30)]],
      address: [this.student.address, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: [this.student.email, [Validators.required, Validators.email]],
      mobile: [this.student.mobile, [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
    })
  }

  getStudentById(id: number){
    this.student = this.service.getStudentById(id).subscribe({
      next: (std) => {
        this.student = std;
        this.initFormUpdate();
      },
      error: (err) => console.log(err)
    });
  }
  
  get controls() {
    return this.studentForm.controls;
  }

  submitAdd(){
    if(!this.studentId){
      if(this.studentForm.valid){
        let newStudent = this.studentForm.value;
        console.log(newStudent);
        this.service.addStudent(newStudent).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Student has been Added',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigateByUrl("students");
          }, error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `can't add, check out data again`,
              footer: '<a href="/students">Back to Home</a>'
            })
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `can't add, check out data again`,
          footer: '<a href="/students">Back to Home</a>'
        })
      }
    } else {
      if(this.studentForm.valid){
        this.service.updateStudent(this.studentId ,this.studentForm.value).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Student has been Updated',
              showConfirmButton: false,
              timer: 1500
            })
          }, error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `can't update, check out data again`,
              footer: '<a href="/students">Back to Home</a>'
            })
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `can't update, check out data again`,
          footer: '<a href="/students">Back to Home</a>'
        })
      }
    }
  }

  // submitUpdate(){
  //   if(this.studentForm.valid){
  //     this.service.updateStudent(this.studentId ,this.studentForm.value).subscribe({
  //       next: (res) => {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Student has been Updated',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //       }, error: (err) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: `can't update, check out data again`,
  //           footer: '<a href="/students">Back to Home</a>'
  //         })
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: `can't update, check out data again`,
  //       footer: '<a href="/students">Back to Home</a>'
  //     })
  //   }
  // }

}
