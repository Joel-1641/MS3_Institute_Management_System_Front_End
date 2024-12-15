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
		  text: "Course Details"
	  },
	  theme: "light2",
	  animationEnabled: true,
	  exportEnabled: true,
	  axisY: {
		includeZero: true,
		valueFormatString: "$#,$0"
	  },
	  data: [{
		type: "column", //change type to bar, line, area, pie, etc
		// yValueFormatString: "$#,$0",
		color: "#01b8aa",
		dataPoints: [
			{ label: "Database Management", y: 3 },
			{ label: "Security and Networking", y: 5 },
			{ label: "Web Development", y: 3},
			{ label: "Data and AI", y: 4 },
			{ label: "Cloud and DevOps", y: 3},
			
		]
	  }]
	}
}  