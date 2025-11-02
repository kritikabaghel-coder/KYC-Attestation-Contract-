# Example command snippets for common operations (PowerShell)
Write-Host "--- Build ---"
Write-Host "soroban contract build"

Write-Host "`n--- Deploy (testnet) ---"
Write-Host "soroban contract deploy --network testnet --source <YOUR_IDENTITY> --wasm target\wasm32v1-none\release\kyc_attestation.wasm"

Write-Host "`n--- Initialize contract (after deploy) ---"
Write-Host "# replace <CONTRACT_ID> and <ADMIN_ADDRESS>"
Write-Host "soroban contract invoke --network testnet --id <CONTRACT_ID> --source <ADMIN_IDENTITY> --fn initialize --arg <ADMIN_ADDRESS>"

Write-Host "`n--- Add issuer (admin only) ---"
Write-Host "soroban contract invoke --network testnet --id <CONTRACT_ID> --source <ADMIN_IDENTITY> --fn add_issuer --arg <ISSUER_ADDRESS>"

Write-Host "`n--- Issue KYC (issuer) ---"
Write-Host "# issuer signs this invocation; hash must be 32-byte (hex encoded)"
Write-Host "soroban contract invoke --network testnet --id <CONTRACT_ID> --source <ISSUER_IDENTITY> --fn issue_kyc --arg <ISSUER_ADDRESS> --arg <SUBJECT_ADDRESS> --arg <32_byte_hash> --arg true"

Write-Host "`n--- Verify KYC (verifier) ---"
Write-Host "soroban contract invoke --network testnet --id <CONTRACT_ID> --source <VERIFIER_IDENTITY> --fn verify_kyc --arg <VERIFIER_ADDRESS> --arg <SUBJECT_ADDRESS>"
