<template>
  <div class="p-2 lg:w-1/3 md:w-1/2 w-full cursor-pointer">
    <div
      class="h-full flex items-center border-gray-200 border p-4 rounded-lg hover:shadow-sm"
      @click="(e) => { this.$nuxt.$loading.start(); this.$router.push(`/editor/repo/${repo.owner.login}/${repo.name}`) }"
    >
      <div
        class="rounded-full w-16 h-16 circle mr-4 text-3xl text-bold justify-center items-center flex"
        v-bind:class="{ [`bg-${colors[parseInt(repo.id.toString()[repo.id.toString().length-1]) % colors.length]}-600`]: true  }"
      >{{repo.name.substr(0,1).toUpperCase()}}</div>
      <div class="flex-grow">
        <h2 class="text-gray-900 title-font font-medium">{{repo.name}}</h2>
        <p class="text-gray-500">UI Designer</p>
      </div>
      <button class="border px-4 py-2" @click.stop="addFavourite(repo.id)" v-show="!favourite">
        <fa :icon="far.faStar" />
      </button>
      <button
        class="border px-4 py-2 text-yellow-400"
        @click.stop="removeFavourite(repo.id)"
        v-show="favourite"
      >
        <fa :icon="fas.faStar" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export default Vue.extend({
  props: ['repo', 'favourite'],
  mounted() {
  },
  data() {
    return {
      colors: ['red', 'blue', 'green', 'pink', 'indigo', 'purple'],
    }
  },
  methods: {
    addFavourite(id: Number) {
      this.$store.commit('repos/addFavourite', id)
    },
    removeFavourite(id: Number) {
      this.$store.commit('repos/removeFavourite', id)
    },
  },
  computed: {
    fas() {
      return fas
    },
    far() {
      return far
    },
  },
})
</script>
