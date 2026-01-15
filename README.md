# PrizeVault 🏆
> **Daily On-Chain Lottery on Base. 1 USDC = 10 Tickets.**

![PrizeVault Banner](https://placehold.co/1200x400/1e1e2e/FFF?text=PrizeVault+Lottery)

## 🌟 The Vision
PrizeVault is a **decentralized lottery protocol** built on Base. We are engaging users with a simple, transparent, and fair daily draw system. By leveraging blockchain technology, we remove the "trust" required in traditional lotteries—everything is on-chain and verifiable.

**Our Goal:** To onboard the next **10,000 users** to Base by Gamifying DeFi interaction.

---

## 💡 How It Works

1.  **🎟️ Buy Tickets**: 
    *   Deposit USDC to purchase tickets.
    *   **Rate**: 1 USDC = **10 Tickets**.
    *   *Bonus*: Deposit **20+ USDC** to get **5% Bonus Tickets** instantly!

2.  **⏳ Wait**: 
    *   Every 24 hours, our Smart Contract executes the daily draw.
    *   A winning ticket is selected using **Chainlink VRF** (Verifiable Random Function).

3.  **🎉 Win or Replay**:
    *   **Winner**: Takes the entire Prize Pool (minus 20% protocol fee).
    *   **Others**: Your ticket money contributes to the prize pot for the winner. Try again tomorrow!

---

## 🚀 Key Features

| Feature | Traditional Lottery | PrizeVault |
| :--- | :--- | :--- |
| **Transparency** | "Trust Us" | **On-Chain & Open Source** |
| **Fairness** | Hidden Algorithms | **Chainlink VRF (Provably Fair)** |
| **Access** | Geo-Restricted | **Global (Permissionless)** |
| **Odds** | Fixed | **Proportional to Pool** |

---

## 🛠 Tech Stack (On-Chain Backend)

*   **Smart Contracts**: Solidity (Manages Deposits, Ticket Issuance, Draws).
*   **Likely Backend**: The Base Blockchain *is* our backend.
*   **Frontend**: Next.js 14 + Tailwind CSS + Framer Motion.
*   **Wallet**: RainbowKit + Wagmi.

### Smart Contract Logic (`/contracts/PrizeVault.sol`)
*   **Data Structure**: Mapping of `address => TicketBalance`.
*   **Pool Logic**: All deposits go into a single prize pool.
*   **Safety**: Secured by OpenZeppelin standards.

---

## 🎯 Grant Impact
This Base Builder Grant will allow us to:
1.  **Audit**: Secure the smart contracts before Mainnet.
2.  **Marketing**: Fund the initial "Guaranteed" Prize Pools to attract users.
3.  **Deploy**: Launch officially on Base Mainnet.

---

## 🚀 Run the MVP Locally

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/Bullseye25/PrizeVault.git
    cd PrizeVault/frontend
    npm install
    ```
2.  **Run**:
    ```bash
    npm run dev
    ```
3.  **Explore**: Open `http://localhost:3000`.

---
*Built with 💙 by the PrizeVault Team.*
