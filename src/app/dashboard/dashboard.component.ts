import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeMenu: string = 'dashboard'; // Default active menu

  setActiveMenu(menu: string): void {
    this.activeMenu = menu;
  }

  tableData = [
    {
      name: 'Robert Fox',
      date: 'Feb 15, 2021',
      courceName: 'WEB DEV',
      amount: 3500,
      Offer: '15%',
      status: 'Scheduled',
      Payment: 'Done',
      statusClass: 'bg-success',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
    {
      name: 'Robert Fox',
      date: 'Feb 15, 2021',
      courceName: 'WEB DEV',
      amount: 3500,
      Offer: '15%',
      status: 'Scheduled',
      Payment: 'Done',
      statusClass: 'bg-success',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
    {
      name: 'Robert Fox',
      date: 'Feb 15, 2021',
      courceName: 'WEB DEV',
      amount: 3500,
      Offer: '15%',
      status: 'Scheduled',
      Payment: 'Done',
      statusClass: 'bg-success',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    }

  ];

  // Function to add new row

  

  // Function to delete a row
  deleteRow(index: number) {
    this.tableData.splice(index, 1);
  }
  
}
