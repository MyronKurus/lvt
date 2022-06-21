import { Component, OnInit } from '@angular/core';
import {SelectedIndexes} from "../../models/selected-indexes.model";
import {StockIndex} from "../../models/stock-index.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  cancel$: Subject<void> = new Subject<void>();
  isCollapsed = true;
  lineStylesData: any;
  indexes: StockIndex[] = [
    {
      name: "Some Index One",
      values: ['125', '9.05% 90', 'S&P500', 'Nasdaq 100', 'Eurostoxx 600', 'Eurostoxx 50', 'MSCI World'],
    },
    {
      name: "Some Index Two",
      values: ['S&P500', 'Nasdaq 100', 'Eurostoxx 600', 'Eurostoxx 50', 'Bloomberg US Agg TR'],
    },
    {
      name: "Some Index Three",
      values: ['125', '35'],
    }
  ];

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

  public onIndexChange(value: SelectedIndexes): void {
    console.log(value);
  }

  public onExpand(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public onCancelIndexes(): void {
    this.cancel$.next();
  }

}
