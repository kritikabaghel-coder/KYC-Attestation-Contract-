<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-5xl font-bold text-white mb-8 text-center">
      User Controls
    </h1>

    <!-- Set Visibility -->
    <div class="glass card-3d p-8 rounded-3xl mb-8 max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">👁️</span>
        <h2 class="text-2xl font-bold">Set Visibility</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="visibilityForm.subject_address"
          type="text"
          placeholder="Your Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        
        <input
          v-model="visibilityForm.issuer_address"
          type="text"
          placeholder="Issuer Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        
        <div class="flex items-center">
          <input
            v-model="visibilityForm.public"
            type="checkbox"
            class="w-6 h-6 rounded"
          />
          <label class="ml-3 text-white">Make public</label>
        </div>
        
        <button
          @click="setVisibility"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-purple-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Updating...' : 'Update Visibility' }}
        </button>
      </div>
    </div>

    <!-- Allow Verifier -->
    <div class="glass card-3d p-8 rounded-3xl max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">✅</span>
        <h2 class="text-2xl font-bold">Allow Verifier</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="verifierForm.subject_address"
          type="text"
          placeholder="Your Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        
        <input
          v-model="verifierForm.issuer_address"
          type="text"
          placeholder="Issuer Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        
        <input
          v-model="verifierForm.verifier_address"
          type="text"
          placeholder="Verifier Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        
        <button
          @click="allowVerifier"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-green-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Allowing...' : 'Allow Verifier' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const loading = ref(false)

const visibilityForm = ref({
  subject_address: '',
  issuer_address: '',
  public: true
})

const verifierForm = ref({
  subject_address: '',
  issuer_address: '',
  verifier_address: ''
})

const setVisibility = async () => {
  if (!visibilityForm.value.subject_address || !visibilityForm.value.issuer_address) {
    alert('Please fill all fields')
    return
  }
  
  loading.value = true
  try {
    await axios.post('/api/subject/set-public', visibilityForm.value)
    alert(`Visibility set to ${visibilityForm.value.public ? 'public' : 'private'}!`)
  } catch (error) {
    alert('Failed to set visibility')
  } finally {
    loading.value = false
  }
}

const allowVerifier = async () => {
  if (!verifierForm.value.subject_address || !verifierForm.value.issuer_address || !verifierForm.value.verifier_address) {
    alert('Please fill all fields')
    return
  }
  
  loading.value = true
  try {
    await axios.post('/api/subject/allow-verifier', {
      ...verifierForm.value,
      allowed: true
    })
    alert('Verifier allowed successfully!')
    verifierForm.value.verifier_address = ''
  } catch (error) {
    alert('Failed to allow verifier')
  } finally {
    loading.value = false
  }
}
</script>
