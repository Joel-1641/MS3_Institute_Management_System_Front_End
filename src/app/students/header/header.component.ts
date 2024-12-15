import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  notifications = [
    {
      notificationId: 1,
      message: "Student Michael Brown (NIC: 986052216v) has selected their courses and is now ready to pay.",
      isRead: false,
      createdAt: "2024-12-15T12:26:29.8832707",
      notificationType: "Enrollment",
      target: "Admin",
      studentName: "Michael Brown",
      studentNIC: "986052216v"
    }]

    constructor (private paymentservice:PaymentService){
      
    }
}
