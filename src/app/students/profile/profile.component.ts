import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  student: any = {
    name: '',
    phone: '',
    address: '',
    photoUrl: '',
    courses: [],
  };
  studentId: number =  Number(localStorage.getItem('UserId')); // Dynamically set this value.

  constructor(private studentService: StudentService,private authService: AuthService ) {}
  
  ngOnInit(): void {
    this.fetchStudentData();
  }

  fetchStudentData(): void {
    this.studentService.getStudentById(this.studentId).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  openProfileModal(): void {
    const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
    profileModal.show();
  }

  openAccountModal(): void {
    const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
    accountModal.show();
  }

  saveProfileChanges(): void {
    this.studentService.updateStudent(this.studentId, this.student).subscribe(
      (response) => {
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }


  updatePassword(newPassword: string, confirmPassword: string): void {}


  // updatePassword(newPassword: string, confirmPassword: string): void {
  //  if (newPassword !== confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }

  //   this.studentService.updatePassword(this.studentId, { password: newPassword }).subscribe(
  //     (response) => {
  //       alert('Password updated successfully!');
  //     },
  //     (error) => {
  //       console.error('Error updating password:', error);
  //     }
  //   );
  // } 
}



