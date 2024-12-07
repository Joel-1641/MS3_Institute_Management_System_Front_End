import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent {
  tableData = [
    {
      name: 'Robert Fox',
      date: 'Feb 15, 2021',
      courceName: 'WEB DEV',
      amount: 3500,
      Offer: '15%',
      Payment: 'Pending',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
    {
      name: 'Robert Fox',
      date: 'Feb 15, 2021',
      courceName: 'WEB DEV',
      amount: 3500,
      Offer: '15%',
      Payment: 'Done',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
  ];

  getPaymentClass(payment: string): string {
    switch (payment) {
      case 'Done':
        return 'bg-success';
      case 'Pending':
        return 'bg-danger';
      case 'Failed':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }
  
}
