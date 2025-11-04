<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-6xl font-bold mb-6 animate-float">
        KYC Attestation on Stellar
      </h1>
      <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
        Decentralized, privacy-preserving KYC attestations powered by Soroban smart contracts
      </p>
      <div class="flex gap-4 justify-center">
        <router-link 
          to="/admin" 
          class="lift-button glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-purple-500/20 inline-block"
        >
          Get Started
        </router-link>
        <a 
          href="https://github.com/kritikabaghel-coder/KYC-Attestation-Contract-" 
          target="_blank"
          class="lift-button glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-blue-500/20 inline-block"
        >
          View on GitHub
        </a>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <div class="glass card-3d p-6 rounded-3xl text-center">
        <div class="text-5xl mb-4">🛡️</div>
        <h3 class="text-xl font-bold mb-2">Privacy First</h3>
        <p class="text-white/70">
          No PII stored on-chain. Only cryptographic hashes.
        </p>
      </div>
      
      <div class="glass card-3d p-6 rounded-3xl text-center">
        <div class="text-5xl mb-4">✅</div>
        <h3 class="text-xl font-bold mb-2">Decentralized</h3>
        <p class="text-white/70">
          Trustless verification on Stellar blockchain.
        </p>
      </div>
      
      <div class="glass card-3d p-6 rounded-3xl text-center">
        <div class="text-5xl mb-4">🔒</div>
        <h3 class="text-xl font-bold mb-2">User Control</h3>
        <p class="text-white/70">
          Subjects control who can verify their KYC.
        </p>
      </div>
      
      <div class="glass card-3d p-6 rounded-3xl text-center">
        <div class="text-5xl mb-4">🚀</div>
        <h3 class="text-xl font-bold mb-2">Fast & Cheap</h3>
        <p class="text-white/70">
          Built on Soroban for speed and low fees.
        </p>
      </div>
    </div>

    <!-- Contract Info -->
    <div class="glass card-3d p-8 rounded-3xl max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-6 text-center">📜 Smart Contract Details</h2>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-white/70">Network:</span>
          <span class="font-semibold">Stellar Testnet</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-white/70">Contract ID:</span>
          <span class="font-mono text-sm break-all">
            CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-white/70">Functions:</span>
          <span class="font-semibold">11 Functions</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-white/70">Verification:</span>
          <a 
            href="https://stellar.expert/explorer/testnet/contract/CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED"
            target="_blank"
            class="text-blue-300 hover:text-blue-200 underline"
          >
            View on Stellar Expert →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Hero component - landing page
</script>
