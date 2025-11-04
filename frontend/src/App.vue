<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen animated-gradient">
    <Header />
    <RouterView />
  </div>
</template>

<style>
@import './style.css';
</style>
