const { Connection, PublicKey } = require('@solana/web3.js');

// 🔑 Insert your Helius API Key here
const HELIUS_KEY = "YOUR_HELIUS_API_KEY";
const RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
const WS_URL = `wss://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;

const connection = new Connection(RPC_URL, { wsEndpoint: WS_URL, commitment: 'confirmed' });

// 🎯 Insert the Token Mint Address you want to monitor here
const TOKEN_TO_WATCH = new PublicKey("YOUR_TOKEN_ADDRESS_TO_WATCH");

const METAPLEX_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const RAYDIUM_ID = new PublicKey("675kPX9MHTjS2zt1q61swKS6Fe1S3P6z2uA5vC7KTS6");

class SolanaSentinel {
    constructor(address) {
        this.address = address;
        this.isAuditing = false;
        this.riskScore = 0;
        this.findings = [];
    }

    async start() {
        console.clear();
        console.log(`🚀 Sentinel v5.4 | Stable 2026 | Booting...`);
        await this.fullAudit();

        connection.onAccountChange(
            this.address,
            async () => { if (!this.isAuditing) await this.fullAudit(); },
            { commitment: 'confirmed' }
        );
    }

    async fetch(fn) {
        try { return await fn(); } catch { return null; }
    }

    async fullAudit() {
        this.isAuditing = true;
        this.riskScore = 0;
        this.findings = [];

        const [info, holders, metaRaw, lp] = await Promise.all([
            this.fetch(() => connection.getParsedAccountInfo(this.address)),
            this.fetch(() => connection.getTokenLargestAccounts(this.address)),
            this.fetch(() => this.getMeta()),
            this.fetch(() => connection.getProgramAccounts(RAYDIUM_ID, {
                filters: [{ memcmp: { offset: 400, bytes: this.address.toBase58() } }]
            }))
        ]);

        if (info?.value) {
            const { supply, decimals, freezeAuthority, mintAuthority } = info.value.data.parsed.info;
            const uiSupply = supply / Math.pow(10, decimals);
            const metaStr = metaRaw ? metaRaw.data.toString('utf8', 0, 100).replace(/[^\x20-\x7E]/g, '') : "";
            const name = metaStr.match(/[A-Z][a-zA-Z0-9\s]{2,20}/) || "New Token";

            this.runSecurityChecks(freezeAuthority, mintAuthority, holders, metaRaw, lp, uiSupply);
            this.render(uiSupply, name);
        }
        this.isAuditing = false;
    }

    async getMeta() {
        const [pda] = PublicKey.findProgramAddressSync([Buffer.from("metadata"), METAPLEX_ID.toBuffer(), this.address.toBuffer()], METAPLEX_ID);
        return this.fetch(() => connection.getAccountInfo(pda));
    }

    runSecurityChecks(freeze, mint, holders, meta, hasLP, supply) {
        freeze ? this.add("FREEZE", "ACTIVE", 45) : this.add("FREEZE", "Renounced", 0);
        mint ? this.add("MINT", "ACTIVE", 35) : this.add("MINT", "Renounced", 0);

        if (holders?.value && supply > 0) {
            const top5 = (holders.value.slice(0, 5).reduce((a, h) => a + h.uiAmount, 0) / supply) * 100;
            top5 > 35 ? this.add("CLUSTER", `${top5.toFixed(1)}% in Top 5`, 30) : this.add("HOLDERS", "Safe", 0);
        }

        const isMutable = meta ? meta.data[1] === 1 : false;
        isMutable ? this.add("META", "Mutable", 15) : this.add("META", "Immutable", 0);

        if (hasLP && hasLP.length > 0) this.add("LP", "Raydium Found", 0);
        else if (this.address.toBase58().endsWith('pump')) this.add("PUMP", "Bonding Curve", 5);
        else this.add("LP", "No Pool Found", 25);
    }

    add(tag, msg, pen) {
        this.riskScore += pen;
        this.findings.push({ tag, msg, pen });
    }

    render(supply, name) {
        const score = Math.max(0, 100 - this.riskScore);
        const color = score > 80 ? "\x1b[32m" : score > 50 ? "\x1b[33m" : "\x1b[31m";
        const reset = "\x1b[0m";

        console.clear();
        console.log(`🛡️  SENTINEL v5.4 | 📍 ${this.address.toBase58()}`);
        console.log(`📊 NAME: ${name} | SCORE: ${color}${score}/100${reset}`);
        console.log(`💰 SUPPLY: ${Math.floor(supply).toLocaleString()}`);
        console.log("--------------------------------------------------");
        this.findings.sort((a, b) => b.pen - a.pen).forEach(f => console.log(`${f.pen > 0 ? '❌' : '✅'} [${f.tag}] ${f.msg}`));
        console.log("--------------------------------------------------");
        console.log(`VERDICT: ${color}${score > 80 ? "SAFE" : score > 50 ? "CAUTION" : "DANGER"}${reset}\n`);
    }
}

new SolanaSentinel(TOKEN_TO_WATCH).start();
