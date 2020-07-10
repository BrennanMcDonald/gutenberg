<template>
  <div class="container">
    <button @click="login">Login With Github</button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  auth: false,
  methods: {
    login() {
      this.$auth.loginWith('github');
    }
  }
})
</script>

<style>
* {
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>