import { Router, Request, Response } from 'express';
import { PlaidService } from '../services/plaid.service';

const router = Router();
const plaidService = new PlaidService();

/**
 * POST /api/sync-expenses
 * Secure route endpoint to synchronize banking outlays and calculate $VITA utility rewards
 */
router.post('/sync-expenses', async (req: Request, res: Response) => {
  const { walletAddress, accessToken, startDate, endDate } = req.body;

  // Validate incoming execution parameters
  if (!walletAddress || !accessToken) {
    return res.status(400).json({
      success: false,
      error: 'Missing required configuration payloads: walletAddress and accessToken are mandatory.',
    });
  }

  try {
    // 1. Fetch the verified expenditures using our Step 3 Plaid Service
    const defaultStart = startDate || '2026-01-01';
    const defaultEnd = endDate || '2026-06-01';
    
    const verifiedExpenses = await plaidService.fetchAndVerifyExpenses(
      accessToken,
      defaultStart,
      defaultEnd
    );

    let totalRewardTokens = 0;
    let containsHousingAllocations = false;

    // 2. Process transactions according to our Section 5 Whitepaper Math Curve
    verifiedExpenses.forEach((expense) => {
      let multiplier = 1; // Default fallback for UNKNOWN category outlays

      switch (expense.category) {
        case 'HOUSING':
          multiplier = 10; // High priority allocation matching target
          containsHousingAllocations = true;
          break;
        case 'GROCERIES':
          multiplier = 5;  // Base nutritional match tier
          break;
        case 'UTILITIES':
        case 'HEALTHCARE':
          multiplier = 3;  // Vital life-preservation auxiliary services
          break;
      }

      // Add to our total rewards tracking allocation pool
      totalRewardTokens += Math.floor(expense.amount * multiplier);
    });

    // 3. Return calculated reward structure to application interface
    return res.status(200).json({
      success: true,
      walletTarget: walletAddress,
      transactionsProcessed: verifiedExpenses.length,
      allocatedRewardTokens: totalRewardTokens,
      vaultRoutingStrategy: containsHousingAllocations 
        ? 'HomeBuilder Unified 50/50 Split Triggered' 
        : 'Life Security Direct Accrual Only',
    });

  } catch (error: any) {
    console.error('[SyncRoute Error] Core execution engine breakdown:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Internal cryptographic processing synchronization failure',
    });
  }
});

export const syncRouter = router;
