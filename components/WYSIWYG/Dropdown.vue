<template>
  <div class="dropdown inline-block text-left">
    <button
      @click="() => toggle = !toggle"
      type="button"
      class="inline-flex font-bold justify-center w-full bg-white text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
      id="options-menu"
      aria-haspopup="true"
      aria-expanded="true"
    >Heading</button>
    <div class="dropdown-menu origin-top-right absolute w-40 shadow-lg hidden">
      <div class="bg-white shadow-xs">
        <div
          v-for="option in options"
          v-bind:key="option.text"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          @click="option.command"
        >
          <a
            href="#"
            class="block px-4 py-2 font-bold hover:bg-gray-200 text-sm leading-5 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            role="menuitem"
          >{{option.text}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['options'],
  data() {
    return {
      toggle: false,
    }
  },
})
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu:hover {
  display: block;
}
</style>