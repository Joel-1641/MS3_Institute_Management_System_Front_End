import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor() { }
  
// showstudents() {
// this.router.navigate(['/students'])
// }

  totalMessages =[5]

  recentMessages=[
    {
      "id": 1,
      "senderName": "Marie Claire",
      "content": "Hey, how are you?",
      "timestamp": "2024-12-07T12:34:56Z",
      "senderAvatar": "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      "status": "unread"
    },
    {
      "id": 3,
      "senderName": "Heather Wright",
      "content": "Your registration is confirmed!",
      "timestamp": "2024-12-05T08:10:15Z",
      "senderAvatar": "https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      "status": "read"
    },
    {
      "id": 3,
      "senderName": "Heather Wright",
      "content": "Your registration is confirmed!",
      "timestamp": "2024-12-05T08:10:15Z",
      "senderAvatar": "https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      "status": "read"
    },
    {
      "id": 3,
      "senderName": "Heather Wright",
      "content": "Your registration is confirmed!",
      "timestamp": "2024-12-05T08:10:15Z",
      "senderAvatar": "https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      "status": "read"
    },
    {
      "id": 3,
      "senderName": "Joel",
      "content": "Your registration is confirmed!",
      "timestamp": "2024-12-05T08:10:15Z",
      "senderAvatar": "https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      "status": "unread"
    }
  ];
  
}
