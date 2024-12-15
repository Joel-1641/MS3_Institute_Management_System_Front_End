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
		  text: "Monthly Sales Data"
	  },
	  theme: "light2",
	  animationEnabled: true,
	  exportEnabled: true,
	  axisY: {
		includeZero: true,
		valueFormatString: "$#,##0k"
	  },
	  data: [{
		type: "column", //change type to bar, line, area, pie, etc
		yValueFormatString: "$#,##0k",
		color: "#01b8aa",
		dataPoints: [
			{ label: "Jan", y: 172 },
			{ label: "Feb", y: 189 },
			{ label: "Mar", y: 201 },
			{ label: "Apr", y: 240 },
			{ label: "May", y: 166 },
			{ label: "Jun", y: 196 },
			{ label: "Jul", y: 218 },
			{ label: "Aug", y: 167 },
			{ label: "Sep", y: 175 },
			{ label: "Oct", y: 152 },
			{ label: "Nov", y: 156 },
			{ label: "Dec", y: 164 }
		]
	  }]
	}
}  