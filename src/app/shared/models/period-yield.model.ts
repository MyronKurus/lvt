export interface PeriodYield {
  startOfPeriod: string;
  endOfPeriod: string;
  doesmanagedCustomer: boolean;
  precentageYieldPeriod: number;
  totalProfitAndLossPeriod: number;
  totalBalanceStartOfPeriod: number;
  totalBalanceEndOfPeriod: number;
  accruedPrecentageYield: number;
  accruedTotalProfitAndLoss: number;
  errorMessagePeriod?: null | string;
}
