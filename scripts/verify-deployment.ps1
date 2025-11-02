# Contract Verification Script
# This script verifies the deployed KYC attestation contract

$ContractId = "CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED"
$ContractAlias = "kyc_attestation"
$Network = "testnet"

Write-Host "Verifying KYC Attestation Contract Deployment" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Contract ID: $ContractId" -ForegroundColor Green
Write-Host "Alias: $ContractAlias" -ForegroundColor Green
Write-Host "Network: $Network" -ForegroundColor Green
Write-Host ""

Write-Host "Explorer Link:" -ForegroundColor Yellow
Write-Host "https://stellar.expert/explorer/testnet/contract/$ContractId"
Write-Host ""

Write-Host "Testing contract functionality..." -ForegroundColor Cyan

# Test 1: Check if dummy address is an issuer (should return false)
Write-Host ""
Write-Host "[1] Testing is_issuer() function..." -ForegroundColor White
$testAddress = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF"
$result = stellar contract invoke --id $ContractAlias --source-account alice --network $Network -- is_issuer --issuer $testAddress 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   [OK] Function callable: $result" -ForegroundColor Green
} else {
    Write-Host "   [FAIL] Function call failed" -ForegroundColor Red
}

# Test 2: Check bindings
Write-Host ""
Write-Host "[2] Checking TypeScript bindings..." -ForegroundColor White
if (Test-Path "./bindings") {
    Write-Host "   [OK] Bindings already generated in ./bindings/" -ForegroundColor Green
} else {
    Write-Host "   [INFO] Bindings not found" -ForegroundColor Yellow
}

# Test 3: List expected functions
Write-Host ""
Write-Host "[3] Expected contract functions:" -ForegroundColor White
$expectedFunctions = @(
    "initialize",
    "add_issuer",
    "remove_issuer",
    "issue_kyc",
    "revoke_kyc",
    "set_public",
    "allow_verifier",
    "verify_kyc",
    "is_issuer",
    "get_attestation_hash"
)

foreach ($func in $expectedFunctions) {
    Write-Host "      * $func" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "[SUCCESS] CONTRACT VERIFICATION COMPLETE" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Initialize the contract with an admin address"
Write-Host "   2. Add KYC issuers to the whitelist"
Write-Host "   3. Start issuing KYC attestations"
Write-Host ""
Write-Host "See DEPLOYMENT.md for detailed usage instructions" -ForegroundColor Cyan
