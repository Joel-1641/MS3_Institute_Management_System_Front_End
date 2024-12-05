import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courseadd',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl:'./courseadd.component.html',
  styleUrl: './courseadd.component.css'
})
export class CourseaddComponent {
  public CourseForm!: FormGroup;
  public courseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.initializeForm();
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
  }

  private initializeForm() {
    this.CourseForm = this.fb.group({
      courseName: ['', Validators.required],
      level: ['', Validators.required],
      courseFee: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  get courseName() {
    return this.CourseForm.get('courseName');
  }

  get level() {
    return this.CourseForm.get('level');
  }

  get courseFee() {
    return this.CourseForm.get('courseFee');
  }

  get description() {
    return this.CourseForm.get('description');
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe(
        (data) => {
          this.CourseForm.patchValue(data);
        },
        (error) => {
          this.toastr.warning(
            'Error fetching course: ' + error.error.message,
            '',
            {
              positionClass: 'toast-top-right',
              progressBar: true,
              timeOut: 4000,
            }
          );
        }
      );
    }
  }

  addCourse() {
    if (this.CourseForm.valid) {
      this.courseService.addCourse(this.CourseForm.value).subscribe(
        () => {
          this.toastr.success('Course added successfully!', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 4000,
          });
          this.router.navigate(['/admin/course-list']);
        },
        (error) => {
          this.toastr.warning(
            'Error adding course: ' + error.error.message,
            '',
            {
              positionClass: 'toast-top-right',
              progressBar: true,
              timeOut: 4000,
            }
          );
        }
      );
    }
  }

  updateCourse() {
    if (this.CourseForm.valid && this.courseId) {
      const updatedCourse = { ...this.CourseForm.value, id: this.courseId };
      this.courseService.updateCourse(this.courseId, updatedCourse).subscribe(
        () => {
          this.toastr.success('Course updated successfully!', '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 4000,
          });
          this.router.navigate(['/admin/course-list']);
        },
        (error) => {
          this.toastr.warning(
            'Error updating course: ' + error.error.message,
            '',
            {
              positionClass: 'toast-top-right',
              progressBar: true,
              timeOut: 4000,
            }
          );
        }
      );
    }
  }
}
