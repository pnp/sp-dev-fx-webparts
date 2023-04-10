/**
 * Defines the Retail Return Volumes
 */
export interface RetailReturnVolumes {

    // The maximum number of returns
    maximumReturns: number;

    // The current number of returns
    currentReturns: number;

    // The number of returns per month
    monthlyReturns: RetailMonthlyReturnVolumes[];
}

/**
 * Defines the Retail Monthly Return Volumes
 */
export interface RetailMonthlyReturnVolumes {

    // The month
    month: number;

    // The number of returns
    returns: number;
}
