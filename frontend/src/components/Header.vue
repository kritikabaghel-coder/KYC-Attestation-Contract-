<template>
  <header class="glass sticky top-0 z-50 backdrop-blur-lg">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="text-2xl font-bold text-white hover:text-purple-300 transition">
          🔐 KYC Attestation
        </router-link>
        
        <div class="hidden md:flex space-x-6">
          <router-link 
            to="/" 
            class="text-white/80 hover:text-white transition"
            active-class="text-white font-semibold"
          >
            Home
          </router-link>
          <router-link 
            to="/admin" 
            class="text-white/80 hover:text-white transition"
            active-class="text-white font-semibold"
          >
            Admin
          </router-link>
          <router-link 
            to="/issuer" 
            class="text-white/80 hover:text-white transition"
            active-class="text-white font-semibold"
          >
            Issuer
          </router-link>
          <router-link 
            to="/user" 
            class="text-white/80 hover:text-white transition"
            active-class="text-white font-semibold"
          >
            User
          </router-link>
          <router-link 
            to="/verify" 
            class="text-white/80 hover:text-white transition"
            active-class="text-white font-semibold"
          >
            Verify
          </router-link>
        </div>
        
        <button 
          @click="connectWallet"
          class="lift-button glass px-6 py-2 rounded-xl text-white font-semibold hover:bg-purple-500/20"
        >
          {{ walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet' }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const walletAddress = ref('')

const connectWallet = async () => {
  // Placeholder for Freighter wallet integration
  console.log('Connect wallet clicked')
  // Future: integrate with @stellar/freighter-api
}
</script>

<style scoped>
.router-link-active {
  @apply text-white font-semibold;
}
</style>
