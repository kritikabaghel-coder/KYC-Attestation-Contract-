# Deploy the contract to testnet (PowerShell)
param(
    [string]$Network = "testnet",
    [string]$WasmPath = "target/wasm32-unknown-unknown/release/kyc-attestation.wasm"
)

Write-Host "Deploying $WasmPath to $Network..."
# This assumes you have soroban CLI configured with a funded account for the network
soroban contract deploy --network $Network --wasm $WasmPath
