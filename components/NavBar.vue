<template>
  <nav class="flex justify-center flex-wrap p-6">
    <div class="container px-4 justify-between flex">
      <div class="flex text-gray-800">
        <span class="font-semibold text-xl tracking-wide">📝 Gutenberg</span>
      </div>
      <div>
        <a
          @click="logout"
          class="cursor-pointer float-right inline-block text-sm px-4 py-2 leading-none text-gray-800"
        >Sign Out</a>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    methods: {
        async logout() {
            await this.$auth.logout();
            window.location.href = '/';
        }
    }
})
</script>