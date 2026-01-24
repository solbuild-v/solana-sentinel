const { Connection, PublicKey } = require('@solana/web3.js');

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const MY_TOKEN = new PublicKey("2wJqSjHmXVnb7rKFwoyRZnhVxpWn1do8Gys288aFDBgW");

async function analyzeTokenSecurity(tokenAddress) {
    console.log(`\n🛡️ SOLANA SENTINEL v1.1 - DEEP ANALYSIS: ${tokenAddress.toBase58()}`);
    console.log("==================================================");

    try {
        const info = await connection.getParsedAccountInfo(tokenAddress);

        if (info.value === null) {
            console.log("❌ Error: Token not found on Devnet.");
            return;
        }

        const data = info.value.data.parsed.info;
        const decimals = data.decimals;
        const supplyRaw = data.supply;
        const supply = supplyRaw / Math.pow(10, decimals);

        let riskScore = 0;
        let findings = [];

        if (data.freezeAuthority) {
            riskScore += 45;
            findings.push("🚨 FREEZE AUTHORITY: ENABLED (Owner can lock all wallets)");
        } else {
            findings.push("✅ FREEZE AUTHORITY: DISABLED (Rug-resistant)");
        }

        if (data.mintAuthority) {
            riskScore += 35;
            findings.push("⚠️ MINT AUTHORITY: ENABLED (Owner can print more tokens)");
        } else {
            findings.push("✅ MINT AUTHORITY: RENOUNCED (Fixed supply)");
        }

        console.log("🔍 Fetching top holders data...");
        const largestAccounts = await connection.getTokenLargestAccounts(tokenAddress);

        if (largestAccounts.value.length > 0) {
            const topHolderRaw = largestAccounts.value[0].uiAmount;
            const topHolderPercent = (topHolderRaw / supply) * 100;

            if (topHolderPercent > 20) {
                riskScore += 20;
                findings.push(`🔴 CONCENTRATION: Top wallet holds ${topHolderPercent.toFixed(2)}% of supply!`);
            } else {
                findings.push(`🟢 DISTRIBUTION: Top holder owns ${topHolderPercent.toFixed(2)}% (Safe distribution)`);
            }
        }

        console.log(`\n💰 Total Supply: ${supply.toLocaleString()} tokens`);
        console.log(`📊 Security Score: ${Math.max(0, 100 - riskScore)}/100`);

        console.log("\n--- FINAL VERDICT ---");
        if (riskScore === 0) {
            console.log("🌟 ELITE: Asset is safe and decentralized.");
        } else if (riskScore < 40) {
            console.log("🛡️ SECURE: Minor risks, but acceptable.");
        } else if (riskScore < 70) {
            console.log("⚠️ WARNING: Moderate risk factors detected.");
        } else {
            console.log("💀 DANGER: High probability of scam / honeypot.");
        }

        console.log("\nDETAILED LOGS:");
        findings.forEach(f => console.log(` - ${f}`));
        console.log("==================================================\n");

    } catch (err) {
        console.error("Analysis failed unexpectedly:", err);
    }
}

analyzeTokenSecurity(MY_TOKEN);