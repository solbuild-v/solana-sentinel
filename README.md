# 🛡️ Solana Sentinel: Real-Time Token Security Scanner

![Solana](https://img.shields.io/badge/Solana-Devnet-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
![Developer](https://img.shields.io/badge/Built%20by-17yo%20Dev-orange)

## 💡 The Vision
In the high-speed world of Solana, users often interact with tokens blindly. **Solana Sentinel** is an infrastructure tool designed to provide instant, algorithmic security analysis of SPL tokens directly in the CLI.

I am a **17-year-old developer** building high-performance tools aimed at making the Solana ecosystem safer and more transparent for everyone.

## 🚀 Features
* **Whale Concentration Analysis:** Programmatically identifies top holders to detect potential "dump" risks.
* **Dynamic Risk Scoring Engine:** A revamped algorithm that calculates a security score (0-100) based on multiple on-chain risk vectors.
* **Authority Permission Audit:** Real-time detection of dangerous `Freeze` and `Mint` authorities.
* **Lightweight & High Performance:** Built with zero-bloat architecture, running purely on `@solana/web3.js`.

## 🛠️ Proof of Concept (Devnet)
I have deployed a test environment to demonstrate the scanner's capabilities:
* **Developer Wallet:** `4MLhLEJDQMxrzHCbr2tCTPny7NV67qr8qzKv6wji7DK7`
* **Test Subject (Token):** `2wJqSjHmXVnb7rKFwoyRZnhVxpWn1do8Gys288aFDBgW`

## 💻 How to Run
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/solbuild-v/solana-sentinel.git](https://github.com/solbuild-v/solana-sentinel.git)

2. Install dependencies:
   ```bash
   npm install

3. Run the analysis:
   ```bash
   node scanner.js
🌐 Switching to Mainnet
By default, the scanner runs on Devnet. To analyze real tokens on the Mainnet, update the connection string in scanner.js:

```
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
```
🗺️ Roadmap (Grant Goals)

With support, I plan to expand this toolkit:

Jito Integration: Checking if a token launch was bundled (sniped).

Metadata Mutable Check: Verifying if developers can change token images/names after launch.

Web Interface: Moving from CLI to a React-based dashboard.

Built with ❤️ on Solana.

