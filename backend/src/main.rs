use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tower_http::cors::CorsLayer;
use tracing_subscriber;

mod stellar;
mod handlers;
mod models;

use handlers::*;
use models::AppState;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Load environment variables
    dotenv::dotenv().ok();

    // Initialize app state
    let state = Arc::new(AppState::new());

    // Build our application with routes
    let app = Router::new()
        // Health check
        .route("/health", get(health_check))
        
        // Admin routes
        .route("/api/admin/initialize", post(initialize_contract))
        .route("/api/admin/add-issuer", post(add_issuer))
        .route("/api/admin/remove-issuer", post(remove_issuer))
        
        // Issuer routes
        .route("/api/issuer/issue-kyc", post(issue_kyc))
        .route("/api/issuer/revoke-kyc", post(revoke_kyc))
        
        // Subject routes
        .route("/api/subject/set-public", post(set_public_visibility))
        .route("/api/subject/allow-verifier", post(allow_verifier))
        
        // Verifier routes
        .route("/api/verify/:address", get(verify_kyc))
        
        // Query routes
        .route("/api/issuer/check/:address", get(check_issuer))
        .route("/api/attestation/:subject/:issuer", get(get_attestation))
        
        .layer(CorsLayer::permissive())
        .with_state(state);

    // Run the server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001")
        .await
        .unwrap();
    
    tracing::info!("🚀 Server running on http://0.0.0.0:3001");
    
    axum::serve(listener, app).await.unwrap();
}

async fn health_check() -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "status": "healthy",
        "service": "KYC Attestation Backend",
        "version": "0.1.0"
    }))
}
