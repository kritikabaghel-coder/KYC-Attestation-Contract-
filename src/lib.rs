#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Vec, BytesN};

// KYC Attestation contract for Soroban
// - Admin initializes contract and manages issuer whitelist
// - Whitelisted issuers can issue and revoke attestations for subjects (users)
// - Attestations only store 32-byte hashes that point to off-chain PII
// - Users control visibility: public or allow specific verifiers
// - Verifiers can call `verify_kyc(subject)` to check if there's a valid attestation

// Storage key types
#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Issuer(Address),
    AttHash(Address, Address),    // (subject, issuer)
    AttRev(Address, Address),     // (subject, issuer)
    AttPub(Address, Address),     // (subject, issuer)
    AttAllow(Address, Address, Address), // (subject, issuer, verifier)
    SubjIssuers(Address),         // subject -> list of issuers
}

#[contract]
pub struct KycContract;

#[contractimpl]
impl KycContract {
    // initialize contract with admin address - can be called only once
    // Admin can later add/remove issuers
    pub fn initialize(env: Env, admin: Address) {
        // only allow initialize once
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    // add issuer to whitelist - only admin
    pub fn add_issuer(env: Env, issuer: Address) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin)
            .unwrap_or_else(|| panic!("not initialized"));
        admin.require_auth();
        env.storage().instance().set(&DataKey::Issuer(issuer), &true);
    }

    // remove issuer from whitelist - only admin
    pub fn remove_issuer(env: Env, issuer: Address) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin)
            .unwrap_or_else(|| panic!("not initialized"));
        admin.require_auth();
        env.storage().instance().remove(&DataKey::Issuer(issuer));
    }

    // issuer issues an attestation for `subject` storing only a 32-byte hash pointer
    // caller must be a whitelisted issuer
    // `public` indicates whether any verifier can verify or only allowed verifiers
    pub fn issue_kyc(env: Env, issuer: Address, subject: Address, hash: BytesN<32>, public: bool) {
        issuer.require_auth();
        
        // check issuer whitelisted
        let is_whitelisted: Option<bool> = env.storage().instance().get(&DataKey::Issuer(issuer.clone()));
        if is_whitelisted != Some(true) {
            panic!("only whitelisted issuers can issue");
        }

        // store hash
        env.storage().instance().set(&DataKey::AttHash(subject.clone(), issuer.clone()), &hash);
        // set revoked = false
        env.storage().instance().set(&DataKey::AttRev(subject.clone(), issuer.clone()), &false);
        // set public flag
        env.storage().instance().set(&DataKey::AttPub(subject.clone(), issuer.clone()), &public);

        // ensure issuer is indexed under subject for verification scanning
        let key = DataKey::SubjIssuers(subject.clone());
        let mut list: Vec<Address> = env.storage().instance().get(&key).unwrap_or(Vec::new(&env));
        // append issuer if not present
        if !list.iter().any(|a| a == issuer) {
            list.push_back(issuer.clone());
            env.storage().instance().set(&key, &list);
        }
    }

    // issuer revokes an attestation previously issued to `subject`
    pub fn revoke_kyc(env: Env, issuer: Address, subject: Address) {
        issuer.require_auth();
        
        // check issuer whitelisted
        let is_whitelisted: Option<bool> = env.storage().instance().get(&DataKey::Issuer(issuer.clone()));
        if is_whitelisted != Some(true) {
            panic!("only whitelisted issuers can revoke");
        }
        // mark revoked
        env.storage().instance().set(&DataKey::AttRev(subject, issuer), &true);
    }

    // subject can set the public flag for a (subject, issuer) attestation
    // only subject may call
    pub fn set_public(env: Env, subject: Address, issuer: Address, public: bool) {
        subject.require_auth();
        
        // must have an attestation already
        let has: Option<BytesN<32>> = env.storage().instance()
            .get(&DataKey::AttHash(subject.clone(), issuer.clone()));
        if has.is_none() {
            panic!("no attestation");
        }
        env.storage().instance().set(&DataKey::AttPub(subject, issuer), &public);
    }

    // subject can allow or disallow a specific verifier for a given issuer
    // only subject may call
    pub fn allow_verifier(env: Env, subject: Address, issuer: Address, verifier: Address, allowed: bool) {
        subject.require_auth();
        
        // must have an attestation already
        let has: Option<BytesN<32>> = env.storage().instance()
            .get(&DataKey::AttHash(subject.clone(), issuer.clone()));
        if has.is_none() {
            panic!("no attestation");
        }
        env.storage().instance().set(&DataKey::AttAllow(subject, issuer, verifier), &allowed);
    }

    // verifier calls to check whether `subject` has at least one valid, non-revoked
    // attestation from a whitelisted issuer that is either public or explicitly allowed
    // Returns true if such an attestation exists
    pub fn verify_kyc(env: Env, verifier: Address, subject: Address) -> bool {
        verifier.require_auth();

        // fetch issuers list for this subject
        let key = DataKey::SubjIssuers(subject.clone());
        let list_opt: Option<Vec<Address>> = env.storage().instance().get(&key);
        if list_opt.is_none() {
            return false;
        }
        let list = list_opt.unwrap();

        // iterate issuers and check attestation conditions
        for issuer in list.iter() {
            // ensure issuer still whitelisted
            let is_whitelisted: Option<bool> = env.storage().instance().get(&DataKey::Issuer(issuer.clone()));
            if is_whitelisted != Some(true) {
                continue;
            }

            // check revoked
            let revoked: Option<bool> = env.storage().instance()
                .get(&DataKey::AttRev(subject.clone(), issuer.clone()));
            if revoked == Some(true) {
                continue;
            }

            // must have a hash stored
            let has_hash: Option<BytesN<32>> = env.storage().instance()
                .get(&DataKey::AttHash(subject.clone(), issuer.clone()));
            if has_hash.is_none() {
                continue;
            }

            // check public flag
            let is_public: Option<bool> = env.storage().instance()
                .get(&DataKey::AttPub(subject.clone(), issuer.clone()));
            if is_public == Some(true) {
                return true;
            }

            // check allowed verifier
            let allowed: Option<bool> = env.storage().instance()
                .get(&DataKey::AttAllow(subject.clone(), issuer.clone(), verifier.clone()));
            if allowed == Some(true) {
                return true;
            }
        }

        false
    }

    // helper read functions
    pub fn is_issuer(env: Env, issuer: Address) -> bool {
        env.storage().instance().get(&DataKey::Issuer(issuer)).unwrap_or(false)
    }

    pub fn get_attestation_hash(env: Env, subject: Address, issuer: Address) -> Option<BytesN<32>> {
        env.storage().instance().get(&DataKey::AttHash(subject, issuer))
    }
}
