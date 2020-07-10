<template>
  <div class="h-screen flex flex-col">
    <editor-title-bar
      :repo="name"
      :owner="owner"
      :menuToggle="() => showMenu = !showMenu"
      :newFile="() => showNewFile = !showNewFile"
    />
    <div class="flex overflow-hidden h-full">
      <div
        class="fixed z-20 lg:relative h-screen bg-white transition-all duration-500 border-collapse overflow-y-scroll"
        v-bind:class="[showMenu?'w-1/3 lg:w-500':'w-0']"
      >
        <div
          v-show="showNewFile"
          class="grid grid-cols-3 w-full py-2 px-4 border border-b-1 border-t-0 border-l-0 border-r-1 cursor-pointer border-collapse"
        >
          <div class="col-span-2">
            <input
              v-model="newFile.name"
              type="text"
              placeholder="File Name..."
              class="text-gray-900 text-lg title-font font-medium"
            />
            <br />
            <input
              v-model="newFile.path"
              type="text"
              placeholder="Path..."
              class="leading-relaxed text-base text-sm text-gray-600"
            />
          </div>
          <div class="col-span-1 flex items-center justify-center">
            <button
              @click="createNewFile"
              class="py-2 px-4 rounded border hover:bg-gray-500 hover:text-white cursor-pointer -mr-1"
            >Save</button>
          </div>
        </div>
        <div
          v-for="file in files"
          v-bind:key="file.path"
          @click="() => { selectFile(file) }"
          v-bind:class="{'bg-gray-200':selectedFile.path === file.path}"
          class="w-full py-2 px-4 border border-b-1 border-t-0 border-l-0 border-r-1 cursor-pointer border-collapse hover:bg-gray-200"
        >
          <p
            class="leading-relaxed text-xs font-sans text-gray-600"
          >{{ file.path.split("/").slice(0,file.path.split("/").length-1).join("/") }}/</p>
          <h2
            class="text-gray-900 text-lg font-sans font-medium"
          >{{ file.path.split("/")[file.path.split("/").length-1] }}</h2>
        </div>
      </div>
      <div class="flex-1 overflow-y-scroll h-screen flex">
        <file :owner="owner" :repo="name" :sha="selectedFile.sha" :path="selectedFile.path" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import File from '~/components/File.vue'
import EditorTitleBar from '~/components/EditorTitleBar.vue'

export default Vue.extend({
  middleware: 'auth',
  mounted() {
    let { owner, name: repo } = this.$route.params
    this.$store.commit('files/clearFileList')
    this.$store.commit('files/getFileList', { owner, repo })
  },
  methods: {
    ...mapMutations({
      clean: 'repos/clean',
      fetchRepos: 'repos/fetchRepos',
      setFiles: 'files/setFiles',
      setSelectedFile: 'files/setSelectedFile',
      getFileContents: 'files/getFileContents',
    }),
    createNewFile() {
      let { name: repo, owner } = this.$route.params;
      this.$store.commit('files/newFile', { ...this.newFile, repo, owner });
    },
    selectFile(file) {
      let { name , owner } = this.$route.params;
      this.editor_key = Math.random();
      this.setSelectedFile(file);
      this.getFileContents({
        path: file.path,
        name, owner
      });
    },
  },
  data() {
    return {
      showMenu: true,
      showNewFile: false,
      newFile: {
        name: '',
        path: '',
      },
      editor_key: 0,
    }
  },
  computed: {
    files() {
      let { files } = this.$store.state.files
      return files.filter((el: { path: String }) => el.path.includes('.md'))
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