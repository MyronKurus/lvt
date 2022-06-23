import {Component, OnInit} from '@angular/core';
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
    responsive: true,
    stacked: true,
    datasets: {
      line: {
        spanGaps: true,
        pointBorderWidth: 0,
        pointBackgroundColor: 'transparent',
      }
    },
    scales: {
      x: {
        grid: {
          drawBorder: true,
          display: false,
        }
      },
      y: {
        grid: {
          drawBorder: true,
          color: '#e5e5e5'
        },
      }
    }
  };

  constructor() {
  }

  ngOnInit() {
    this.lineStylesData = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
      datasets: [
        {
          label: 'First',
          data: [0, -0.25, -1, 0.45, 0.25, 0.85, -0.35, 0.4, 0, 0.25, 0.20, 0.30, 0.20],
          borderColor: '#19295f',
          pointBorderWidth: 2,
          pointBackgroundColor: '#19295f',
          pointHoverBorderWidth: 4
        },
        {
          label: 'Second',
          data: [0, 0.25, 1, 1.45, 1.25, 1.85, 2.35, 2.4, 3, 3.25, 2.50, 1.30, 0.75],
          borderWidth: 1,
          borderColor: '#37ae9b',
        },
        {
          label: 'Third',
          data: [0, 0.75, 1.5, 2.05, 3.5, 4.85, 5.35, 4.45, 4, 4.25, 3.50, 3.30, 3.75],
          borderWidth: 1,
          borderColor: '#3e83d1',
        },
        {
          label: 'Four',
          data: [0, 1.25, 2, 2.45, 3.25, 3.85, 3.65, 3.4, 2.5, 2.75, 2.45, 2.30, 2.20],
          borderWidth: 1,
          borderColor: '#f2866a',
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
