import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from "@angular/common";

import {Subject} from "rxjs";

import {Chart} from 'chart.js';
import chartAnnotationPlugin from 'chartjs-plugin-annotation';

import {Portfolio} from "../../models/portfolio.model";
import {IndexCollection} from "../../models/index.model";
import {SelectedIndexes} from "../../models/selected-indexes.model";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  cancel$: Subject<void> = new Subject<void>();
  ctx: any;
  isCollapsed = true;
  isMobile = false;
  showInfoBox = false;
  config: any;
  lineStylesData: any;
  tooltip: any;
  mobileTooltipsArray: any[] = [];
  @Input() stockIndexes: IndexCollection[] | undefined;
  @Input() portfolio: Portfolio | undefined;

  constructor(private cdr: ChangeDetectorRef,
              private datePipe: DatePipe) {
    Chart.register(chartAnnotationPlugin);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkAgentType();

    if (this.portfolio) {
      this.lineStylesData = {
        labels: this.setLabels(this.portfolio.periodYield),
        datasets: [
          {
            label: 'תקופה',
            data: this.setDataset(this.portfolio.periodYield),
            borderColor: '#19295f',
            pointBorderWidth: 2,
            pointBackgroundColor: '#19295f',
            pointHoverBorderWidth: 4
          },
        ]
      };

      this.setMobileTooltipsArray();
      this.cdr.markForCheck();
    }
  }

  ngOnInit() {
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
  }

  public onIndexChange(value: SelectedIndexes): void {
    const dataSets: any[] = [];

    this.stockIndexes?.forEach(item => {
      const foundRes = item.indices.find(indicate => {
        if (indicate.indexName === value.indexOne) {
          dataSets.push({
            label: value.indexOne,
            data: this.setDataset(indicate.periodIndexesYield),
            borderWidth: 1,
            borderColor: '#f2866a',
            pointHoverBackgroundColor: '#f2866a',
          });
        } else if (indicate.indexName === value.indexTwo) {
          dataSets.push({
            label: value.indexTwo,
            data: this.setDataset(indicate.periodIndexesYield),
            borderWidth: 1,
            borderColor: '#3e83d1',
            pointHoverBackgroundColor: '#3e83d1',
          });
        } else if (indicate.indexName === value.indexThree) {
          dataSets.push({
            label: value.indexThree,
            data: this.setDataset(indicate.periodIndexesYield),
            borderWidth: 1,
            borderColor: '#37ae9b',
            pointHoverBackgroundColor: '#37ae9b',
          });
        }
      });
    });

    if (dataSets.length) {
      this.lineStylesData = {
        // @ts-ignore
        labels: this.setLabels(this.portfolio.periodYield),
        datasets: [
          {
            label: 'תקופה',
            // @ts-ignore
            data: this.setDataset(this.portfolio.periodYield),
            borderColor: '#19295f',
            pointBorderWidth: 2,
            pointBackgroundColor: '#19295f',
            pointHoverBorderWidth: 4
          },
          ...dataSets
        ]
      };
    }
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

  private setLabels(mainYields: any[]): (string | null)[] {
    return mainYields.map((item, index) => {
      const dateFormat = (index === 0 || index === mainYields.length - 1) ? 'MMM d, y' : 'MMM d';
      return this.datePipe.transform(item.startOfPeriod, dateFormat)
    });
  }

  private setDataset(mainYields: any[]): number[] {
    return mainYields.map(item => item.precentageYieldPeriod);
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
