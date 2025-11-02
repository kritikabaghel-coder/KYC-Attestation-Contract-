# Build the Soroban contract (PowerShell)
Write-Host "Building contract..."
# Ensure you have soroban CLI in PATH
soroban contract build
Write-Host "Build finished. Wasm is in target/wasm32-unknown-unknown/release/"
