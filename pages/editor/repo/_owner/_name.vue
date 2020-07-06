<template>
  <div class="h-screen flex flex-col">
    <div class="w-full border flex">
      <button class="text-lg py-2 px-4" @click="() => { this.$router.back() }"><</button>
      <h1 class="self-center text-xl">{{metadata.name}}</h1>
    </div>
    <div class="flex-1 flex">
      <div class="w-1/3 lg:w-500 border-collapse">
        <div
          v-for="file in files"
          v-bind:key="file.path"
          @click="() => { selectFile(file.sha) }"
          class="w-full py-2 px-4 border border-b-1 border-t-0 border-l-0 border-r-1 cursor-pointer border-collapse"
        >
          <h2
            class="text-gray-900 text-lg title-font font-medium"
          >{{file.path.split("/")[file.path.split("/").length-1]}}</h2>
          <p
            class="leading-relaxed text-base text-sm text-gray-600"
          >{{file.path.split("/").slice(0,file.path.split("/").length-1).join("/")}}/</p>
        </div>
      </div>
      <div>
        SHA:{{file_sha}}
      </div>
    </div>
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
  methods: {
    ...mapMutations({
      selectFile: 'files/setSelectedFile'
    })
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