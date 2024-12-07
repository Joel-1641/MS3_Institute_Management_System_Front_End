import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  imports: [CommonModule]
})
export class AnalyticsComponent {
  // Sample data for Analytics
  analyticsCards = [
    {
      title: 'Budget',
      value: '$750.90',
      icon: 'bi bi-credit-card',
      iconClass: 'bg-tertiary text-white text-lg rounded-circle',
      trendClass: 'bg-soft-success text-success',
      trendIcon: 'bi bi-arrow-up',
      trendValue: '13%',
      trendText: 'Since last month'
    },
    {
      title: 'New Projects',
      value: '215',
      icon: 'bi bi-people',
      iconClass: 'bg-primary text-white text-lg rounded-circle',
      trendClass: 'bg-soft-success text-success',
      trendIcon: 'bi bi-arrow-up',
      trendValue: '30%',
      trendText: 'Since last month'
    }
  ];
}  