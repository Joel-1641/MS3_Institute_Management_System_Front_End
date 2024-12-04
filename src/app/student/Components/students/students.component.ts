import { Component, OnInit, signal } from '@angular/core';
import { MainService } from '../../Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  constructor(public service:MainService){}
  students:any;
  deleteShow:boolean = false;
  deleteAnswer = false;
  ngOnInit(): void {
    this.get_All_Students();
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
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.service.deleteStudent(id).subscribe({
          next:()=>{this.students = this.students.filter((s: any)=> s.id !== id)}
        });
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        )
      }
    })
  }
  get_All_Students(){
    this.service.getAllStudents().subscribe({
      next:(data)=>{
        // console.log(data);
        this.students = data;
      },
      error:(err)=>console.log(err)
    });
  }
  clickYes(){
    // console.log('yessss');
    this.deleteAnswer = true;
    this.deleteShow = false;
  }
  clickNo(){
    this.deleteAnswer = false;
    this.deleteShow = false;
  }
}
