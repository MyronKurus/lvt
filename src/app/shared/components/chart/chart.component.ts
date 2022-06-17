import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  lineStylesData: any;

  public config = {
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          drawBorder: false,
          color: 'orange'
        },
      }
    }
  };

  constructor() {
  }

  ngOnInit() {
    this.lineStylesData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5'
        },
        {
          drawTicks: false,
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          borderColor: '#66BB6A',
        },
      ]
    };
  }

}
