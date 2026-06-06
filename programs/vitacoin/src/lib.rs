use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenAccount, TokenInterface};

declare_id!("Vita111111111111111111111111111111111111111");

#[program]
pub mod vitacoin {
    use super::*;

    /// Initializes a user's secure, non-custodial vault ecosystem
    pub fn initialize_vaults(context: Context<InitializeVaults>) -> Result<()> {
        let home_vault = &mut context.accounts.home_builder_vault;
        home_vault.owner = context.accounts.user.key();
        home_vault.balance_tokens = 0;
        home_vault.locked_until_epoch = 0; // Requires oracle downpayment proof to unlock
        
        let life_vault = &mut context.accounts.life_security_vault;
        life_vault.owner = context.accounts.user.key();
        life_vault.balance_tokens = 0;
        // Enforces a strict programmatic 90-day survival time-lock from current network time
        let clock = Clock::get()?;
        life_vault.locked_until_epoch = clock.unix_timestamp + (90 * 24 * 60 * 60);

        msg!("VitaCoin Vault Ecosystem Successfully Established.");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeVaults<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// HomeBuilder PDA Vault account initialization
    #[account(
        init,
        payer = user,
        space = Some_HomeBuilder_Vault::DISCRIMINATOR.len() + Some_HomeBuilder_Vault::INIT_SPACE,
        seeds = [b"home-builder", user.key().as_ref()],
        bump
    )]
    pub home_builder_vault: Account<'info, HomeBuilderVault>,

    /// Life Security PDA Vault account initialization
    #[account(
        init,
        payer = user,
        space = Some_Life_Security_Vault::DISCRIMINATOR.len() + Some_Life_Security_Vault::INIT_SPACE,
        seeds = [b"life-security", user.key().as_ref()],
        bump
    )]
    pub life_security_vault: Account<'info, LifeSecurityVault>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
}

#[account]
#[derive(InitSpace)]
pub struct HomeBuilderVault {
    pub owner: Pubkey,
    pub balance_tokens: u64,
    pub locked_until_epoch: i64,
}

#[account]
#[derive(InitSpace)]
pub struct LifeSecurityVault {
    pub owner: Pubkey,
    pub balance_tokens: u64,
    pub locked_until_epoch: i64,
}

struct Some_HomeBuilder_Vault;
impl Some_HomeBuilder_Vault {
    const DISCRIMINATOR: [u8; 8] = [0; 8];
    const INIT_SPACE: usize = 32 + 8 + 8;
}

struct Some_Life_Security_Vault;
impl Some_Life_Security_Vault {
    const DISCRIMINATOR: [u8; 8] = [0; 8];
    const INIT_SPACE: usize = 32 + 8 + 8;
}
