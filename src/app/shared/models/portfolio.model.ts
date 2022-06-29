import {PeriodYield} from "./period-yield.model";

export interface Portfolio {
  startDate: string;
  endDate: string;
  periodGraphType: number;
  precentageYield: number;
  totalProfitAndLoss: number;
  periodYield: PeriodYield[];
}
