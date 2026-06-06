import { Configuration, PlaidApi, PlaidEnvironments, TransactionsGetRequest } from 'plaid';

/**
 * Interface mapping out our parsed, verified transactions
 */
export interface VerifiedExpense {
  transactionId: string;
  amount: number;
  date: string;
  vendorName: string;
  category: 'HOUSING' | 'GROCERIES' | 'UTILITIES' | 'HEALTHCARE' | 'UNKNOWN';
}

export class PlaidService {
  private plaidClient: PlaidApi;

  constructor() {
    const configuration = new Configuration({
      basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '',
          'PLAID-SECRET': process.env.PLAID_SECRET || '',
        },
      },
    });

    this.plaidClient = new PlaidApi(configuration);
  }

  /**
   * Fetches real-world settlement data and translates it into verified economic categories
   * @param accessToken Non-custodial access token for the individual's banking link
   * @param startDate Processing timeframe start date (YYYY-MM-DD)
   * @param endDate Processing timeframe end date (YYYY-MM-DD)
   */
  public async fetchAndVerifyExpenses(
    accessToken: string,
    startDate: string,
    endDate: string
  ): Promise<VerifiedExpense[]> {
    try {
      const request: TransactionsGetRequest = {
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
        options: {
          include_personal_finance_category: true,
        },
      };

      const response = await this.plaidClient.transactionsGet(request);
      const transactions = response.data.transactions || [];

      return transactions.map((tx) => {
        const category = this.mapToAssetClass(tx.personal_finance_category?.primary || '');
        
        return {
          transactionId: tx.transaction_id,
          amount: Math.abs(tx.amount), // Ensure positive float data for outflow matching
          date: tx.date,
          vendorName: tx.merchant_name || tx.name || 'Unknown Merchant',
          category,
        };
      });
    } catch (error) {
      console.error('[PlaidService Error] Failed to retrieve or parse verified transaction payload:', error);
      throw new Error('Plaid data link synchronization failure');
    }
  }

  /**
   * Internal categorization engine ensuring compliance with Section 5 Asset Class Modifiers
   */
  private mapToAssetClass(plaidCategory: string): VerifiedExpense['category'] {
    const upperCat = plaidCategory.toUpperCase();

    if (upperCat.includes('RENT') || upperCat.includes('MORTGAGE') || upperCat.includes('HOUSING')) {
      return 'HOUSING';
    }
    if (upperCat.includes('GROCERIES') || upperCat.includes('FOOD_AND_DRINK')) {
      return 'GROCERIES';
    }
    if (upperCat.includes('UTILITIES') || upperCat.includes('POWER') || upperCat.includes('GAS')) {
      return 'UTILITIES';
    }
    if (upperCat.includes('MEDICAL') || upperCat.includes('HEALTHCARE')) {
      return 'HEALTHCARE';
    }
    
    return 'UNKNOWN';
  }
}
