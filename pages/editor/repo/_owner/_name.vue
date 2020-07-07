<template>
  <div class="h-screen flex flex-col">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'

export default Vue.extend({
  middleware: 'auth',
  mounted() {
    this.$store.commit('repos/select', this.sha)
    console.log(this.$store.state.repos.repo)
  },
  data() {
    return {
      sha: parseInt(this.$route.params.sha),
    }
  },
  computed: {
    metadata() {
      return this.$store.state.repos.repo.metadata
    },
    files() {
      return this.$store.state.repos.repo.tree.filter((el: { path: String }) =>
        el.path.includes('.md')
      )
    },
    file_sha() {
      return this.$store.state.files.selectedSHA;
    }
  },
})
</script>