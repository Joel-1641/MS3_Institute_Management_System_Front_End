import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit{
  studentId!:any;
  student!:any;
  constructor(private activatedRoute:ActivatedRoute, private service:MainService, private router:Router){}
  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params["id"];
    this.fetchStudentDataById(this.studentId);
  }

  updateStudent(){
    this.router.navigate([`update/${this.studentId}`])
  }

  fetchStudentDataById(id: number) {
    this.service.getStudentById(id).subscribe({
      next:(s)=>{
        this.student = s;
      },
      error: (err)=> console.log(err)
    })
  }

  deleteStudent(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteStudent(id).subscribe();
        this.router.navigate(['students']);
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        )
      }
    })
  }

}
