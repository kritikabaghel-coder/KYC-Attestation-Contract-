use serde::{Deserialize, Serialize};
use std::sync::Arc;

#[derive(Clone)]
pub struct AppState {
    pub contract_id: String,
    pub network: String,
    pub horizon_url: String,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            contract_id: std::env::var("CONTRACT_ID")
                .unwrap_or_else(|_| "CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED".to_string()),
            network: std::env::var("STELLAR_NETWORK")
                .unwrap_or_else(|_| "testnet".to_string()),
            horizon_url: std::env::var("HORIZON_URL")
                .unwrap_or_else(|_| "https://horizon-testnet.stellar.org".to_string()),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InitializeRequest {
    pub admin_address: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AddIssuerRequest {
    pub issuer_address: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct IssueKycRequest {
    pub issuer_address: String,
    pub subject_address: String,
    pub hash: String,
    pub public: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RevokeKycRequest {
    pub issuer_address: String,
    pub subject_address: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SetPublicRequest {
    pub subject_address: String,
    pub issuer_address: String,
    pub public: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AllowVerifierRequest {
    pub subject_address: String,
    pub issuer_address: String,
    pub verifier_address: String,
    pub allowed: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VerifyResponse {
    pub valid: bool,
    pub subject: String,
    pub timestamp: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AttestationResponse {
    pub hash: Option<String>,
    pub subject: String,
    pub issuer: String,
    pub revoked: bool,
}

#[derive(Debug, Serialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    pub fn error(message: String) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(message),
        }
    }
}
