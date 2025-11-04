<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-5xl font-bold text-white mb-8 text-center">
      Admin Dashboard
    </h1>

    <!-- Initialize Contract -->
    <div class="glass card-3d p-8 rounded-3xl mb-8 max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">⚙️</span>
        <h2 class="text-2xl font-bold">Initialize Contract</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="initForm.admin_address"
          type="text"
          placeholder="Admin Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        
        <button
          @click="initializeContract"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-purple-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Initializing...' : 'Initialize Contract' }}
        </button>
      </div>
    </div>

    <!-- Add Issuer -->
    <div class="glass card-3d p-8 rounded-3xl mb-8 max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">➕</span>
        <h2 class="text-2xl font-bold">Add Issuer</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="addIssuerForm.admin_address"
          type="text"
          placeholder="Admin Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        
        <input
          v-model="addIssuerForm.issuer_address"
          type="text"
          placeholder="Issuer Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        
        <button
          @click="addIssuer"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-green-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Adding...' : 'Add Issuer' }}
        </button>
      </div>
    </div>

    <!-- Remove Issuer -->
    <div class="glass card-3d p-8 rounded-3xl max-w-2xl mx-auto">
      <div class="flex items-center mb-6">
        <span class="text-3xl mr-4">❌</span>
        <h2 class="text-2xl font-bold">Remove Issuer</h2>
      </div>
      
      <div class="space-y-4">
        <input
          v-model="removeIssuerForm.admin_address"
          type="text"
          placeholder="Admin Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        
        <input
          v-model="removeIssuerForm.issuer_address"
          type="text"
          placeholder="Issuer Address (G...)"
          class="glass w-full px-6 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        
        <button
          @click="removeIssuer"
          :disabled="loading"
          class="lift-button w-full glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-red-500/20 disabled:opacity-50"
        >
          {{ loading ? 'Removing...' : 'Remove Issuer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const loading = ref(false)

const initForm = ref({
  admin_address: ''
})

const addIssuerForm = ref({
  admin_address: '',
  issuer_address: ''
})

const removeIssuerForm = ref({
  admin_address: '',
  issuer_address: ''
})

const initializeContract = async () => {
  if (!initForm.value.admin_address) {
    alert('Please fill admin address')
    return
  }
  
  loading.value = true
  try {
    const response = await axios.post('/api/admin/initialize', initForm.value)
    alert('Contract initialized successfully!')
    initForm.value.admin_address = ''
  } catch (error) {
    alert('Failed to initialize contract')
  } finally {
    loading.value = false
  }
}

const addIssuer = async () => {
  if (!addIssuerForm.value.admin_address || !addIssuerForm.value.issuer_address) {
    alert('Please fill all fields')
    return
  }
  
  loading.value = true
  try {
    await axios.post('/api/admin/add-issuer', addIssuerForm.value)
    alert('Issuer added successfully!')
    addIssuerForm.value = { admin_address: '', issuer_address: '' }
  } catch (error) {
    alert('Failed to add issuer')
  } finally {
    loading.value = false
  }
}

const removeIssuer = async () => {
  if (!removeIssuerForm.value.admin_address || !removeIssuerForm.value.issuer_address) {
    alert('Please fill all fields')
    return
  }
  
  loading.value = true
  try {
    await axios.post('/api/admin/remove-issuer', removeIssuerForm.value)
    alert('Issuer removed successfully!')
    removeIssuerForm.value = { admin_address: '', issuer_address: '' }
  } catch (error) {
    alert('Failed to remove issuer')
  } finally {
    loading.value = false
  }
}
</script>
