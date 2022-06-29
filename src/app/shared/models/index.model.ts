import {PeriodIndexesYield} from "./period-indexes-yield.model";

export interface Index {
  indexId: number;
  indexName: string;
  productNAme: string;
  precentageYield: number;
  periodIndexesGraphType: number;
  periodIndexesYield: PeriodIndexesYield[];
}
