<template>
  <nav class="flex justify-center flex-wrap p-6">
    <div class="container px-4 justify-between flex">
      <div class="flex text-gray-800">
        <a href="/repos">
          <h1 class="font-normal text-2xl tracking-tight">📝 Gutenberg</h1>
        </a>
      </div>
      <div>
        <a
          @click="logout"
          class="cursor-pointer float-right inline-block text-sm px-4 py-2 leading-none text-gray-800 font-light"
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