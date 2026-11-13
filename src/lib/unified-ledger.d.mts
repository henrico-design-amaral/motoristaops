export type OperationSummary = {
  month: string; days: number; uber: number; app99: number; privateProduced: number;
  extras: number; operationalRevenue: number; operationalCost: number; operationalProfit: number;
  hours: number; km: number; trips: number;
  revenuePerHour: number | null; profitPerHour: number | null;
  revenuePerKm: number | null; tripsPerHour: number | null;
};
export declare function summarizeOperation(
  rows: ReadonlyArray<Record<string, string | number | null | undefined>>,
  month: string
): OperationSummary;
export declare function classifyBankMovement(row: {
  internalTransfer?: boolean; assetTransfer?: boolean; cardPayment?: boolean;
  familySupport?: boolean; workIncome?: boolean
}): string;

export declare function modelAllocations(confirmedRevenue: number): {
  car:number; ppf:number; other:number; free:number; total:number;
};
