<template>
  <div class="p-2 lg:w-1/3 md:w-1/2 w-full cursor-pointer">
    <div
      class="h-full flex items-center border-gray-200 border p-4 rounded hover:shadow-sm"
      @click="navigate"
    >
      <div
        class="rounded-full w-16 h-16 circle mr-4 text-3xl text-bold justify-center items-center flex"
        v-bind:class="{ [`bg-${colors[parseInt(gist.id.toString()[gist.id.toString().length-1]) % colors.length]}-600`]: true  }"
      >{{gist.description.substr(0,1).toUpperCase()}}</div>
      <div class="flex-grow">
        <h2 class="text-gray-900 title-font font-medium">{{gist.description}}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export default Vue.extend({
  props: ['gist'],
  data() {
    return {
      colors: ['red', 'blue', 'green', 'pink', 'indigo', 'purple'],
    }
  },
  methods: {
    navigate() {
      let { id } = this.gist;
      this.$router.push(`/editor/gist/${id}`);
      this.$store.commit('gists/selectGistById', id)
    }
  }
})
</script>
