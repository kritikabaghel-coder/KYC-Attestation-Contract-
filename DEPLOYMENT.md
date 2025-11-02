# KYC Attestation Contract - Deployment Details

## 🚀 Deployed Contract Information

**Network:** Stellar Testnet  
**Contract ID:** `CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED`  
**Contract Alias:** `kyc_attestation`  
**WASM Hash:** `7293678182dcefe6ff20f2b21b11e621ea602b9f283edbdd52b7ef0ee0af112f`  
**Deployed By:** `alice`  
**Deployment Date:** November 2, 2025

## 🔗 Verification Links

**Contract Explorer:**  
https://stellar.expert/explorer/testnet/contract/CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED

**Deploy Transaction:**  
https://stellar.expert/explorer/testnet/tx/fbed7527d98ae3a76f087f3f96c0a85ff0972c4f4e482a7ce2781f8b63b70d09

**Install Transaction:**  
https://stellar.expert/explorer/testnet/tx/bdc20556a36137dcdda970d10f94a5e6a6b929665042cdc29c38788f135cf0f68

## ✅ Contract Verification

The contract has been deployed and is publicly verifiable on Stellar Expert. You can:

1. **View the contract on-chain:** Visit the contract explorer link above
2. **Inspect contract functions:** TypeScript bindings generated in `./bindings/`
3. **Verify WASM hash:** The on-chain WASM hash matches the build output

## 📋 Deployed Functions

The following 11 functions are available:

1. `initialize(admin: Address)` - Initialize contract with admin
2. `add_issuer(issuer: Address)` - Add KYC issuer to whitelist (admin only)
3. `remove_issuer(issuer: Address)` - Remove issuer from whitelist (admin only)
4. `issue_kyc(issuer: Address, subject: Address, hash: BytesN<32>, public: bool)` - Issue KYC attestation
5. `revoke_kyc(issuer: Address, subject: Address)` - Revoke KYC attestation
6. `set_public(subject: Address, issuer: Address, public: bool)` - Set visibility (subject only)
7. `allow_verifier(subject: Address, issuer: Address, verifier: Address, allowed: bool)` - Allow specific verifier
8. `verify_kyc(verifier: Address, subject: Address) -> bool` - Check if valid attestation exists
9. `is_issuer(issuer: Address) -> bool` - Check if address is whitelisted issuer
10. `get_attestation_hash(subject: Address, issuer: Address) -> Option<BytesN<32>>` - Get attestation hash

## 🔐 Security Features

- ✅ All sensitive operations require `require_auth()` 
- ✅ No PII stored on-chain (only 32-byte hash pointers)
- ✅ User-controlled privacy (public/private visibility)
- ✅ Granular verifier permissions
- ✅ Admin-controlled issuer whitelist

## 🎯 Quick Start - Interact with Deployed Contract

### 1. Initialize Contract (Admin)

```powershell
stellar contract invoke `
  --id kyc_attestation `
  --source-account alice `
  --network testnet `
  -- initialize `
  --admin GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 2. Add an Issuer (Admin)

```powershell
stellar contract invoke `
  --id kyc_attestation `
  --source-account alice `
  --network testnet `
  -- add_issuer `
  --issuer GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Issue KYC (Issuer)

```powershell
stellar contract invoke `
  --id kyc_attestation `
  --source-account issuer_account `
  --network testnet `
  -- issue_kyc `
  --issuer GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX `
  --subject GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX `
  --hash 0000000000000000000000000000000000000000000000000000000000000001 `
  --public true
```

### 4. Verify KYC (Verifier)

```powershell
stellar contract invoke `
  --id kyc_attestation `
  --source-account verifier_account `
  --network testnet `
  -- verify_kyc `
  --verifier GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX `
  --subject GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## 🛠️ TypeScript Integration

TypeScript bindings have been generated in `./bindings/`. To use them:

```bash
cd bindings
npm install
npm run build
```

Then import and use in your TypeScript/JavaScript code:

```typescript
import { Contract } from './bindings';

const contract = new Contract({
  contractId: 'kyc_attestation',
  networkPassphrase: 'Test SDF Network ; September 2015',
  rpcUrl: 'https://soroban-testnet.stellar.org'
});

// Call contract methods
const result = await contract.verify_kyc({
  verifier: 'GXXX...',
  subject: 'GXXX...'
});
```

## 📊 Contract Metrics

- **Contract Size:** 5,277 bytes (5.2 KB)
- **Exported Functions:** 11
- **Storage Type:** Instance storage (persistent)
- **SDK Version:** soroban-sdk 21.7.1
- **Optimization Level:** Release with max optimization

## 🔄 Redeployment

To redeploy with updates:

```powershell
# 1. Make changes to src/lib.rs
# 2. Rebuild
soroban contract build

# 3. Redeploy
stellar contract deploy `
  --wasm target/wasm32v1-none/release/kyc_attestation.wasm `
  --source-account alice `
  --network testnet `
  --alias kyc_attestation
```

## 📝 Notes

- This is a testnet deployment. For mainnet, change `--network testnet` to `--network mainnet`
- Keep your source account keys secure
- The contract is immutable once deployed (deploy new version for updates)
- All transactions require proper signatures from authorized parties
