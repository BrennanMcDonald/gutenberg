<template>
  <div class="h-screen flex flex-col">
    <editor-title-bar
      :repo="name"
      :owner="owner"
      :menuToggle="() => showMenu = !showMenu"
      :newFile="() => showNewFile = !showNewFile"
    />
    <div class="flex overflow-hidden h-full">
      <file-drawer :showMenu="showMenu" :files="files" :selectedFile="selectedFile"  />
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
import FileDrawer from '~/components/FileDrawer/index.vue'

export default Vue.extend({
  middleware: 'auth',
  mounted() {
    let { owner, name: repo } = this.$route.params
    this.$store.commit('files/clearFileList')
    this.$store.commit('files/getFileList', { owner, repo })
  },
  data() {
    return {
      showMenu: true,
      showNewFile: false,
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