<template>
  <div class="container">
    <button @click="() => {this.$auth.loginWith('github')}">Login With Github</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false
})
</script>