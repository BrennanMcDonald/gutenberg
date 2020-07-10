<template>
  <div class="container mx-auto">
    <div>
      <h2 class="font-sans text-5xl font-semibold p-2">Repos</h2>
    </div>
    <hr />
    <div class="flex flex-wrap">
      <repo-button
        v-for="favourite in favourites"
        v-bind:key="favourite.sha"
        :repo="favourite"
        :favourite="true"
      />
    </div>
    <div class="flex flex-wrap">
      <repo-button v-for="repo in repos" v-bind:key="repo.sha" :repo="repo" :favourite="false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import RepoButton from '~/components/RepoButton.vue'

export default Vue.extend({
  middleware: 'auth',
  created() {
    this.clean()
    this.fetchRepos()
  },
  methods: {
    ...mapMutations({
      clean: 'repos/clean',
      fetchRepos: 'repos/fetchRepos',
    }),
  },
  computed: {
    repos() {
      return this.$store.state.repos.list.filter((el: {id: Number}) => {
          return !this.$store.state.repos.favourites.includes(el.id);
      })
    },
    favourites() {
      return this.$store.state.repos.list.filter((el: {id: Number}) => {
          return this.$store.state.repos.favourites.includes(el.id);
      })
    },
  },
})
</script>