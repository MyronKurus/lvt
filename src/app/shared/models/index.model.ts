import {PeriodIndexesYield} from "./period-indexes-yield.model";

export interface IndexCollection {
  productName: string;
  indexId: number;
  indices: IndexRecord[];
}

export interface IndexRecord {
  indexName: string;
  precentageYield: number;
  periodIndexesGraphType: number;
  periodIndexesYield: PeriodIndexesYield[];
  errorMessage?: null | string;
}
