import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DatePipe} from "@angular/common";

import {Subject} from "rxjs";

import {Chart} from 'chart.js';
import chartAnnotationPlugin from 'chartjs-plugin-annotation';

import {Portfolio} from "../../models/portfolio.model";
import {IndexCollection} from "../../models/index.model";
import {SelectedIndexes} from "../../models/selected-indexes.model";
import {UIChart} from "primeng/chart";

export class Scales {
  x: any;
  y: any;

  constructor(xMin: number, xMax: number) {
    this.x = {
      min: xMin,
      max: xMax,
      grid: {
        drawBorder: true,
        display: false
      },
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0
      }
    }
    this.y = {
      max: 0.1,
      min: -0.1,
      ticks: {
        callback: function (value: any) {
          return value + '%';
        }
      },
      grid: {
        drawBorder: true,
        color: 'rgba(229,229,229,0.65)',
      },
    }
  }
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnChanges {

  cancel$: Subject<void> = new Subject<void>();
  isCollapsed = true;
  isMobile = false;
  showInfoBox = false;
  config: any;
  lineStylesData: any;
  tooltip: any;
  mobileTooltipsArray: any[] = [];
  @Input() stockIndexes: IndexCollection[] | undefined;
  @Input() portfolio: Portfolio | undefined;

  @ViewChild('chart') chartEl?: UIChart;

  constructor(private cdr: ChangeDetectorRef,
              private datePipe: DatePipe) {
    Chart.register(chartAnnotationPlugin);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkAgentType();

    if (this.portfolio) {
      sessionStorage.setItem('FIB-DATASETS', JSON.stringify(this.portfolio.periodYield));
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

      this.config = {
        // animation: {
        //   onComplete: function(e: any) {
        //     const chartArea = e.chart.chartArea;
        //     const metaSet = e.chart['_metasets'][0];
        //     const data = metaSet.data;
        //     const someShift = 8;
        //     let startX = 0;
        //     let endX = 0;
        //
        //     if (someShift >= 0) {
        //       data.forEach((item: any, i: number) => {
        //         if (i === someShift) {
        //           startX = item.x;
        //         }
        //
        //         if (i == someShift + 1) {
        //           endX = item.x;
        //         }
        //       });
        //
        //       const chartBox = document.getElementById('lvt-chart-box');
        //       const shiftEl = document.getElementById('chartJs-shift');
        //
        //       if (chartBox && shiftEl) {
        //         shiftEl.style.display = 'block';
        //         const position = chartBox.clientWidth / 2 - startX > 0 ? 'left' : 'right';
        //
        //         shiftEl.classList.add(position);
        //         shiftEl.style.width = `${endX - startX}px`;
        //         shiftEl.style.height = `${chartArea.height}px`;
        //         shiftEl.style.left = `${startX}px`;
        //         shiftEl.style.top = `${chartArea.top}px`;
        //         shiftEl.style.background = 'rgba(230, 233, 239, 1)';
        //       }
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
        scales: new Scales(0, 24),
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
                borderColor: 'rgba(29,24,95,0.50)',
                borderWidth: 1,
              }
            ]
          },
          tooltip: this.tooltip,
        }
      };

      this.setMobileTooltipsArray();
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit() {
  }

  public onIndexChange(value: SelectedIndexes): void {
    const dataSets: any[] = [];

    this.stockIndexes?.forEach(item => {
      item.indices.find(indicate => {
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
      this.setMobileTooltipsArray();
      this.cdr.markForCheck();
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

  public scrollChartHandler(value: number): void {
    this.config.scales.x.min += value;
    this.config.scales.x.max += value;

    if (this.chartEl) {
      this.chartEl.chart.update();
    }
  }

  private setCustomTooltip(context: any): void {
    const yAxis = context.chart.chartArea;
    const tooltipModel = context.tooltip;
    const isMobile = window.innerWidth < 624;
    let fibDatasets: any = JSON.parse(sessionStorage.getItem('FIB-DATASETS') as string) || [];

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

    function getParsedDate(dateString: string): string {
      const dateArray = dateString.split('-');
      const day = dateArray[0].substring(2, 4)
      const month = dateArray[1];
      const year = dateArray[2].substring(0, 2);
      return year + '.' + month + '.' + day;
    }

    if (tooltipModel.body) {
      const dataIndex = tooltipModel.dataPoints[0].dataIndex;
      const bodyLines = tooltipModel.body.map(getBody);
      const dateTitle = getParsedDate(fibDatasets[dataIndex].startOfPeriod);
      const sum = Math.floor(Math.random() * 500) + 1;

      let innerHtml = `<thead class="tooltip-table__head">
                       <tr><th>
                         <span class="tooltip-table__title">עד ${dateTitle}  |  שווי תיק:  <strong>${sum}.42</strong> ₪</span>
                       </th></tr>
                       </thead><tbody class="tooltip-table__body">`;

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
    tooltipEl.style.width = '230px';
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

  private setLabels(mainYields: any[]): (string | string[] | null)[] {
    let oldMonth = '';
    let oldYear = '';
    return mainYields.map((item, index) => {
      const currentMonth = this.datePipe.transform(item.startOfPeriod, 'MMM') || '';
      const currentYear = this.datePipe.transform(item.startOfPeriod, 'y') || '';
      let dateFormat = index === 0 || currentYear !== oldYear ? 'd MMM y' : 'd MMM';

      if (index > 0 && currentMonth === oldMonth && currentYear === oldYear) {
        dateFormat = 'd';
      }

      oldYear = currentYear || '';
      oldMonth = currentMonth || '';

      return this.datePipe.transform(item.startOfPeriod, dateFormat)?.split(' ') || '';
    });
  }

  private setDataset(mainYields: any[]): number[] {
    return mainYields.map(item => Number(item.precentageYieldPeriod.toFixed(3)));
  }

  private setMobileTooltipsArray(): void {
    this.mobileTooltipsArray = [];
    const datasetLength = this.lineStylesData.datasets.length;
    const dataLength = this.lineStylesData.datasets[0].data.length;

    for (let i = 0; i < dataLength; i++) {
      let sum = 0;
      let dataInfo = [];
      let date = '';

      for (let j = 0; j < datasetLength; j++) {
        const dataSet = this.lineStylesData.datasets[j];
        sum += dataSet.data[i];
        if (j === 0) {
          date = this.datePipe.transform(this.portfolio?.periodYield[i].startOfPeriod, 'dd.MM.yy') || '';
        }

        dataInfo.push({
          label: dataSet.label,
          color: dataSet.borderColor,
          value: dataSet.data[i],
        });
      }

      this.mobileTooltipsArray.push({
        sum: sum.toFixed(3),
        date: date,
        data: dataInfo
      });
    }
  }
}
