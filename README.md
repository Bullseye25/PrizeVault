# PrizeVault 🏆
### The First "No-Loss" Prize Savings Protocol on Base 🔵

PrizeVault is a decentralized application (dApp) that allows users to deposit USDC for a chance to win daily prizes without risking their principal. It combines the safety of a savings account with the thrill of a lottery.

## 🏗 Architecture & Backend

Unlike traditional web2 apps, PrizeVault does **not** use a centralized database (SQL, Firebase) to store user funds or potential winners. **The Base Blockchain is our backend.**

### Smart Contract Logic (`/contracts/PrizeVault.sol`)
All critical logic is handled on-chain for transparency and trustlessness:

1.  **Deposits & State**: 
    *   When a user deposits, the `deposit()` function is called.
    *   The user's balance is stored in a permanent on-chain mapping: `mapping(address => Player) public players;`.
    *   This ensures that **only the user** can withdraw their principal.

2.  **The "No-Loss" Yield Engine**:
    *   The prize pool is generated from the **yield** (or protocol fees) of the pooled deposits.
    *   Users never lose their initial deposit (Principal).
    *   If you don't win, you simply keep your money and automatically enter the next day's draw.

3.  **Provably Fair Draws**:
    *   Winners are selected using **Chainlink VRF** (Verifiable Random Function) to ensure no one (including the devs) can rig the lottery.
    *   *Note: The MVP version currently uses a simulated randomness generator for demonstration purposes.*

## 🚀 Comparison

| Feature | Traditional Lottery | PrizeVault |
| :--- | :--- | :--- |
| **Cost** | Ticket Price (Unrecoverable) | **0 Loss** (Deposit is your ticket) |
| **Liquidity** | Gone if you lose | **Liquid** (Withdraw anytime) |
| **Safety** | Trust the Organizer | **Trustless** (Smart Contract) |

## 🛠 Tech Stack

-   **Frontend**: Next.js 14, Tailwind CSS, Framer Motion (Glassmorphism UI)
-   **Blockchain**: Base (Coinbase L2)
-   **Smart Contracts**: Solidity, Hardhat
-   **Wallet**: RainbowKit + Wagmi

## 📜 How to Run Locally

1.  Clone the repo:
    ```bash
    git clone https://github.com/Bullseye25/PrizeVault.git
    cd PrizeVault
    ```

2.  Install Dependencies:
    ```bash
    cd frontend
    npm install
    ```

3.  Run Dev Server:
    ```bash
    npm run dev
    ```

---
*Built with 💙 for the Base Builder Grant.*
