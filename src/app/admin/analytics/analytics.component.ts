import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  imports: [CommonModule, CanvasJSAngularChartsModule]
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


  chartOptions = {
    title: {
      text: "Course Details",
      fontFamily: "Arial, sans-serif",
      fontSize: 24,
      fontWeight: "bold",
      fontColor: "#4a4a4a",
      margin: 10,
      padding: 10,
      backgroundColor: "#f4f4f4",
      cornerRadius: 5
    },
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    axisY: {
      includeZero: true,
      valueFormatString: "$#,#0",
      gridColor: "#d9d9d9",
      labelFontColor: "#606060",
      lineThickness: 2
    },
    axisX: {
      labelAngle: -30,
      labelFontSize: 14,
      labelFontColor: "#606060",
      lineThickness: 2
    },
    toolTip: {
      shared: true,
      content: "{label}: {y} Enrolled"
    },
    data: [
      {
        type: "column",
        indexLabelFontSize: 14,
        indexLabel: "{y}",
        indexLabelPlacement: "outside",
        color: "#01b8aa",
        dataPoints: [
          { label: "Database Management", y: 3 },
          { label: "Security and Networking", y: 5 },
          { label: "Web Development", y: 3 },
          { label: "Data and AI", y: 4 },
          { label: "Cloud and DevOps", y: 3 }
        ]
      }
    ]
  };
}