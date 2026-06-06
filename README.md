# VitaCoin Core Ecosystem

VitaCoin is a revolutionary utility ecosystem built on the high-performance Solana blockchain. It transforms mandatory daily living expenses into long-term financial security, homeownership opportunities, and generational wealth. By bridging legacy banking data via Plaid with secure, non-custodial Anchor smart vaults on Solana, VitaCoin offers an empirical, self-sustaining alternative to predatory economic frameworks. 

Don't just pay to live your life. Own it!

## Repository Architecture

* `/whitepaper/` — Definitive economic, mathematical, and cryptographic foundation.
* `/docs/` — Multi-phase product engineering, compliance, and ecosystem roadmap.
* `/programs/vitacoin/` — Production-grade Solana/Anchor smart contract suite governing the vault locking mechanisms, rewards distribution, and rigorous oracle verifications.
* `/app/` — Enterprise React/Next.js dApp featuring seamless Solana Web3 wallet integration, Plaid link synchronizations, secure backend validation endpoints, and interactive tracking dashboards.
* `/.github/workflows/` — Automated production CI/CD pipeline enforcing code validation, linting, and Anchor testing suites.

## System Dependencies

To compile, test, and deploy the VitaCoin core infrastructure, your local environment must satisfy the following criteria:

* **Operating System:** Linux (Ubuntu 22.04 LTS or newer recommended) or macOS
* **Rust Toolchain:** `rustc 1.75.0` or newer
* **Solana CLI:** `solana-cli 1.18.11` or newer
* **Anchor Framework:** `anchor-cli 0.29.0` or newer
* **Node.js Ecosystem:** `node v18.18.0` or newer (coupled with `yarn` or `npm`)

## Installation and Local Ledger Setup

### 1. Clone and Initialize Dependencies
```bash
git clone [https://github.com/vitacoin-project/vitacoin-core.git](https://github.com/vitacoin-project/vitacoin-core.git)
cd vitacoin-core
yarn install
