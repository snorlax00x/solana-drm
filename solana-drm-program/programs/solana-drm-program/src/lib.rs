use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("7fbneJxAgS4m5wZNwyUAePbQmc3At5Po9ACgeJM3S8kC");

#[program]
pub mod solana_drm_program {
    use super::*;

    /// Initialize the DRM program
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let drm_state = &mut ctx.accounts.drm_state;
        drm_state.authority = ctx.accounts.authority.key();
        drm_state.bump = *ctx.bumps.get("drm_state").unwrap();
        drm_state.total_content = 0;
        drm_state.total_licenses = 0;
        drm_state.total_packages = 0;
        msg!("DRM Program initialized by: {:?}", ctx.accounts.authority.key());
        Ok(())
    }

    /// Register a new app package with DRM configuration
    pub fn register_package(
        ctx: Context<RegisterPackage>,
        package_name: String,
        drm_type: String,
        nft_mint_addresses: Vec<String>,
        token_mint_address: Option<String>,
        min_token_amount: Option<u64>,
    ) -> Result<()> {
        let package = &mut ctx.accounts.package;
        let drm_state = &mut ctx.accounts.drm_state;

        package.authority = ctx.accounts.authority.key();
        package.package_name = package_name;
        package.drm_type = drm_type;
        package.nft_mint_addresses = nft_mint_addresses;
        package.token_mint_address = token_mint_address;
        package.min_token_amount = min_token_amount;
        package.is_active = true;
        package.created_at = Clock::get()?.unix_timestamp;
        package.bump = *ctx.bumps.get("package").unwrap();

        drm_state.total_packages += 1;
        msg!("Package registered: {:?}", package.package_name);
        Ok(())
    }

    /// Update package DRM configuration
    pub fn update_package(
        ctx: Context<UpdatePackage>,
        new_drm_type: Option<String>,
        new_nft_mint_addresses: Option<Vec<String>>,
        new_token_mint_address: Option<Option<String>>,
        new_min_token_amount: Option<Option<u64>>,
        is_active: Option<bool>,
    ) -> Result<()> {
        let package = &mut ctx.accounts.package;

        if let Some(drm_type) = new_drm_type {
            package.drm_type = drm_type;
        }
        if let Some(nft_addresses) = new_nft_mint_addresses {
            package.nft_mint_addresses = nft_addresses;
        }
        if let Some(token_address) = new_token_mint_address {
            package.token_mint_address = token_address;
        }
        if let Some(min_amount) = new_min_token_amount {
            package.min_token_amount = min_amount;
        }
        if let Some(active) = is_active {
            package.is_active = active;
        }

        msg!("Package updated: {:?}", package.package_name);
        Ok(())
    }

    /// Create a new content item
    pub fn create_content(
        ctx: Context<CreateContent>,
        content_id: String,
        content_hash: String,
        price: u64,
        max_licenses: u32,
    ) -> Result<()> {
        let content = &mut ctx.accounts.content;
        let drm_state = &mut ctx.accounts.drm_state;

        content.authority = ctx.accounts.authority.key();
        content.content_id = content_id;
        content.content_hash = content_hash;
        content.price = price;
        content.max_licenses = max_licenses;
        content.current_licenses = 0;
        content.is_active = true;
        content.created_at = Clock::get()?.unix_timestamp;
        content.bump = *ctx.bumps.get("content").unwrap();

        drm_state.total_content += 1;
        msg!("Content created: {:?}", content.content_id);
        Ok(())
    }

    /// Purchase a license for content
    pub fn purchase_license(
        ctx: Context<PurchaseLicense>,
        license_id: String,
    ) -> Result<()> {
        let license = &mut ctx.accounts.license;
        let content = &mut ctx.accounts.content;
        let drm_state = &mut ctx.accounts.drm_state;

        // Check if content is active
        require!(content.is_active, DrmError::ContentInactive);

        // Check if licenses are available
        require!(
            content.current_licenses < content.max_licenses,
            DrmError::NoLicensesAvailable
        );

        // Transfer payment
        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.buyer_token_account.to_account_info(),
                to: ctx.accounts.authority_token_account.to_account_info(),
                authority: ctx.accounts.buyer.to_account_info(),
            },
        );
        token::transfer(transfer_ctx, content.price)?;

        // Create license
        license.authority = ctx.accounts.authority.key();
        license.owner = ctx.accounts.buyer.key();
        license.content = content.key();
        license.license_id = license_id;
        license.purchased_at = Clock::get()?.unix_timestamp;
        license.expires_at = Clock::get()?.unix_timestamp + (365 * 24 * 60 * 60); // 1 year
        license.is_active = true;
        license.bump = *ctx.bumps.get("license").unwrap();

        content.current_licenses += 1;
        drm_state.total_licenses += 1;

        msg!("License purchased: {:?} for content: {:?}", license_id, content.content_id);
        Ok(())
    }

    /// Verify access to content
    pub fn verify_access(ctx: Context<VerifyAccess>) -> Result<()> {
        let license = &ctx.accounts.license;
        let content = &ctx.accounts.content;

        // Check if license is active
        require!(license.is_active, DrmError::LicenseInactive);

        // Check if license has expired
        let current_time = Clock::get()?.unix_timestamp;
        require!(current_time < license.expires_at, DrmError::LicenseExpired);

        // Check if license owner matches
        require!(license.owner == ctx.accounts.user.key(), DrmError::UnauthorizedAccess);

        // Check if content is active
        require!(content.is_active, DrmError::ContentInactive);

        msg!("Access verified for content: {:?}", content.content_id);
        Ok(())
    }

    /// Revoke a license
    pub fn revoke_license(ctx: Context<RevokeLicense>) -> Result<()> {
        let license = &mut ctx.accounts.license;
        let content = &mut ctx.accounts.content;

        license.is_active = false;
        content.current_licenses -= 1;

        msg!("License revoked: {:?}", license.license_id);
        Ok(())
    }

    /// Update content details
    pub fn update_content(
        ctx: Context<UpdateContent>,
        new_price: Option<u64>,
        new_max_licenses: Option<u32>,
        is_active: Option<bool>,
    ) -> Result<()> {
        let content = &mut ctx.accounts.content;

        if let Some(price) = new_price {
            content.price = price;
        }
        if let Some(max_licenses) = new_max_licenses {
            require!(max_licenses >= content.current_licenses, DrmError::InvalidMaxLicenses);
            content.max_licenses = max_licenses;
        }
        if let Some(active) = is_active {
            content.is_active = active;
        }

        msg!("Content updated: {:?}", content.content_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 1 + 8 + 8 + 8,
        seeds = [b"drm_state"],
        bump
    )]
    pub drm_state: Account<'info, DrmState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RegisterPackage<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 200 + 100 + 1000 + 100 + 8 + 1 + 8 + 1,
        seeds = [b"package", package_name.as_bytes()],
        bump
    )]
    pub package: Account<'info, Package>,
    #[account(mut)]
    pub drm_state: Account<'info, DrmState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: This is the package name string
    pub package_name: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct UpdatePackage<'info> {
    #[account(mut)]
    pub package: Account<'info, Package>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreateContent<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 200 + 200 + 8 + 4 + 4 + 1 + 8 + 1,
        seeds = [b"content", content_id.as_bytes()],
        bump
    )]
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub drm_state: Account<'info, DrmState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: This is the content ID string
    pub content_id: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct PurchaseLicense<'info> {
    #[account(
        init,
        payer = buyer,
        space = 8 + 32 + 32 + 32 + 200 + 8 + 8 + 1 + 1,
        seeds = [b"license", license_id.as_bytes()],
        bump
    )]
    pub license: Account<'info, License>,
    #[account(mut)]
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub drm_state: Account<'info, DrmState>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub buyer_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub authority_token_account: Account<'info, TokenAccount>,
    pub authority: Account<'info, Content>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    /// CHECK: This is the license ID string
    pub license_id: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct VerifyAccess<'info> {
    pub license: Account<'info, License>,
    pub content: Account<'info, Content>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct RevokeLicense<'info> {
    #[account(mut)]
    pub license: Account<'info, License>,
    #[account(mut)]
    pub content: Account<'info, Content>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateContent<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    pub authority: Signer<'info>,
}

#[account]
pub struct DrmState {
    pub authority: Pubkey,
    pub bump: u8,
    pub total_content: u64,
    pub total_licenses: u64,
    pub total_packages: u64,
}

#[account]
pub struct Package {
    pub authority: Pubkey,
    pub package_name: String,
    pub drm_type: String,
    pub nft_mint_addresses: Vec<String>,
    pub token_mint_address: Option<String>,
    pub min_token_amount: Option<u64>,
    pub is_active: bool,
    pub created_at: i64,
    pub bump: u8,
}

#[account]
pub struct Content {
    pub authority: Pubkey,
    pub content_id: String,
    pub content_hash: String,
    pub price: u64,
    pub max_licenses: u32,
    pub current_licenses: u32,
    pub is_active: bool,
    pub created_at: i64,
    pub bump: u8,
}

#[account]
pub struct License {
    pub authority: Pubkey,
    pub owner: Pubkey,
    pub content: Pubkey,
    pub license_id: String,
    pub purchased_at: i64,
    pub expires_at: i64,
    pub is_active: bool,
    pub bump: u8,
}

#[error_code]
pub enum DrmError {
    #[msg("Content is not active")]
    ContentInactive,
    #[msg("No licenses available")]
    NoLicensesAvailable,
    #[msg("License is not active")]
    LicenseInactive,
    #[msg("License has expired")]
    LicenseExpired,
    #[msg("Unauthorized access")]
    UnauthorizedAccess,
    #[msg("Invalid max licenses")]
    InvalidMaxLicenses,
    #[msg("Package not found")]
    PackageNotFound,
    #[msg("Package is not active")]
    PackageInactive,
}
