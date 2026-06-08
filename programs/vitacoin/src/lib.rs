use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, Transfer};

// 1. We define the parameters of your Creator Vault
#[account]
pub struct CreatorVestingVault {
    pub creator_authority: Pubkey, // Your personal master wallet address
    pub total_allocation: u64,     // Total: 260,000,000 VITA
    pub immediate_locked: u64,     // 50% Hard Locked: 130,000,000 VITA
    pub vesting_remaining: u64,    // 50% Streaming: 130,000,000 VITA
    pub start_timestamp: i64,      // The exact second the project goes live
    pub duration: i64,             // Total time for the streaming release (e.g., 1 year)
    pub total_withdrawn: u64,      // Tracks what you have already realized
}

impl CreatorVestingVault {
    // 2. The mathematical formula running on the blockchain to see what has unlocked
    pub fn calculate_unlocked_amount(&self, current_timestamp: i64) -> u64 {
        if current_timestamp < self.start_timestamp {
            return 0;
        }
        
        let time_elapsed = current_timestamp - self.start_timestamp;
        
        if time_elapsed >= self.duration {
            // If the full timeline has passed, the entire remaining 50% is fully realized
            return self.vesting_remaining;
        } else {
            // Linearly stream the coins second-by-second over the duration
            let release_rate = self.vesting_remaining / self.duration as u64;
            return (time_elapsed as u64) * release_rate;
        }
    }
}
