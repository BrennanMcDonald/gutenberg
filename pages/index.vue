<template>
  <div class="text-red-700">
    <div>
      <Logo />
      <div class="links">
        <a
          href="/login"
          rel="noopener noreferrer"
          class="border border-b-4 hover:border-0 py-4 px-8 rounded"
        >Login</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false
})
</script>
