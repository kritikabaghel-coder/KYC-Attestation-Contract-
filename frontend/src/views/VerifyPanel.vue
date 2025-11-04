<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-5xl font-bold text-white mb-8 text-center">
      Verify KYC
    </h1>

    <!-- Verify Card -->
    <div class="glass card-3d p-8 rounded-3xl mb-8 max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">🔍</span>
        <h2 class="text-2xl font-bold">Check Attestation</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="verifyForm.subject_address"
          type="text"
          placeholder="Subject Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input
          v-model="verifyForm.verifier_address"
          type="text"
          placeholder="Your Verifier Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <button
          @click="verifyKYC"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-blue-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Verifying...' : 'Verify KYC' }}
        </button>
      </div>
    </div>

    <!-- Result Card -->
    <div 
      v-if="result" 
      class="glass card-3d p-8 rounded-3xl max-w-2xl mx-auto"
      :class="result.verified ? 'border-2 border-green-400/50' : 'border-2 border-red-400/50'"
    >
      <div class="flex items-center mb-6">
        <span class="text-4xl mr-4">{{ result.verified ? '✅' : '❌' }}</span>
        <h2 class="text-2xl font-bold">
          {{ result.verified ? 'Verification Successful' : 'Verification Failed' }}
        </h2>
      </div>
      
      <div class="space-y-4 text-white">
        <div class="flex justify-between items-center">
          <span class="text-white/70">Status:</span>
          <span 
            class="font-semibold"
            :class="result.verified ? 'text-green-400' : 'text-red-400'"
          >
            {{ result.verified ? 'VERIFIED' : 'NOT VERIFIED' }}
          </span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-white/70">Visibility:</span>
          <span class="font-semibold">
            {{ result.public ? 'Public' : 'Private' }}
          </span>
        </div>
        
        <div v-if="result.attestation_hash" class="mt-4">
          <span class="text-white/70 block mb-2">Attestation Hash:</span>
          <div class="glass p-4 rounded-lg font-mono text-sm break-all">
            {{ result.attestation_hash }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const loading = ref(false)
const result = ref(null)

const verifyForm = ref({
  subject_address: '',
  verifier_address: ''
})

const verifyKYC = async () => {
  if (!verifyForm.value.subject_address || !verifyForm.value.verifier_address) {
    alert('Please fill all fields')
    return
  }
  
  loading.value = true
  result.value = null
  
  try {
    const response = await axios.get(
      `/api/verify/${verifyForm.value.subject_address}?verifier=${verifyForm.value.verifier_address}`
    )
    result.value = response.data
    
    if (response.data.verified) {
      alert('KYC Verification Successful!')
    } else {
      alert('KYC Verification Failed')
    }
  } catch (error) {
    alert('Failed to verify KYC')
  } finally {
    loading.value = false
  }
}
</script>
