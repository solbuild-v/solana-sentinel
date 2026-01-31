# 🛡️ Solana Sentinel v5.4: Real-Time Token Security Scanner

![Solana](https://img.shields.io/badge/Solana-Mainnet-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
![Developer](https://img.shields.io/badge/Built%20by-17yo%20Dev-orange)

## 💡 The Vision
In the high-speed world of Solana, users often interact with tokens blindly. **Solana Sentinel** is an infrastructure tool designed to provide instant, algorithmic security analysis of SPL tokens directly in the CLI.

I am a **17-year-old developer** building high-performance tools aimed at making the Solana ecosystem safer and more transparent for everyone.

🚀 **Features**
* **Whale Concentration (Cluster) Analysis**: Programmatically identifies top holders to detect potential "dump" risks.
* **Liquidity Tracking**: Instantly detects if a token is on Pump.fun bonding curve or has a Raydium Pool.
* **Authority Permission Audit**: Real-time detection of dangerous **Freeze** and **Mint** authorities.
* **Metadata Integrity**: Verifies if token metadata is Immutable or can be changed by the dev.
* **WebSocket Monitoring**: Uses `onAccountChange` for live, reactive security updates.

## 🛠️ Proof of Concept (Mainnet)
The scanner is optimized for Solana Mainnet to provide real-time security data.
* **Developer Wallet:** `4MLhLEJDQMxrzHCbr2tCTPny7NV67qr8qzKv6wji7DK7`

## 💻 How to Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/solbuild-v/solana-sentinel.git

2. **Install dependencies:**
   ```bash
   npm install @solana/web3.js

3. Run the analysis:
   ```bash
   node scanner.js
🌐 **Mainnet Configuration**
The scanner is optimized for Mainnet. To start analyzing tokens, update the following constants at the top of `scanner.js`:

// 🔑 Your Helius API Key (https://www.helius.dev/)
```
const HELIUS_KEY = "YOUR_HELIUS_API_KEY";
```
// 🎯 The Token Mint Address you want to audit
```
const TOKEN_TO_WATCH = new PublicKey("YOUR_TOKEN_ADDRESS");
```
🗺️ **Roadmap (Grant Goals)**
With support, I plan to expand this toolkit:
* **Jito Integration**: Checking if a token launch was bundled (sniped) by bots.
* **Web Interface**: Moving from CLI to a React-based professional dashboard.
* **Auto-Execution**: Integrated module for safe-buy transactions.

Built with ❤️ on Solana.

