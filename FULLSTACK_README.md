# Full-Stack KYC Attestation Application

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Rust 1.70+ and Cargo
- Stellar CLI 23.1.4+

### Backend Setup

```powershell
cd backend

# Copy environment configuration
Copy-Item .env.example .env

# Install dependencies and build
cargo build --release

# Run the backend server
cargo run --release
```

The backend will start on **http://localhost:3001**

### Frontend Setup

```powershell
cd frontend

# Install dependencies
npm install

# Copy environment configuration
Copy-Item .env.example .env

# Start development server
npm run dev
```

The frontend will start on **http://localhost:3000**

## Project Structure

```
Bootcamp_project2/
├── src/                    # Smart Contract (Soroban/Rust)
│   └── lib.rs
├── backend/                # API Server (Axum/Rust)
│   ├── src/
│   │   ├── main.rs        # Server & routing
│   │   ├── handlers.rs    # API handlers
│   │   ├── models.rs      # Request/response types
│   │   └── stellar.rs     # Stellar integration
│   ├── Cargo.toml
│   └── .env.example
└── frontend/               # UI Application (React/TypeScript)
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── Hero.tsx
    │   │   ├── AdminPanel.tsx
    │   │   ├── IssuerPanel.tsx
    │   │   ├── UserPanel.tsx
    │   │   └── VerifyPanel.tsx
    │   ├── api/
    │   │   └── client.ts  # API client
    │   ├── App.tsx
    │   └── index.css      # Glassmorphism styles
    ├── package.json
    └── .env.example
```

## Features

### 🔐 Smart Contract (Deployed on Stellar Testnet)
- **Contract ID**: `CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED`
- Initialize with admin
- Add/remove whitelisted issuers
- Issue/revoke KYC attestations (32-byte hash)
- Subject-controlled visibility (public/private)
- Verifier allowlist management
- Secure verification

### 🚀 Backend API (Axum Server)
- RESTful API endpoints
- CORS-enabled for frontend integration
- Mock responses (ready for Stellar SDK integration)
- Health check endpoint
- Environment-based configuration

**API Routes:**
- `POST /api/admin/initialize` - Initialize contract
- `POST /api/admin/add-issuer` - Add issuer
- `POST /api/admin/remove-issuer` - Remove issuer
- `POST /api/issuer/issue-kyc` - Issue KYC
- `POST /api/issuer/revoke-kyc` - Revoke KYC
- `POST /api/subject/set-public` - Set visibility
- `POST /api/subject/allow-verifier` - Allow verifier
- `GET /api/verify/:address` - Verify KYC
- `GET /api/issuer/:address` - Check issuer status
- `GET /api/attestation/:address` - Get attestation

### ✨ Frontend UI (Glassmorphism Design)
- **Glassmorphism theme** with frosted glass effects
- **3D lift buttons** with hover animations
- **Animated gradients** and smooth transitions
- **Responsive design** for all screen sizes

**Pages:**
- **Home** - Landing page with features
- **Admin Panel** - Initialize contract, manage issuers
- **Issuer Panel** - Issue/revoke KYC attestations
- **User Panel** - Control visibility, allow verifiers
- **Verify Panel** - Check KYC status

## Usage

### 1. Initialize Contract (Admin)
Navigate to `/admin` and provide your admin address to initialize the contract.

### 2. Add Issuers (Admin)
Add whitelisted issuer addresses who can issue KYC attestations.

### 3. Issue KYC (Issuer)
Navigate to `/issuer` and:
- Enter issuer address (must be whitelisted)
- Enter subject address
- Provide 32-byte attestation hash
- Set initial visibility (public/private)

### 4. Manage Visibility (Subject)
Navigate to `/user` and:
- Toggle public/private visibility
- Add verifiers to allowlist

### 5. Verify KYC (Verifier)
Navigate to `/verify` and:
- Enter subject address
- Enter your verifier address
- View verification result and attestation hash

## Design System

### Glassmorphism Effects
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 3D Lift Buttons
```css
.lift-button:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(139, 92, 246, 0.5);
}
```

### Animated Gradients
Auto-rotating background gradients with smooth color transitions.

## Deployment

### Smart Contract
Already deployed to Stellar testnet. Verify at:
https://stellar.expert/explorer/testnet/contract/CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED

### Backend
Deploy to any Rust-compatible hosting (Railway, Fly.io, AWS, etc.)

### Frontend
Deploy to Vercel, Netlify, or Cloudflare Pages:
```powershell
npm run build
# Upload dist/ folder
```

## Integration Notes

The backend handlers currently return mock responses. To integrate with the actual Stellar contract:

1. Implement `StellarClient` in `backend/src/stellar.rs`
2. Use `stellar-sdk` or `soroban-sdk` for contract invocations
3. Update handlers in `backend/src/handlers.rs` to call `stellar_client` methods
4. Handle transaction signing and submission
5. Parse contract responses

## Environment Variables

### Backend (.env)
```
CONTRACT_ID=CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED
NETWORK_PASSPHRASE=Test SDF Network ; September 2015
RPC_URL=https://soroban-testnet.stellar.org
PORT=3001
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
VITE_CONTRACT_ID=CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_RPC_URL=https://soroban-testnet.stellar.org
```

## Tech Stack

**Smart Contract:**
- Rust (no_std)
- Soroban SDK 21.7.1
- Stellar Testnet

**Backend:**
- Rust
- Axum 0.7 (web framework)
- Tokio (async runtime)
- Tower (middleware)

**Frontend:**
- React 18.2
- TypeScript 5.3
- Vite 5.0
- Tailwind CSS 3.3
- Framer Motion 10.16 (animations)
- React Router 6.20
- Axios (HTTP client)
- React Hot Toast (notifications)
- React Icons

## License

MIT

## Links

- **Smart Contract Verification**: https://stellar.expert/explorer/testnet/contract/CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED
- **GitHub Repository**: https://github.com/kritikabaghel-coder/KYC-Attestation-Contract-
