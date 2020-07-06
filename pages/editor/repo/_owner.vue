<template>
  <div class="h-screen flex flex-col">
    <div class="w-full border flex">
      <button class="text-lg py-2 px-4" @click="() => { this.$router.back() }"><</button>
      <h1 class="self-center text-xl">{{name}}</h1>
    </div>
    <div class="flex overflow-hidden">
      <div class="w-1/3 lg:w-500 border-collapse overflow-y-scroll">
        <div
          v-for="file in files"
          v-bind:key="file.path"
          @click="() => { setSelectedFile(file) }"
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
      <div class="flex-1 overflow-y-scroll">
        <file :owner="owner" :repo="name" :sha="selectedFile.sha" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import File from '~/components/File.vue'

export default Vue.extend({
  middleware: 'auth',
  mounted() {
    let { owner, name } = this.$route.params
    this.clean()
    this.fetchRepos()
    this.setSelectedFile({content:""})
    if (this.$store.state.repos.list.length == 0) {
      this.$axios
        .get(`https://api.github.com/repos/${owner}/${name}/commits`)
        .then(({ data: commits }) => {
          let SHA = commits[0].sha
          this.$axios
            .get(
              `https://api.github.com/repos/${owner}/${name}/git/trees/${SHA}?recursive=1`
            )
            .then(({ data: tree }) => {
              if (
                tree.tree.filter((el: { path: String }) =>
                  el.path.includes('.md')
                ).length > 0
              ) {
                this.setSelectedFile(
                  tree.tree.filter((el: { path: String }) =>
                    el.path.includes('.md')
                  )[0]
                )
              }
              this.setFiles(tree.tree)
            })
        })
    }
  },
  methods: {
    ...mapMutations({
      clean: 'repos/clean',
      fetchRepos: 'repos/fetchRepos',
      setFiles: 'files/setFiles',
      setSelectedFile: 'files/setSelectedFile',
    }),
  },
  computed: {
    files() {
      return this.$store.state.files.list.filter((el: { path: String }) =>
        el.path.includes('.md')
      )
    },
    selectedFile() {
      return this.$store.state.files.selected
    },
    name() {
      return this.$route.params.name
    },
    owner() {
      return this.$route.params.owner
    },
  },
})
</script>