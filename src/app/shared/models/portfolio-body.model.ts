export interface PortfolioBody {
  portfolioInfoType: number;
  requestedPeriod: number;
  startDate: string;
  endDate: string;
  currencyId: number;
  brutoOrNetoYield: number;
}
