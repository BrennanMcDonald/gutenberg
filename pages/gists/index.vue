<template>
  <div>
    <nav-bar />
    <div class="container mx-auto">
      <div>
        <h2 class="font-sans text-3xl text-gray-900 font-semibold p-2 tracking-wide">Gists</h2>
      </div>
      <hr />
      <div class="flex flex-wrap">
        <gist-button v-for="gist in gists" v-bind:key="gist.sha" :gist="gist" :favourite="false" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import GistButton from '~/components/GistButton.vue'
import NavBar from '~/components/IndexNavbar.vue'

export default Vue.extend({
  middleware: 'auth',
  components: {
    NavBar,
  },
  created() {
    this.fetchGists()
  },
  methods: {
    ...mapMutations({
      fetchGists: 'gists/fetchGists',
    }),
  },
  computed: {
    gists() {
      return this.$store.state.gists.list;
    }
  },
})
</script>