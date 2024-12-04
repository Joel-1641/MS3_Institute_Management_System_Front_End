import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchMessages();
  }

  // fetchMessages(): void {
  //   // Replace 'http://your-api-endpoint/messages' with your actual API endpoint
  //   this.http.get<any[]>('http://your-api-endpoint/messages')
  //     .subscribe(data => {
  //       this.messages = data;
  // });

  // }
}
