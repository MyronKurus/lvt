import {Component, OnInit} from '@angular/core';

import {Subject} from "rxjs";

import {Chart} from 'chart.js';
import chartAnnotationPlugin from 'chartjs-plugin-annotation';

import {StockIndex} from "../../models/stock-index.model";
import {SelectedIndexes} from "../../models/selected-indexes.model";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  cancel$: Subject<void> = new Subject<void>();
  ctx: any;
  isCollapsed = true;
  isMobile = false;
  showInfoBox = false;
  config: any;
  lineStylesData: any;
  tooltip: any;
  mobileTooltipsArray: any[] = [];

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

  constructor() {
    Chart.register(chartAnnotationPlugin);
  }

  ngOnInit() {
    this.checkAgentType();

    this.config = {
      // animation: {
      //   onComplete: function(e: any) {
      //     const chartArea = e.chart.chartArea;
      //     const metaSet = e.chart['_metasets'][0];
      //     const data = metaSet.data;
      //     const someShit = 4;
      //     let startX = 0;
      //     let endX = 0;
      //
      //     data.forEach((item: any, i: number) => {
      //       if (i === someShit) {
      //         startX = item.x;
      //       }
      //
      //       if (i == someShit + 1) {
      //         endX = item.x;
      //       }
      //     });
      //
      //     const chartBox = document.getElementById('lvt-chart-box');
      //     const shitEl = document.getElementById('chartJs-shit');
      //
      //     if (chartBox && shitEl) {
      //       shitEl.style.display = 'block';
      //       const position = chartBox.clientWidth / 2 - startX > 0 ? 'left' : 'right';
      //
      //       shitEl.classList.add(position);
      //       shitEl.style.width = `${endX - startX}px`;
      //       shitEl.style.height = `${chartArea.height}px`;
      //       shitEl.style.left = `${startX}px`;
      //       shitEl.style.top = `${chartArea.top}px`;
      //       shitEl.style.background = 'rgba(230, 233, 239, 1)';
      //     }
      //   }
      // },
      datasets: {
        line: {
          spanGaps: true,
          pointBorderWidth: 0,
          pointBackgroundColor: 'transparent',
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      scales: {
        x: {
          grid: {
            drawBorder: true,
            display: false
          },
        },
        y: {
          min: -2,
          max: 6,
          grid: {
            drawBorder: true,
            color: 'rgba(229,229,229,0.65)',
          },
        }
      },
      plugins: {
        legend: {
          display: false
        },
        annotation: {
          drawTime: 'beforeDatasetsDraw',
          annotations: [
            {
              type: 'line',
              yMin: 0,
              yMax: 0,
              borderColor: 'rgba(29,24,95,0.51)',
              borderWidth: 1,
            }
          ]
        },
        tooltip: this.tooltip,
      }
    };

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
          pointHoverBackgroundColor: '#37ae9b',
        },
        {
          label: 'Third Third Third',
          data: [0, 0.75, 1.5, 2.05, 3.5, 4.85, 5.35, 4.45, 4, 4.25, 3.50, 3.30, 3.75],
          borderWidth: 1,
          borderColor: '#3e83d1',
          pointHoverBackgroundColor: '#3e83d1',
        },
        {
          label: 'Four',
          data: [0, 1.25, 2, 2.45, 3.25, 3.85, 3.65, 3.4, 2.5, 2.75, 2.45, 2.30, 2.20],
          borderWidth: 1,
          borderColor: '#f2866a',
          pointHoverBackgroundColor: '#f2866a',
        },
      ]
    };

    this.setMobileTooltipsArray();
  }

  public onIndexChange(value: SelectedIndexes): void {
    console.log(value);
  }

  public onExpand(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public onCancelIndexes(): void {
    this.onExpand();
    this.cancel$.next();
  }

  public closeMobileTooltipsView(): void {
    const tooltipsWrapper = document.querySelector('.mobile-tooltips__wrapper');

    if (tooltipsWrapper) {
      tooltipsWrapper.classList.remove('mobile-tooltips__wrapper--show');
    }
  }

  private setCustomTooltip(context: any): void {
    const yAxis = context.chart.chartArea;
    const tooltipModel = context.tooltip;
    const isMobile = window.innerWidth < 624;

    let tooltipEl = document.getElementById('chartjs-tooltip');
    let verticalLineEL = document.getElementById('chartjs-vertical-line');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = '<table class="tooltip-table"></table>';
      document.body.appendChild(tooltipEl);
    }

    if (!verticalLineEL) {
      verticalLineEL = document.createElement('div');
      verticalLineEL.id = 'chartjs-vertical-line';
      verticalLineEL.className = 'tooltip-vertical-line';
      document.body.appendChild(verticalLineEL);
    }

    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = '0';
      verticalLineEL.style.opacity = '0';
      return;
    }

    function getBody(bodyItem: any) {
      return bodyItem.lines;
    }

    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(getBody);

      let innerHtml = '<thead class="tooltip-table__head">';

      titleLines.forEach(function (title: any) {
        // innerHtml += '<tr><th>' + title + '</th></tr>';
        innerHtml += '<tr><th><span class="tooltip-table__title">עד 30.11.21  |  שווי תיק:  <strong>454,125</strong> ₪</span></th></tr>';
      });
      innerHtml += '</thead><tbody class="tooltip-table__body">';

      bodyLines.forEach(function (body: any, i: any) {
        body = body[0].split(':');
        const colors = tooltipModel.labelColors[i];
        let style = 'background:' + colors.borderColor;
        const span = '<span class="tooltip-pin" style="' + style + '"></span>';
        innerHtml += `<tr>
                        <td>${span} <p class="name">${body[0]}</p>
                            <p class="to-end">${body[1].trim()}%</p>
                        </td>
                      </tr>`;
      });
      innerHtml += '</tbody>';

      let tableRoot = tooltipEl.querySelector('table');
      // @ts-ignore
      tableRoot.innerHTML = innerHtml;
    }

    const position = context.chart.canvas.getBoundingClientRect();
    const offsetDiff = tooltipModel.xAlign === 'left' ? 0 : 250;
    const leftPosition = position.left - offsetDiff + window.scrollX + tooltipModel.caretX;

    tooltipEl.style.opacity = isMobile ? '0' : '1';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = leftPosition + 'px';
    tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
    tooltipEl.style.transform = 'translate(10px, -50%)';
    tooltipEl.style.pointerEvents = 'none';

    verticalLineEL.style.opacity = '1';
    verticalLineEL.style.height = yAxis.height + 'px';
    verticalLineEL.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
    verticalLineEL.style.top = position.top + window.scrollY + yAxis.top + 'px';
  }

  private selectCurrentDataset(datasets: Array<any>): void {
    const dataIndex = datasets[0].dataIndex;
    const tooltipsWrapper = document.querySelector('.mobile-tooltips__wrapper');

    if (tooltipsWrapper) {
      tooltipsWrapper.classList.add('mobile-tooltips__wrapper--show');
      const tooltipsItems = tooltipsWrapper.querySelectorAll('.tooltip-table');
      const tooltipItem = tooltipsItems[dataIndex];
      tooltipsItems.forEach((item, index) => {
        if (dataIndex !== index) {
          item.classList.remove('tooltip-table--selected');
        }
      });
      tooltipItem.classList.add('tooltip-table--selected');
      let offsetNumber = (dataIndex * tooltipsItems[dataIndex].clientWidth) + (dataIndex * 12) - 40;
      if (dataIndex === 0) {
        offsetNumber = 0;
      } else if (dataIndex + 1 === tooltipsItems.length) {
        offsetNumber -= 40;
      }

      tooltipsWrapper.setAttribute('style', `transform: translateX(-${offsetNumber}px)`);
    }
  }

  private checkAgentType(): void {
    this.isMobile = window.innerWidth < 624;
    if (this.isMobile) {
      this.tooltip = {
        enabled: false,
        external: this.setCustomTooltip,
        callbacks: {
          title: this.selectCurrentDataset
        }
      }

      return;
    }

    this.tooltip = {
      enabled: false,
      external: this.setCustomTooltip,
    };
  }

  private setMobileTooltipsArray(): void {
    const datasetLength = this.lineStylesData.datasets.length;
    const dataLength = this.lineStylesData.datasets[0].data.length;

    for (let i = 0; i < dataLength; i++) {
      let sum = 0;
      let dataInfo = [];

      for (let j = 0; j < datasetLength; j++) {
        const dataSet = this.lineStylesData.datasets[j];
        sum += dataSet.data[i];
        dataInfo.push({
          label: dataSet.label,
          color: dataSet.borderColor,
          value: dataSet.data[i],
        });
      }

      this.mobileTooltipsArray.push({
        sum: sum,
        data: dataInfo
      });
    }
  }
}
