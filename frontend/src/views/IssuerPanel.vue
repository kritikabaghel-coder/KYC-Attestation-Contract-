<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-5xl font-bold text-white mb-8 text-center">
      Issuer Dashboard
    </h1>

    <!-- Issue KYC -->
    <div class="glass card-3d p-8 rounded-3xl mb-8 max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">✍️</span>
        <h2 class="text-2xl font-bold">Issue KYC Attestation</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="issueForm.issuer_address"
          type="text"
          placeholder="Your Issuer Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        
        <input
          v-model="issueForm.subject_address"
          type="text"
          placeholder="Subject Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        
        <input
          v-model="issueForm.attestation_hash"
          type="text"
          placeholder="Attestation Hash (32 bytes)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        
        <div class="flex items-center">
          <input
            v-model="issueForm.public"
            type="checkbox"
            class="w-6 h-6 rounded"
          />
          <label class="ml-3 text-white">Make public</label>
        </div>
        
        <button
          @click="issueKYC"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-purple-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Issuing...' : 'Issue KYC' }}
        </button>
      </div>
    </div>

    <!-- Revoke KYC -->
    <div class="glass card-3d p-8 rounded-3xl max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">🚫</span>
        <h2 class="text-2xl font-bold">Revoke KYC Attestation</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="revokeForm.issuer_address"
          type="text"
          placeholder="Your Issuer Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        
        <input
          v-model="revokeForm.subject_address"
          type="text"
          placeholder="Subject Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        
        <button
          @click="revokeKYC"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-red-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Revoking...' : 'Revoke KYC' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const loading = ref(false)

const issueForm = ref({
  issuer_address: '',
  subject_address: '',
  attestation_hash: '',
  public: true
})

const revokeForm = ref({
  issuer_address: '',
  subject_address: ''
})

const issueKYC = async () => {
  if (!issueForm.value.issuer_address || !issueForm.value.subject_address || !issueForm.value.attestation_hash) {
    alert('Please fill all fields')
    return
  }
  
  loading.value = true
  try {
    await axios.post('/api/issuer/issue-kyc', issueForm.value)
    alert('KYC issued successfully!')
    issueForm.value = { issuer_address: '', subject_address: '', attestation_hash: '', public: true }
  } catch (error) {
    alert('Failed to issue KYC')
  } finally {
    loading.value = false
  }
}

const revokeKYC = async () => {
  if (!revokeForm.value.issuer_address || !revokeForm.value.subject_address) {
    alert('Please fill all fields')
    return
  }
  
  loading.value = true
  try {
    await axios.post('/api/issuer/revoke-kyc', revokeForm.value)
    alert('KYC revoked successfully!')
    revokeForm.value = { issuer_address: '', subject_address: '' }
  } catch (error) {
    alert('Failed to revoke KYC')
  } finally {
    loading.value = false
  }
}
</script>
